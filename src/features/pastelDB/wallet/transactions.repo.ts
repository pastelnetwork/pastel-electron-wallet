import { Database } from 'sql.js'
import { TAddress, TTransactionResponse } from '../../../types/rpc'
import { useQuery, UseQueryResult } from 'react-query'
import { useDb } from '../../app/AppContext'

export const createListTransactions = (db: Database): void => {
  db.exec(`CREATE TABLE listtransactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account VARCHAR(255),
    address VARCHAR(255),
    category VARCHAR(255),
    amount int,
    vout int,
    confirmations int,
    blockhash int,
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
  transactions: TTransactionResponse,
): void {
  for (let i = 0; i < transactions.length; i++) {
    insertListTransaction(db, transactions[i])
  }
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
  transaction: TTransactionResponse[number],
): void {
  const createdAt = Date.now()
  const walletconflicts = JSON.stringify(transaction.walletconflicts)
  const vjoinsplit = JSON.stringify(transaction.vjoinsplit)
  const values = {
    $account: transaction.account,
    $address: transaction.address || null,
    $category: transaction.category,
    $amount: transaction.amount,
    $vout: transaction.vout,
    $confirmations: transaction.confirmations,
    $blockhash: transaction.blockhash,
    $blockindex: transaction.blockindex,
    $blocktime: transaction.blocktime,
    $expiryheight: transaction.expiryheight,
    $txid: transaction.txid,
    $walletconflicts: walletconflicts,
    $time: transaction.time,
    $timereceived: transaction.timereceived,
    $vjoinsplit: vjoinsplit,
    $size: transaction.size,
    $lastblock: transaction.lastblock || null,
    $createdAt: createdAt,
  }

  db.exec(insertQuery, values)
}

const countQuery = 'SELECT count(*) FROM listtransactions'

export const getListTransactionsCount = (db: Database): number => {
  const result = db.exec(countQuery)
  return (result[0].values[0]?.[0] || 0) as number
}

type TAddressesLastActivityTime = Record<TAddress, number>

export const getAddressesLastActivityTime = (
  db: Database,
): TAddressesLastActivityTime => {
  const result = db.exec(`
    SELECT address, max(time) FROM listtransactions
    WHERE address IS NOT NULL
    GROUP BY address
  `)
  return Object.fromEntries(result[0].values)
}

export const useAddressesLastActivityTime = (): UseQueryResult<TAddressesLastActivityTime> => {
  const db = useDb()
  return useQuery('transactions/addressesLastActivityTime', () =>
    getAddressesLastActivityTime(db),
  )
}
