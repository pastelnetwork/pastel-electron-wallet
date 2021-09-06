import { Database, Statement } from 'better-sqlite3'
import { TAddress, TTransaction } from '../../../types/rpc'
import { useQuery, UseQueryResult } from 'react-query'
import { useDb } from '../../app/AppContext'

export type TDbListTransaction = {
  id: number
  account: string
  address: string
  category: string
  amount: number
  vout: number
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

export const createListTransactions = (db: Database): void => {
  db.exec(`CREATE TABLE IF NOT EXISTS listtransactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account VARCHAR(255),
    address VARCHAR(255),
    category VARCHAR(255),
    amount int,
    vout int,
    confirmations int,
    blockhash VARCHAR(255),
    blockindex int,
    blocktime int,
    expiryheight int,
    txid VARCHAR(255),
    walletconflicts text,
    time int,
    timereceived int,
    vjoinsplit text,
    size int,
    createdAt int
  )`)
}

export function insertListTransactions(
  db: Database,
  transactions: TTransaction[],
): void {
  const stmt = db.prepare(insertQuery)
  const transaction = db.transaction(() => {
    for (let i = 0; i < transactions.length; i++) {
      insertListTransaction(db, transactions[i], stmt)
    }
  })
  transaction()
}

const insertQuery = `INSERT INTO listtransactions(
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

export function insertListTransaction(
  db: Database,
  transaction: TTransaction,
  stmt?: Statement,
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

  ;(stmt || db.prepare(insertQuery)).run(values)
}

const countQuery = 'SELECT count(*) FROM listtransactions'

export const getListTransactionsCount = (db: Database): number => {
  const result = db.prepare(countQuery).get()
  return (result?.count || 0) as number
}

type TAddressesLastActivityTime = Record<TAddress, number>

export const getAddressesLastActivityTime = (
  db: Database,
): TAddressesLastActivityTime => {
  const result = db
    .prepare(
      `
      SELECT address, max(time) AS time FROM listtransactions
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
