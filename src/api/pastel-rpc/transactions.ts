import hex from 'hex-string'

import { Transaction, TxDetail } from '../../declarations/app-state'
import SentTxStore from '../../declarations/sent-tx-store'
import {
  getRawTransaction,
  getWalletTransaction,
  listAddresses,
  listTransactions,
  zListReceivedByAddress,
} from './network-stats'
import {
  TDetails,
  TListTransactions,
  TRawTransaction,
  TTransactionInfo,
  TVin,
  TZListReceivedByAddress,
} from './network-stats/type'
import { TRPCConfig } from './rpc'

const parseMemo = (memoHex: string) => {
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

export async function fetchTandZTransactions(
  config: TRPCConfig,
  cb: (alltxlist: TListTransactions[]) => void,
): Promise<void> {
  const senttxstorePromise = SentTxStore.loadSentTxns()

  const tresponse: TListTransactions[] = await listTransactions(config)

  const existAddresses: string[] = []
  const ttxlistPromise = tresponse
    .sort(
      (tx1: TListTransactions, tx2: TListTransactions) => tx2.time - tx1.time,
    )
    .map(async (tx: TListTransactions) => {
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
          const rawTransaction: TRawTransaction = await getRawTransaction(
            tx.txid,
            config,
          )

          const inputAddresses: string[] = []
          await rawTransaction.vin.map(async (v: TVin) => {
            try {
              const ttxlist: TTransactionInfo = await getWalletTransaction(
                v.txid,
                config,
              )

              ttxlist.details.map((d: TDetails) => {
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

  const ttxlist: TListTransactions[] = (
    await Promise.all(ttxlistPromise)
  ).flat()

  const zaddresses = await listAddresses(config)

  const alltxnsPromise = zaddresses.map(async (zaddr: string) => {
    // For each zaddr, get the list of incoming transactions
    const incomingTxns: TZListReceivedByAddress[] = await zListReceivedByAddress(
      zaddr,
      config,
    )
    const txns: any = incomingTxns
      .filter((itx: TZListReceivedByAddress) => !itx.change)
      .map((incomingTx: TZListReceivedByAddress) => {
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
      const txresponse: TTransactionInfo = await getWalletTransaction(
        tx.txid,
        config,
      )
      const transaction: any = new Transaction()
      transaction.address = tx.address
      transaction.type = 'receive'
      transaction.amount = tx.amount
      transaction.confirmations = txresponse.confirmations
      transaction.txid = tx.txid
      transaction.time = txresponse.time
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

  const alltxlist: TListTransactions[] = ttxlist
    .concat(ztxlist)
    .concat(sentTxns)
    .sort((tx1: TListTransactions, tx2: TListTransactions) => {
      if (tx1.time && tx2.time) {
        return tx2.time - tx1.time
      }

      return tx1.confirmations - tx2.confirmations
    })

  cb(alltxlist)
}
