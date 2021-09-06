import { Database } from 'better-sqlite3'

export type TDbNetTotals = {
  id: number
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
  createdAt: number
}

export const insertNetTotals = (
  db: Database,
  values: Omit<TDbNetTotals, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO netTotals(
    totalbytesrecv,
    totalbytessent,
    timemillis,
    createdAt
  ) VALUES (
    $totalbytesrecv,
    $totalbytessent,
    $timemillis,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
