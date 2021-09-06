import { Database } from 'better-sqlite3'

export type TDbRawMemPoolInfo = {
  id: number
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: string
  createdAt: number
}

export const insertRawMemPoolInfo = (
  db: Database,
  values: Omit<TDbRawMemPoolInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO rawMempoolInfo(
    transactionid,
    size,
    fee,
    time,
    height,
    startingpriority,
    currentpriority,
    depends,
    createdAt
  ) VALUES (
    $transactionid,
    $size,
    $fee,
    $time,
    $height,
    $startingpriority,
    $currentpriority,
    $depends,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
