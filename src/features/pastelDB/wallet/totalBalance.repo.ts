import { Database } from 'better-sqlite3'

export type TDbTotalBalance = {
  id: number
  transparent: string
  private: string
  total: string
  createdAt: number
}

export const insertTotalBalance = (
  db: Database,
  values: Omit<TDbTotalBalance, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO totalBalance(
    transparent,
    private,
    total,
    createdAt
  ) VALUES (
    $transparent,
    $private,
    $total,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
