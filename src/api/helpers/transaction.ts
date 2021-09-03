import transcoder from 'hex-string'
import { TxDetail, TRpcParam, TTransferPayload } from 'types/rpc'

import {
  TAddressBalance,
  TBaseAddAm,
  TBaseTransaction,
  TTransaction,
  TTransactionInfo,
  TTransactionType,
} from '../../types/rpc'
import { isSapling } from './wallet'

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
const sortTxnsResult = (transactions: TTransaction[]): TTransaction[] =>
  transactions.sort((tx1: TTransaction, tx2: TTransaction) => {
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
  tx: TBaseTransaction,
  txInfoResult: TTransactionInfo,
): TTransaction => {
  const { address, amount, txid, index = 0 } = tx
  const { confirmations, time } = txInfoResult
  const memo = tx.memo ? tx.memo.replace(/\\u0000/g, '') : ''
  const detailedTxns: (TBaseAddAm & { memo: string | null })[] = [
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
    blockhash: '',
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
    type: TTransactionType.RECEIVE,
    detailedTxns,
    inputAddresses: [],
  }
}

const getDefaultFee = (height: number): number => {
  if (height >= 1080000) {
    return 0.00001
  } else {
    return 0.0001
  }
}

const getAddressesWithHighBalances = (
  addressesWithBalance: TAddressBalance[],
): TAddressBalance[] => {
  // Find a z-address with the high balance
  return addressesWithBalance
    .filter((ab: TAddressBalance) => isSapling(ab.address.toString()))
    .filter((ab: TAddressBalance) => ab.balance > 0)
}

const getTransferJson = (
  data: TTransferPayload,
  latestBlock: number,
): TRpcParam[] => {
  const json = []
  json.push(data.from)
  json.push(
    data.to.map((to: TxDetail) => {
      const textEncoder = new TextEncoder()
      const memo = to.memo ? transcoder.encode(textEncoder.encode(to.memo)) : ''

      if (memo === '') {
        return {
          address: to.address,
          amount: to.amount,
        }
      } else {
        return {
          address: to.address,
          amount: to.amount,
          memo,
        }
      }
    }),
  )
  json.push(1) // minconf = 1

  json.push(getDefaultFee(latestBlock)) // Control the default fee as well.

  return json
}

export {
  mapTxnsResult,
  parseMemo,
  sortTxnsResult,
  getTransferJson,
  getAddressesWithHighBalances,
}
