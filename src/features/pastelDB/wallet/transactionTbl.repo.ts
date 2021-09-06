import { Database } from 'better-sqlite3'

export type TDbTransactionTbl = {
  id: number
  amount: number
  blockhash: string
  blockindex: number
  blocktime: number
  confirmations: number
  details: string
  expiryheight: number
  hex: string
  time: number
  timereceived: number
  txid: string
  vjoinsplit: string
  walletconflicts: string
  createdAt: number
}

export const insertTransactionTbl = (
  db: Database,
  values: Omit<TDbTransactionTbl, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO transactionTbl(
    amount,
    blockhash,
    blockindex,
    blocktime,
    confirmations,
    details,
    expiryheight,
    hex,
    time,
    timereceived,
    txid,
    vjoinsplit,
    walletconflicts,
    createdAt
  ) VALUES (
    $amount,
    $blockhash,
    $blockindex,
    $blocktime,
    $confirmations,
    $details,
    $expiryheight,
    $hex,
    $time,
    $timereceived,
    $txid,
    $vjoinsplit,
    $walletconflicts,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
