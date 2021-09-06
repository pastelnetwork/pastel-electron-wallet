import { Database } from 'better-sqlite3'

export type TDbTxOutSetInfo = {
  id: number
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
  createdAt: number
}

export const insertTxOutSentInfo = (
  db: Database,
  values: Omit<TDbTxOutSetInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO txOutSetInfo(
    height,
    bestblock,
    transactions,
    txouts,
    bytes_serialized,
    hash_serialized,
    total_amount,
    createdAt
  ) VALUES (
    $height,
    $bestblock,
    $transactions,
    $txouts,
    $bytes_serialized,
    $hash_serialized,
    $total_amount,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
