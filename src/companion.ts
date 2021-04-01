/* eslint-disable */

import hex from 'hex-string'
import _sodium from 'libsodium-wrappers-sumo'
import Store from 'electron-store'
import WebSocket from 'ws'
import AppState, { ConnectedCompanionApp } from './components/AppState'
import Utils from './utils/utils' // Wormhole code is sha256(sha256(secret_key))

function getWormholeCode(keyHex: any, sodium: any) {
  const key = sodium.from_hex(keyHex)
  const pass1 = sodium.crypto_hash_sha256(key)
  const pass2 = sodium.to_hex(sodium.crypto_hash_sha256(pass1))
  return pass2
} // A class that connects to wormhole given a secret key

class WormholeClient {
  wss: any = null
  listner: any = null
  keepAliveTimerID: any = null
  keyHex: any
  sodium: any
  wormholeCode: any

  constructor(keyHex: any, sodium: any, listner: any) {
    this.keyHex = keyHex
    this.sodium = sodium
    this.listner = listner
    this.wormholeCode = getWormholeCode(keyHex, this.sodium)
    this.connect()
  }

  connect() {
    this.wss = new WebSocket('wss://wormhole.zecqtwallet.com:443')
    this.wss.on('open', () => {
      // On open, register ourself
      const reg = {
        register: getWormholeCode(this.keyHex, this.sodium),
      } // No encryption for the register call

      this.wss.send(JSON.stringify(reg)) // Now, do a ping every 4 minutes to keep the connection alive.

      this.keepAliveTimerID = setInterval(() => {
        const ping = {
          ping: 'ping',
        }
        this.wss.send(JSON.stringify(ping))
      }, 4 * 60 * 1000)
    })
    this.wss.on('message', (data: any) => {
      this.listner.processIncoming(data, this.keyHex, this.wss)
    })
    this.wss.on('close', (code: any, reason: any) => {
      console.log('Socket closed for ', this.keyHex, code, reason)
    })
    this.wss.on('error', (ws: any, err: any) => {
      console.log('ws error', err)
    })
  }

  getKeyHex() {
    return this.keyHex
  }

  close() {
    if (this.keepAliveTimerID) {
      clearInterval(this.keepAliveTimerID)
    } // Close the websocket.

    if (this.wss) {
      this.wss.close()
    }
  }
} // The singleton Companion App listener, that can spawn a wormhole server
// or (multiple) wormhole clients

export default class CompanionAppListener {
  sodium: any = null
  fnGetState: any = null
  fnSendTransaction: any = null
  fnUpdateConnectedClient: any = null
  permWormholeClient: any = null
  tmpWormholeClient: any = null

  constructor(
    fnGetSate: any,
    fnSendTransaction: any,
    fnUpdateConnectedClient: any,
  ) {
    this.fnGetState = fnGetSate
    this.fnSendTransaction = fnSendTransaction
    this.fnUpdateConnectedClient = fnUpdateConnectedClient
  }

  async setUp() {
    await _sodium.ready
    this.sodium = _sodium // Create a new wormhole listner

    const permKeyHex = this.getEncKey()

    if (permKeyHex) {
      this.permWormholeClient = new WormholeClient(
        permKeyHex,
        this.sodium,
        this,
      )
    } // At startup, set the last client name/time by loading it

    const store = new Store()
    const name = store.get('companion/name')
    const lastSeen = store.get('companion/lastseen')

    if (name && lastSeen) {
      const o: any = new ConnectedCompanionApp()
      o.name = name
      o.lastSeen = lastSeen
      this.fnUpdateConnectedClient(o)
    }
  }

  createTmpClient(keyHex: any) {
    if (this.tmpWormholeClient) {
      this.tmpWormholeClient.close()
    }

    this.tmpWormholeClient = new WormholeClient(keyHex, this.sodium, this)
  }

  closeTmpClient() {
    if (this.tmpWormholeClient) {
      this.tmpWormholeClient.close()
      this.tmpWormholeClient = null
    }
  }

  replacePermClientWithTmp() {
    if (this.permWormholeClient) {
      this.permWormholeClient.close()
    } // Replace the stored code with the new one

    this.permWormholeClient = this.tmpWormholeClient
    this.tmpWormholeClient = null
    this.setEncKey(this.permWormholeClient.getKeyHex()) // Reset local nonce

    const store = new Store()
    store.delete('companion/localnonce')
  }

  processIncoming(data: any, keyHex: any, ws: any) {
    const dataJson = JSON.parse(data) // If the wormhole sends some messages, we ignore them

    if ('error' in dataJson) {
      console.log('Incoming data contains an error message', data)
      return
    } // If the message is a ping, just ignore it

    if ('ping' in dataJson) {
      return
    } // Then, check if the message is encrpted

    if (!('nonce' in dataJson)) {
      const err = {
        error: 'Encryption error',
        to: getWormholeCode(keyHex, this.sodium),
      }
      ws.send(JSON.stringify(err))
      return
    }

    let cmd // If decryption passes and this is a tmp wormhole client, then set it as the permanant client

    if (
      this.tmpWormholeClient &&
      keyHex === this.tmpWormholeClient.getKeyHex()
    ) {
      const { decrypted, nonce } = this.decryptIncoming(data, keyHex, false)

      if (!decrypted) {
        console.log('Decryption failed')
        const err = {
          error: 'Encryption error',
          to: getWormholeCode(keyHex, this.sodium),
        }
        ws.send(JSON.stringify(err))
        return
      }

      cmd = JSON.parse(decrypted) // Replace the permanant client

      this.replacePermClientWithTmp()
      this.updateRemoteNonce(nonce)
    } else {
      const { decrypted, nonce } = this.decryptIncoming(data, keyHex, true)

      if (!decrypted) {
        const err = {
          error: 'Encryption error',
          to: getWormholeCode(keyHex, this.sodium),
        }
        ws.send(JSON.stringify(err))
        console.log('Decryption failed')
        return
      }

      cmd = JSON.parse(decrypted)
      this.updateRemoteNonce(nonce)
    }

    if (cmd.command === 'getInfo') {
      const response = this.doGetInfo(cmd)
      ws.send(this.encryptOutgoing(response, keyHex))
    } else if (cmd.command === 'getTransactions') {
      const response = this.doGetTransactions()
      ws.send(this.encryptOutgoing(response, keyHex))
    } else if (cmd.command === 'sendTx') {
      const response = this.doSendTransaction(cmd, ws)
      ws.send(this.encryptOutgoing(response, keyHex))
    }
  } // Generate a new secret key

  genNewKeyHex() {
    const keyHex = this.sodium.to_hex(this.sodium.crypto_secretbox_keygen())
    return keyHex
  }

  getEncKey() {
    // Get the nonce. Increment and store the nonce for next use
    const store = new Store()
    const keyHex = store.get('companion/key')
    return keyHex
  }

  setEncKey(keyHex: any) {
    // Get the nonce. Increment and store the nonce for next use
    const store = new Store()
    store.set('companion/key', keyHex)
  }

  saveLastClientName(name: any) {
    // Save the last client name
    const store = new Store()
    store.set('companion/name', name)

    if (name) {
      const now = Date.now()
      store.set('companion/lastseen', now)
      const o: any = new ConnectedCompanionApp()
      o.name = name
      o.lastSeen = now
      this.fnUpdateConnectedClient(o)
    } else {
      this.fnUpdateConnectedClient(null)
    }
  }

  disconnectLastClient() {
    // Remove the permanant connection
    if (this.permWormholeClient) {
      this.permWormholeClient.close()
    }

    this.saveLastClientName(null)
    this.setEncKey(null)
  }

  getRemoteNonce() {
    const store = new Store()
    const nonceHex = store.get('companion/remotenonce')
    return nonceHex
  }

  updateRemoteNonce(nonce: any) {
    if (nonce) {
      const store = new Store()
      store.set('companion/remotenonce', nonce)
    }
  }

  getLocalNonce() {
    // Get the nonce. Increment and store the nonce for next use
    const store = new Store()
    const nonceHex = store.get(
      'companion/localnonce',
      `01${'00'.repeat(this.sodium.crypto_secretbox_NONCEBYTES - 1)}`,
    ) // Increment nonce

    const newNonce = this.sodium.from_hex(nonceHex)
    this.sodium.increment(newNonce)
    this.sodium.increment(newNonce)
    store.set('companion/localnonce', this.sodium.to_hex(newNonce))
    return nonceHex
  }

  encryptOutgoing(str: any, keyHex: any) {
    if (!keyHex) {
      console.log('No secret key')
      throw Error('No Secret Key')
    }

    const nonceHex = this.getLocalNonce()
    const nonce = this.sodium.from_hex(nonceHex)
    const key = this.sodium.from_hex(keyHex)
    const encrypted = this.sodium.crypto_secretbox_easy(str, nonce, key)
    const encryptedHex = this.sodium.to_hex(encrypted)
    const resp = {
      nonce: this.sodium.to_hex(nonce),
      payload: encryptedHex,
      to: getWormholeCode(keyHex, this.sodium),
    }
    return JSON.stringify(resp)
  }

  decryptIncoming(msg: any, keyHex: any, checkNonce: any) {
    const msgJson = JSON.parse(msg)
    console.log('trying to decrypt', msgJson)

    if (!keyHex) {
      console.log('No secret key')
      throw Error('No Secret Key')
    }

    const key = this.sodium.from_hex(keyHex)
    const nonce = this.sodium.from_hex(msgJson.nonce)

    if (checkNonce) {
      const prevNonce = this.sodium.from_hex(this.getRemoteNonce())

      if (prevNonce && this.sodium.compare(prevNonce, nonce) >= 0) {
        return {
          decrypted: null as any,
        }
      }
    }

    const cipherText = this.sodium.from_hex(msgJson.payload)
    const decrypted = this.sodium.to_string(
      this.sodium.crypto_secretbox_open_easy(cipherText, nonce, key),
    )
    return {
      decrypted,
      nonce: msgJson.nonce,
    }
  }

  doGetInfo(cmd: any) {
    const appState = this.fnGetState()

    if (cmd && cmd.name) {
      this.saveLastClientName(cmd.name)
    }

    const saplingAddress = appState.addresses.find((a: any) =>
      Utils.isSapling(a),
    )
    const tAddress = appState.addresses.find((a: any) => Utils.isTransparent(a))
    const balance = parseFloat(appState.totalBalance.total)
    const maxspendable = parseFloat(appState.totalBalance.total)
    const maxzspendable = parseFloat(appState.totalBalance.private)
    const tokenName = appState.info.currencyName
    const pslprice = parseFloat(appState.info.pslPrice)
    const resp = {
      version: 1.0,
      command: 'getInfo',
      saplingAddress,
      tAddress,
      balance,
      maxspendable,
      maxzspendable,
      tokenName,
      pslprice,
      serverversion: '1.4.3',
    }
    return JSON.stringify(resp)
  }

  doGetTransactions() {
    const appState = this.fnGetState()
    let txlist = []

    if (appState.transactions) {
      // Get only the last 20 txns
      txlist = appState.transactions.slice(0, 20).map((t: any) => {
        let memo =
          t.detailedTxns && t.detailedTxns.length > 0
            ? t.detailedTxns[0].memo
            : ''

        if (memo) {
          memo = memo.trimRight()
        } else {
          memo = ''
        }

        const txResp = {
          type: t.type,
          datetime: t.time,
          amount: t.amount.toFixed(5),
          txid: t.txid,
          address: t.address,
          memo,
          confirmations: t.confirmations,
        }
        return txResp
      })
    }

    const resp = {
      version: 1.0,
      command: 'getTransactions',
      transactions: txlist,
    }
    return JSON.stringify(resp)
  }

  doSendTransaction(cmd: any, ws: any) {
    // "command":"sendTx","tx":{"amount":"0.00019927","to":"zs1pzr7ee53jwa3h3yvzdjf7meruujq84w5rsr5kuvye9qg552kdyz5cs5ywy5hxkxcfvy9wln94p6","memo":""}}
    const inpTx = cmd.tx
    const appState = this.fnGetState()
    const sendingAmount = parseFloat(inpTx.amount)

    const buildError = (reason: any) => {
      const resp = {
        errorCode: -1,
        errorMessage: `Couldn't send Tx:${reason}`,
      } // console.log('sendtx error', resp);

      return JSON.stringify(resp)
    } // First, find an address that can send the correct amount.

    const fromAddress = appState.addressesWithBalance.find(
      (ab: any) => ab.balance > sendingAmount,
    )

    if (!fromAddress) {
      return buildError(
        `No address with sufficient balance to send ${sendingAmount}`,
      )
    }

    let memo = !inpTx.memo || inpTx.memo.trim() === '' ? null : inpTx.memo
    const textEncoder = new TextEncoder()
    memo = memo ? hex.encode(textEncoder.encode(memo)) : '' // Build a sendJSON object

    const sendJSON = []
    sendJSON.push(fromAddress.address)

    if (memo) {
      sendJSON.push([
        {
          address: inpTx.to,
          amount: sendingAmount,
          memo,
        },
      ])
    } else {
      sendJSON.push([
        {
          address: inpTx.to,
          amount: sendingAmount,
        },
      ])
    } // console.log('sendjson is', sendJSON);

    this.fnSendTransaction(sendJSON, (title: any, msg: any) => {
      let resp

      if (title.startsWith('Success')) {
        const arr = msg.split(' ')
        const txid = arr && arr.length > 0 && arr[arr.length - 1]
        resp = {
          version: 1.0,
          command: 'sendTxSubmitted',
          txid,
        }
      } else {
        resp = {
          version: 1.0,
          command: 'sendTxFailed',
          err: msg,
        }
      } // console.log('Callback sending', resp);

      // TODO this's gonna throw error in the js version as well because missing keyhex
      ws.send(this.encryptOutgoing(JSON.stringify(resp), ''))
    }) // After the transaction is submitted, we return an intermediate success.

    const resp = {
      version: 1.0,
      command: 'sendTx',
      result: 'success',
    } // console.log('sendtx sending', resp);

    return JSON.stringify(resp)
  }
}
