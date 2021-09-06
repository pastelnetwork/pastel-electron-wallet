import { Database } from 'better-sqlite3'

export type TDbListAddress = {
  id: number
  address: string
  createdAt: number
}

export const insertListAddress = (
  db: Database,
  values: Omit<TDbListAddress, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO listAddresses(
    address,
    createdAt
  ) VALUES (
    $address,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
