import { Database } from 'better-sqlite3'

export type TDbPriceInfo = {
  id: number
  priceUsd: number
  createdAt: number
}

export const insertPriceInfo = (
  db: Database,
  values: Omit<TDbPriceInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO priceInfo(
    priceUsd,
    createdAt
  ) VALUES (
    $priceUsd,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
