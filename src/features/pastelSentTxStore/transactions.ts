import m from 'hex-string'

import { rpc, TRPCConfig } from '../../api/pastel-rpc/rpc'
import * as types from '../pastelDB/type'
import { loadSentTxns } from './sent-tx-store'

const parseMemo = (memoHex: string) => {
  if (!memoHex || memoHex.length < 2) {
    return null
  } // First, check if this is a memo (first byte is less than 'f6' (246))

  if (parseInt(memoHex.substr(0, 2), 16) >= 246) {
    return null
  } // Else, parse as Hex string

  const textDecoder = new TextDecoder()
  const memo = textDecoder.decode(m.decode(memoHex))
  if (memo === '') {
    return null
  }
  return memo
}

export async function fetchTandZTransactions(
  config: TRPCConfig,
  cb: (alltxlist: types.TListTransactions[]) => void,
): Promise<void> {
  const senttxstorePromise = await loadSentTxns()
  const { result } = await rpc<types.Tlisttransactions>(
    'listtransactions',
    [],
    config,
  )

  const existAddresses: string[] = []
  const ttxlistPromise = result
    .sort(
      (tx1: types.TListTransactions, tx2: types.TListTransactions) =>
        tx2.time - tx1.time,
    )
    .map(async (tx: types.TListTransactions) => {
      const transaction: types.TListTransactions = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: 0,
        blockindex: 0,
        blocktime: 0,
        expiryheight: 0,
        txid: '',
        walletconflicts: [],
        time: 0,
        timereceived: 0,
        vjoinsplit: [],
        size: 0,
        lastblock: '',
      }
      transaction.address = tx.address
      transaction.type = tx.category
      transaction.amount = tx.amount
      transaction.fee = Math.abs(tx.fee || 0)
      transaction.confirmations = tx.confirmations
      transaction.txid = tx.txid
      transaction.time = tx.time
      transaction.detailedTxns = [
        {
          address: '',
          amount: 0,
        },
      ]
      transaction.detailedTxns[0].address = tx.address
      transaction.detailedTxns[0].amount = tx.amount
      if (
        tx.category === 'send' &&
        tx.address &&
        existAddresses.indexOf(tx.address) === -1
      ) {
        existAddresses.push(tx.address)
        try {
          const { result } = await rpc<types.TGetrawtransaction>(
            'getrawtransaction',
            [tx.txid, 1],
            config,
          )

          const inputAddresses: string[] = []
          await result.vin.map(async (v: types.TVin) => {
            try {
              const { result } = await rpc<types.TGettransaction>(
                'gettransaction',
                [v.txid],
                config,
              )

              result.details.map((d: types.TDetails) => {
                if (d && inputAddresses.indexOf(d.address) === -1) {
                  inputAddresses.push(d.address)
                }
              })
            } catch (err) {
              inputAddresses.push('')
            }
          })
          transaction.inputAddresses = inputAddresses
        } catch (err) {
          transaction.inputAddresses = []
        }
      } else {
        transaction.inputAddresses = []
      }
      return transaction
    }) // Now get Z txns

  const ttxlist: types.TListTransactions[] = (
    await Promise.all(ttxlistPromise)
  ).flat()

  const zaddresses = await rpc<types.Tlistaddresses>(
    'z_listaddresses',
    [],
    config,
  )
  const alltxnsPromise = zaddresses.result.map(async (zaddr: string) => {
    // For each zaddr, get the list of incoming transactions
    const incomingTxns = await rpc<types.TListReceivedByAddress>(
      'z_listreceivedbyaddress',
      [zaddr, 0],
      config,
    )
    const txns = incomingTxns.result
      .filter((itx: types.TZListReceivedByAddress) => !itx.change)
      .map((incomingTx: types.TZListReceivedByAddress) => {
        return {
          address: zaddr,
          txid: incomingTx.txid,
          memo: parseMemo(incomingTx.memo),
          amount: incomingTx.amount,
          index: incomingTx.outindex,
        }
      })
    return txns
  })
  const alltxns = (await Promise.all(alltxnsPromise)).flat() // Now, for each tx in the array, call gettransaction
  const ztxlist = await Promise.all(
    alltxns.map(async tx => {
      const txresponse = await rpc<types.TGettransaction>(
        'gettransaction',
        [tx.txid],
        config,
      )
      const transaction: types.TListTransactions = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: 0,
        blockindex: 0,
        blocktime: 0,
        expiryheight: 0,
        txid: '',
        walletconflicts: [],
        time: 0,
        timereceived: 0,
        vjoinsplit: [],
        size: 0,
        lastblock: '',
      }
      transaction.address = tx.address
      transaction.type = 'receive'
      transaction.amount = tx.amount
      transaction.confirmations = txresponse.result.confirmations
      transaction.txid = tx.txid
      transaction.time = txresponse.result.time
      transaction.index = tx.index || 0
      transaction.detailedTxns = [
        {
          address: '',
          amount: 0,
        },
      ]
      transaction.detailedTxns[0].address = tx.address
      transaction.detailedTxns[0].amount = tx.amount
      transaction.inputAddresses = []

      transaction.detailedTxns[0].memo = tx.memo
        ? tx.memo.replace(/\\u0000/g, '')
        : tx.memo
      return transaction
    }),
  ) // Get transactions from the sent tx store

  const sentTxns = await senttxstorePromise // Now concat the t and z transactions, and call the update function again
  const alltxlist: types.TListTransactions[] = ttxlist
    .concat(ztxlist)
    .concat(sentTxns)
    .sort((tx1: types.TListTransactions, tx2: types.TListTransactions) => {
      if (tx1.time && tx2.time) {
        return tx2.time - tx1.time
      }

      return tx1.confirmations - tx2.confirmations
    })

  cb(alltxlist)
}
