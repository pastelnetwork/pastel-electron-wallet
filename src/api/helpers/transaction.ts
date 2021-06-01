import transcoder from 'hex-string'

import {
  IBaseAddAm,
  IBaseTransaction,
  ITransaction,
  ITTransactionInfoResult,
  ITTransactionResult,
} from '../../types/rpc'

/**
 * Parse memo
 * @param memoHex
 * @returns string
 */
const parseMemo = (memoHex: string): string => {
  if (!memoHex || memoHex.length < 2) {
    return ''
  } // First, check if this is a memo (first byte is less than 'f6' (246))

  if (parseInt(memoHex.substr(0, 2), 16) >= 246) {
    return ''
  } // Else, parse as Hex string

  const textDecoder = new TextDecoder()
  const memo = textDecoder.decode(transcoder.decode(memoHex))
  if (memo === '') {
    return ''
  }
  return memo
}

/**
 * Sort transaction result
 *
 * @param transactions
 * @returns ITTransactionResult[]
 */
const sortTxnsResult = (
  transactions: ITTransactionResult[],
): ITTransactionResult[] =>
  transactions.sort((tx1: ITTransactionResult, tx2: ITTransactionResult) => {
    if (tx1.time && tx2.time) {
      return tx2.time - tx1.time
    }

    return tx1.confirmations - tx2.confirmations
  })

/**
 * Map transaction result.
 *
 * @param tx Transaction item (from the list)
 * @param txInfoResult Transaction info
 * @returns
 */
const mapTxnsResult = (
  tx: IBaseTransaction,
  txInfoResult: ITTransactionInfoResult,
): ITransaction => {
  const { address, amount, txid, index = 0 } = tx
  const { confirmations, time } = txInfoResult
  const memo = tx.memo ? tx.memo.replace(/\\u0000/g, '') : ''
  const detailedTxns: (IBaseAddAm & { memo: string | null })[] = [
    {
      address,
      amount,
      memo,
    },
  ]

  return {
    account: '',
    address,
    category: '',
    amount,
    vout: 0,
    confirmations,
    blockhash: 0,
    blockindex: 0,
    blocktime: 0,
    expiryheight: 0,
    txid,
    walletconflicts: [],
    time,
    index,
    timereceived: 0,
    vjoinsplit: [],
    size: 0,
    lastblock: '',
    type: 'receive',
    detailedTxns,
    inputAddresses: [],
  }
}

export { mapTxnsResult, parseMemo, sortTxnsResult }
