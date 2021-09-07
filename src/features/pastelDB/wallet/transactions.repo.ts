import { Database, Statement } from 'better-sqlite3'
import {
  TAddress,
  TSinceBlockTransaction,
  TTransaction,
} from '../../../types/rpc'
import { useQuery, UseQueryResult } from 'react-query'
import { useDb } from '../../app/AppContext'

export type TDbTransaction = {
  id: number
  account: string
  address?: string
  category: string
  amount: number
  vout: number
  fee: number
  confirmations: number
  blockhash: string
  blockindex: number
  blocktime: number
  expiryheight: number
  txid: string
  walletconflicts: string
  time: number
  timereceived: number
  vjoinsplit: string
  size: number
  createdAt: number
}

type TRpcTransaction = Omit<
  TTransaction | TSinceBlockTransaction,
  'address'
> & { address?: string }

export function insertTransactions(
  db: Database,
  transactions: TRpcTransaction[],
): void {
  const stmt = db.prepare(insertQuery)
  for (let i = 0; i < transactions.length; i++) {
    insertTransaction(db, transactions[i], stmt)
  }
}

// ignoring duplicates for txid and vout
const insertQuery = `INSERT OR IGNORE INTO transactions(
  account,
  address,
  category,
  amount,
  vout,
  confirmations,
  blockhash,
  blockindex,
  blocktime,
  expiryheight,
  txid,
  walletconflicts,
  time,
  timereceived,
  vjoinsplit,
  size,
  createdAt
) VALUES (
  $account,
  $address,
  $category,
  $amount,
  $vout,
  $confirmations,
  $blockhash,
  $blockindex,
  $blocktime,
  $expiryheight,
  $txid,
  $walletconflicts,
  $time,
  $timereceived,
  $vjoinsplit,
  $size,
  $createdAt
)`

export function insertTransaction(
  db: Database,
  transaction: TRpcTransaction,
  stmt: Statement = db.prepare(insertQuery),
): void {
  const walletconflicts = JSON.stringify(transaction.walletconflicts)
  const vjoinsplit = JSON.stringify(transaction.vjoinsplit)
  const values = {
    account: transaction.account,
    address: transaction.address ?? null,
    category: transaction.category,
    amount: transaction.amount,
    vout: transaction.vout,
    confirmations: transaction.confirmations,
    blockhash: transaction.blockhash,
    blockindex: transaction.blockindex,
    blocktime: transaction.blocktime,
    expiryheight: transaction.expiryheight,
    txid: transaction.txid,
    walletconflicts: walletconflicts,
    time: transaction.time,
    timereceived: transaction.timereceived,
    vjoinsplit: vjoinsplit,
    size: transaction.size,
    createdAt: Date.now(),
  }

  stmt.run(values)
}

type TAddressesLastActivityTime = Record<TAddress, number>

export const getAddressesLastActivityTime = (
  db: Database,
): TAddressesLastActivityTime => {
  const result = db
    .prepare(
      `
      SELECT address, max(time) AS time FROM transactions
      WHERE address IS NOT NULL
      GROUP BY address
    `,
    )
    .all()
  return Object.fromEntries(result.map(row => [row.address, row.time]))
}

export const useAddressesLastActivityTime = (): UseQueryResult<TAddressesLastActivityTime> => {
  const db = useDb()
  return useQuery('transactions/addressesLastActivityTime', () =>
    getAddressesLastActivityTime(db),
  )
}
