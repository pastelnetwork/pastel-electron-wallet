import { Database } from 'better-sqlite3'

export type TDbBlockSubsidy = {
  id: number
  miner: number
  masternode: number
  governance: number
  createdAt: number
}

export const insertBlockSubsidy = (
  db: Database,
  values: Omit<TDbBlockSubsidy, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO blockSubsidy(
    miner,
    masternode,
    governance,
    createdAt
  ) VALUES (
    $miner,
    $masternode,
    $governance,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
