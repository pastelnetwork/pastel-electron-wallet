import { Database } from 'better-sqlite3'

export type TDbMemPoolInfo = {
  id: number
  size: number
  bytes: number
  usage: number
  createdAt: number
}

export const insertMemPoolInfo = (
  db: Database,
  values: Omit<TDbMemPoolInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO memPoolInfo(
    size,
    bytes,
    usage,
    createdAt
  ) VALUES (
    $size,
    $bytes,
    $usage,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
