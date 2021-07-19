/* eslint-disable */

import axios from 'axios'
import _ from 'underscore'
import hex from 'hex-string'
import log from 'electron-log'
import {
  TotalBalance,
  AddressBalance,
  Transaction,
  RPCConfig,
  TxDetail,
  Info,
  SinglePastelID,
} from './components/AppState'
import Utils, { NO_CONNECTION } from './utils/utils'
import SentTxStore from './utils/SentTxStore'
import { fetchTandZTransactions } from '../features/pastelSentTxStore/transactions'

const parseMemo = (memoHex: any) => {
  if (!memoHex || memoHex.length < 2) return null // First, check if this is a memo (first byte is less than 'f6' (246))

  if (parseInt(memoHex.substr(0, 2), 16) >= 246) return null // Else, parse as Hex string

  const textDecoder = new TextDecoder()
  const memo = textDecoder.decode(hex.decode(memoHex))
  if (memo === '') return null
  return memo
}

class OpidMonitor {}

export default class RPC {
  constructor(
    public fnSetTotalBalance: any,
    public fnSetAddressesWithBalance: any,
    public fnSetTransactionsList: any,
    public fnSetAllAddresses: any,
    public fnSetInfo: any,
    public fnSetPslPrice: any,
    public fnSetDisconnected: any,
  ) {}
  opids = new Set<any>()
  rpcConfig: any
  refreshTimerID: any
  opTimerID: any
  priceTimerID: any

  async configure(rpcConfig: any) {
    this.rpcConfig = rpcConfig

    // if (!this.refreshTimerID) {
    //   this.refreshTimerID = setTimeout(() => this.refresh(), 1000)
    // }

    if (!this.opTimerID) {
      this.opTimerID = setTimeout(() => this.refreshOpStatus(), 1000)
    }

    // disabling pastel price in favor of features/PastelPrice
    // if (!this.priceTimerID) {
    //   this.priceTimerID = setTimeout(() => this.getPslPrice(), 1000)
    // }
  }

  setupNextFetch(lastBlockHeight: any) {
    this.refreshTimerID = setTimeout(
      () => this.refresh(lastBlockHeight),
      60 * 1000,
    )
  }

  static async doRPC(method: any, params: any, rpcConfig: any) {
    const { url, username, password } = rpcConfig
    const response = await new Promise((resolve, reject) => {
      axios(url, {
        data: {
          jsonrpc: '2.0',
          id: method,
          method,
          params,
        },
        method: 'POST',
        auth: {
          username,
          password,
        },
      })
        .then(r => resolve(r.data))
        .catch(err => {
          const e = { ...err }
          console.log(e)

          if (e.response && e.response.data) {
            log.error(
              `legacy/rpc response error. Response: ${JSON.stringify(
                e.response?.data,
              )}. Status code: ${JSON.stringify(e.response?.status)}`,
            )
            reject(e.response.data.error.message)
          } else {
            log.error(
              `legacy/rpc no connection. Error: ${JSON.stringify(
                e?.config?.data,
              )}`,
            )
            reject(NO_CONNECTION)
          }
        })
    })
    return response
  }

  async refresh(lastBlockHeight?: any) {
    let latestBlockHeight

    try {
      latestBlockHeight = await this.fetchInfo()
    } catch (err) {
      // If we caught an error, there's something wrong with the connection.
      this.fnSetDisconnected(`${err}`)
      return
    }

    if (!lastBlockHeight || lastBlockHeight < latestBlockHeight) {
      try {
        const balP = this.fetchTotalBalance()
        const abP = this.fetchTandZAddressesWithBalances()
        const txns = fetchTandZTransactions(
          this.rpcConfig,
          this.fnSetTransactionsList,
        )
        const addrs = this.fetchAllAddresses()
        await balP
        await abP
        await txns
        await addrs // All done, set up next fetch

        console.log(`Finished full refresh at ${latestBlockHeight}`)
      } catch (err) {
        // If we caught an error, there's something wrong with the connection.
        this.fnSetDisconnected(`${err}`)
        return
      }
    } else {
      // Still at the latest block
      console.log('Already have latest block, waiting for next refresh')
    }

    this.setupNextFetch(latestBlockHeight)
  } // Special method to get the Info object. This is used both internally and by the Loading screen

  static async getInfoObject(rpcConfig: any) {
    const infoResult: any = await RPC.doRPC('getinfo', [], rpcConfig)
    const info: any = new Info()
    info.testnet = infoResult.result.testnet
    info.latestBlock = infoResult.result.blocks
    info.connections = infoResult.result.connections
    info.version = infoResult.result.version
    info.currencyName = info.testnet ? 'LSP' : 'PSL'
    info.pslPrice = null // Setting this to null will copy over the existing price

    info.disconnected = false
    const blkInfoResult: any = await RPC.doRPC(
      'getblockchaininfo',
      [],
      rpcConfig,
    )
    info.verificationProgress = blkInfoResult.result.verificationprogress
    const solps: any = await RPC.doRPC('getnetworksolps', [], rpcConfig)
    info.solps = solps.result
    return info
  }

  async doImportPrivKey(key: any, rescan: any) {
    // Z address
    if (key.startsWith('p-secret-extended-key')) {
      try {
        const r: any = await RPC.doRPC(
          'z_importkey',
          [key, rescan ? 'yes' : 'no'],
          this.rpcConfig,
        )
        console.log(r.result)
        return ''
      } catch (err) {
        return err
      }
    } else if (key.startsWith('zxview')) {
      try {
        const r: any = await RPC.doRPC(
          'z_importviewingkey',
          [key, rescan ? 'yes' : 'no'],
          this.rpcConfig,
        )
        console.log(r.result)
        return ''
      } catch (err) {
        return err
      }
    } else {
      try {
        const r: any = await RPC.doRPC(
          'importprivkey',
          [key, 'imported', rescan],
          this.rpcConfig,
        )
        console.log(r.result)
        return ''
      } catch (err) {
        return err
      }
    }
  }

  async doImportANIPrivKey(key: any) {
    // ingest ani2psl_secret <ANI private key>
    if (key.startsWith('P') && key.length === 52) {
      try {
        const pslSecretKey: any = await RPC.doRPC(
          'ingest',
          ['ani2psl_secret', key],
          this.rpcConfig,
        )
        console.log(pslSecretKey.result)
        console.log(
          'Done converting ANI private key into the corresponding PSL private key.',
        ) // current_date = new Date().toLocaleString();
        // const r = await RPC.doRPC('importprivkey', [pslSecretKey.result, 'imported from ANI private key on '.concat(current_date), rescan], this.rpcConfig);
        // console.log(r.result);
        // return '';
        // console.log('Now attempting to import the PSL private key...')
        // const r = await doImportPrivKey(pslSecretKey: string, rescan: boolean)
        // console.log('Done importing private key!')

        return pslSecretKey.result
      } catch (err) {
        return err
      }
    } else {
      console.log(
        'Error: The entered ANI private key was the wrong length or did not start with the character "p"!',
      )
    }
  }

  async fetchInfo() {
    const info = await RPC.getInfoObject(this.rpcConfig)
    this.fnSetInfo(info)
    return info.latestBlock
  } // This method will get the total balances

  async fetchTotalBalance() {
    const response: any = await RPC.doRPC(
      'z_gettotalbalance',
      [0],
      this.rpcConfig,
    )
    const balance: any = new TotalBalance()
    balance.total = response.result.total
    balance.private = response.result.private
    balance.transparent = response.result.transparent
    this.fnSetTotalBalance(balance)
  }

  async createNewAddress(zaddress: any) {
    if (zaddress) {
      const newaddress: any = await RPC.doRPC(
        'z_getnewaddress',
        [],
        this.rpcConfig,
      )
      return newaddress.result
    } else {
      const newaddress: any = await RPC.doRPC(
        'getnewaddress',
        [''],
        this.rpcConfig,
      )
      return newaddress.result
    }
  }

  async getPrivKeyAsString(address: any) {
    let method = ''

    if (Utils.isZaddr(address)) {
      method = 'z_exportkey'
    } else if (Utils.isTransparent(address)) {
      method = 'dumpprivkey'
    }

    const response: any = await RPC.doRPC(method, [address], this.rpcConfig)
    return response.result
  }

  async getViewKeyAsString(address: any) {
    let method = ''

    if (Utils.isZaddr(address)) {
      method = 'z_exportviewingkey'
    } else {
      return ''
    }

    const response: any = await RPC.doRPC(method, [address], this.rpcConfig)
    return response.result
  } // Fetch all addresses and their associated balances

  async fetchTandZAddressesWithBalances() {
    const zresponse: any = RPC.doRPC('z_listunspent', [0], this.rpcConfig)
    const tresponse: any = RPC.doRPC('listunspent', [0], this.rpcConfig) // Do the Z addresses
    // response.result has all the unspent notes.

    const unspentNotes = (await zresponse).result

    const zgroups = _.groupBy(unspentNotes, 'address')

    const zaddresses = Object.keys(zgroups).map(address => {
      const balance = zgroups[address].reduce(
        (prev, obj) => prev + obj.amount,
        0,
      )
      return new AddressBalance(address, Number(balance.toFixed(5)))
    }) // Do the T addresses

    const unspentTXOs = (await tresponse).result

    const tgroups = _.groupBy(unspentTXOs, 'address')

    const taddresses = Object.keys(tgroups).map(address => {
      const balance = tgroups[address].reduce(
        (prev, obj) => prev + obj.amount,
        0,
      )
      return new AddressBalance(address, Number(balance.toFixed(5)))
    })
    const addresses = zaddresses.concat(taddresses)
    this.fnSetAddressesWithBalance(addresses)
  } // Fetch all T and Z transactions

  async fetchAllAddresses() {
    const zaddrsPromise: any = RPC.doRPC('z_listaddresses', [], this.rpcConfig)
    const taddrsPromise: any = RPC.doRPC(
      'getaddressesbyaccount',
      [''],
      this.rpcConfig,
    )
    const allZ = (await zaddrsPromise).result
    const allT = (await taddrsPromise).result
    this.fnSetAllAddresses(allZ.concat(allT))
  } // Send a transaction using the already constructed sendJson structure

  async sendTransaction(sendJson: any, fnOpenSendErrorModal: any) {
    try {
      const opid: string = ((await RPC.doRPC(
        'z_sendmany',
        sendJson,
        this.rpcConfig,
      )) as any).result
      const monitor: any = new OpidMonitor()
      monitor.opid = opid
      monitor.fnOpenSendErrorModal = fnOpenSendErrorModal
      this.addOpidToMonitor(monitor)
      return true
    } catch (err) {
      // TODO Show a modal with the error
      console.log(`Error sending Tx: ${err}`)
      throw err
    }
  } // Start monitoring the given opid

  async addOpidToMonitor(monitor: any) {
    this.opids.add(monitor)
    this.refreshOpStatus()
  }

  setupNextOpidSatusFetch() {
    if (this.opids.size > 0) {
      this.opTimerID = setTimeout(() => this.refreshOpStatus(), 2000) // 2 sec
    } else {
      this.opTimerID = null
    }
  }

  async refreshOpStatus() {
    if (this.opids.size > 0) {
      // Get all the operation statuses.
      ;[...this.opids].map(async (monitor: any) => {
        try {
          const resultJson: any = await RPC.doRPC(
            'z_getoperationstatus',
            [[monitor.opid]],
            this.rpcConfig,
          )
          const result = resultJson.result[0]

          if (result.status === 'success') {
            const { txid } = result.result
            monitor.fnOpenSendErrorModal(
              'Successfully Broadcast Transaction',
              `Transaction was successfully broadcast. TXID: ${txid}`,
            )
            this.opids.delete(monitor) // And force a refresh to update the balances etc...

            this.refresh(null)
          } else if (result.status === 'failed') {
            monitor.fnOpenSendErrorModal(
              'Error Sending Transaction',
              `Opid ${monitor.opid} Failed. ${result.error.message}`,
            )
            this.opids.delete(monitor)
          }
        } catch (err) {
          // If we can't get a response for this OPID, then just forget it and move on
          this.opids.delete(monitor)
        }
      })
    }

    this.setupNextOpidSatusFetch()
  }

  setupNextPslPriceRefresh(retryCount: any, timeout: any) {
    // Every hour
    this.priceTimerID = setTimeout(() => this.getPslPrice(retryCount), timeout)
  }

  async getPslPrice(retryCount?: any) {
    if (!retryCount) {
      retryCount = 0
    }

    try {
      const response: any = await new Promise((resolve, reject) => {
        axios('https://api.coincap.io/v2/rates/pastel', {
          method: 'GET',
        })
          .then(r => resolve(r.data))
          .catch(err => {
            reject(err)
          })
      })
      const pslData = response.data

      if (pslData) {
        // TODO: Get Real PSL price!!!
        this.fnSetPslPrice(0.0025)
        this.setupNextPslPriceRefresh(0, 1000 * 60 * 60) // Every hour
      } else {
        this.fnSetPslPrice(null)
        let timeout = 1000 * 60 // 1 minute

        if (retryCount > 5) {
          timeout = 1000 * 60 * 60 // an hour later
        }

        this.setupNextPslPriceRefresh(retryCount + 1, timeout)
      }
    } catch (err) {
      console.log(err)
      this.fnSetPslPrice(null)
      let timeout = 1000 * 60 // 1 minute

      if (retryCount > 5) {
        timeout = 1000 * 60 * 60 // an hour later
      }

      this.setupNextPslPriceRefresh(retryCount + 1, timeout)
    }
  }

  async createNewPastelID(passphrase: any) {
    const resp: any = await RPC.doRPC(
      'pastelid',
      ['newkey', passphrase],
      this.rpcConfig,
    )
    const res = new SinglePastelID(resp.result.pastelid)
    return res
  }

  async getPastelIDs() {
    let resp: any = []

    try {
      resp = await RPC.doRPC('pastelid', ['list'], this.rpcConfig)
    } catch (error) {
      if (
        // this happens when there is no PastelIDs created yet, therefore this is a valid state.
        String(error).indexOf(
          'boost::filesystem::directory_iterator::construct: The system cannot find the path specified',
        ) !== -1
      ) {
        return []
      }
    } // TODO RPC calls "pastel list" and "pastel newkey <pass>" return inconsistent results:
    // one returns [{ PastelID: string }] and the other { pastelid: string }. This difference in keys must be fixed on RPC side.
    // The loop below is a workaroud to translate the [{ PastelID: string }] of "pastel list" into [{ pastelid: string }].

    if (resp.result === null || resp.result.length === 0) {
      return []
    }

    return resp.result.map((id: any) => {
      return new SinglePastelID(id.PastelID)
    })
  }
}
