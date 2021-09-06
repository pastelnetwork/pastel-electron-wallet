import m from 'hex-string'
import {
  TTransaction,
  TTransactionDetail,
  TVin,
  TTransactionResponse,
  TRawTransactionResponse,
  TListAddressesResponse,
  TZListReceivedByAddressResponse,
  TZListReceivedByAddress,
  TTransactionInfoResponse,
  TBaseTransaction,
} from 'types/rpc'

import { rpc } from '../../api/pastel-rpc'
import { loadSentTxns } from './sentTxStore'

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
  cb: (alltxlist: TTransaction[]) => void,
): Promise<void> {
  const senttxstorePromise = await loadSentTxns()
  const result = await rpc<TTransactionResponse>('listtransactions', [], {
    throw: true,
  })

  const existAddresses: string[] = []
  const ttxlistPromise = result
    .sort((tx1: TTransaction, tx2: TTransaction) => tx2.time - tx1.time)
    .map(async (tx: TTransaction) => {
      const transaction: TTransaction = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: '',
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
          const { result } = await rpc<TRawTransactionResponse>(
            'getrawtransaction',
            [tx.txid, 1],
          )

          const inputAddresses: string[] = []
          await result.vin.map(async (v: TVin) => {
            try {
              const { result } = await rpc<TRawTransactionResponse>(
                'gettransaction',
                [v.txid],
              )

              result.details.map((d: TTransactionDetail) => {
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

  const ttxlist: TTransaction[] = (await Promise.all(ttxlistPromise)).flat()

  const zaddresses = await rpc<TListAddressesResponse>('z_listaddresses', [], {
    throw: true,
  })
  const alltxnsPromise = zaddresses.map(async (address: string) => {
    // For each zaddr, get the list of incoming transactions
    const incomingTxns = await rpc<TZListReceivedByAddressResponse>(
      'z_listreceivedbyaddress',
      [address, 0],
    )
    const txns: TBaseTransaction[] = incomingTxns.result
      .filter((itx: TZListReceivedByAddress) => !itx.change)
      .map((incomingTx: TZListReceivedByAddress) => {
        const memo = parseMemo(incomingTx.memo) || ''
        const { txid, amount, outindex: index } = incomingTx
        return { address, txid, memo, amount, index }
      })
    return txns
  })
  const alltxns: TBaseTransaction[] = (await Promise.all(alltxnsPromise)).flat() // Now, for each tx in the array, call gettransaction
  const ztxlist = await Promise.all(
    alltxns.map(async tx => {
      const txresponse = await rpc<TTransactionInfoResponse>('gettransaction', [
        tx.txid,
      ])
      const transaction: TTransaction = {
        account: '',
        address: '',
        category: '',
        amount: 0,
        vout: 0,
        confirmations: 0,
        blockhash: '',
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
  const alltxlist: TTransaction[] = ttxlist
    .concat(ztxlist)
    .concat(sentTxns)
    .sort((tx1: TTransaction, tx2: TTransaction) => {
      if (tx1.time && tx2.time) {
        return tx2.time - tx1.time
      }

      return tx1.confirmations - tx2.confirmations
    })

  cb(alltxlist)
}
