import hex from 'hex-string'

import { Transaction, TxDetail } from '../../legacy/components/AppState'
import SentTxStore from '../../legacy/utils/SentTxStore'
import { rpc, TRPCConfig } from './rpc'

const parseMemo = (memoHex: any) => {
  if (!memoHex || memoHex.length < 2) {
    return null
  } // First, check if this is a memo (first byte is less than 'f6' (246))

  if (parseInt(memoHex.substr(0, 2), 16) >= 246) {
    return null
  } // Else, parse as Hex string

  const textDecoder = new TextDecoder()
  const memo = textDecoder.decode(hex.decode(memoHex))
  if (memo === '') {
    return null
  }
  return memo
}

export async function fetchTandZTransactions(config: TRPCConfig, cb: any) {
  const tresponse: any = await rpc('listtransactions', [], config)

  const zaddressesPromise = rpc('z_listaddresses', [], config)
  const senttxstorePromise = SentTxStore.loadSentTxns()
  const existAddresses: string[] = []
  const ttxlistPromise = tresponse.result
    .sort((tx1: any, tx2: any) => tx2.time - tx1.time)
    .map(async (tx: any) => {
      const transaction: any = new Transaction()
      transaction.address = tx.address
      transaction.type = tx.category
      transaction.amount = tx.amount
      transaction.fee = Math.abs(tx.fee || 0)
      transaction.confirmations = tx.confirmations
      transaction.txid = tx.txid
      transaction.time = tx.time
      transaction.detailedTxns = [new TxDetail()]
      transaction.detailedTxns[0].address = tx.address
      transaction.detailedTxns[0].amount = tx.amount
      if (
        tx.category === 'send' &&
        tx.address &&
        existAddresses.indexOf(tx.address) === -1
      ) {
        existAddresses.push(tx.address)
        try {
          const rawTransaction: any = await rpc(
            'getrawtransaction',
            [tx.txid, 1],
            config,
          )

          const inputAddresses: string[] = []
          await rawTransaction.result.vin.map(async (v: any) => {
            try {
              const ttxlist: any = await rpc('gettransaction', [v.txid], config)

              ttxlist.result.details.map((d: any) => {
                if (inputAddresses.indexOf(d.address) === -1) {
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

  const ttxlist = (await Promise.all(ttxlistPromise)).flat()

  const zaddresses: any = await zaddressesPromise
  const alltxnsPromise = zaddresses.result.map(async (zaddr: any) => {
    // For each zaddr, get the list of incoming transactions
    const incomingTxns: any = await rpc(
      'z_listreceivedbyaddress',
      [zaddr, 0],
      config,
    )
    const txns: any = incomingTxns.result
      .filter((itx: any) => !itx.change)
      .map((incomingTx: any) => {
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
    alltxns.map(async (tx: any) => {
      const txresponse: any = await rpc('gettransaction', [tx.txid], config)
      const transaction: any = new Transaction()
      transaction.address = tx.address
      transaction.type = 'receive'
      transaction.amount = tx.amount
      transaction.confirmations = txresponse.result.confirmations
      transaction.txid = tx.txid
      transaction.time = txresponse.result.time
      transaction.index = tx.index || 0
      transaction.detailedTxns = [new TxDetail()]
      transaction.detailedTxns[0].address = tx.address
      transaction.detailedTxns[0].amount = tx.amount
      transaction.inputAddresses = []

      transaction.detailedTxns[0].memo = tx.memo
        ? tx.memo.replace(/\u0000/g, '')
        : tx.memo
      return transaction
    }),
  ) // Get transactions from the sent tx store

  const sentTxns = await senttxstorePromise // Now concat the t and z transactions, and call the update function again

  const alltxlist = ttxlist
    .concat(ztxlist)
    .concat(sentTxns)
    .sort((tx1: any, tx2: any) => {
      if (tx1.time && tx2.time) {
        return tx2.time - tx1.time
      }

      return tx1.confirmations - tx2.confirmations
    })

  cb(alltxlist)
}
