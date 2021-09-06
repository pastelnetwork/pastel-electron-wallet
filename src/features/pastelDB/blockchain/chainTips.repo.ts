import { Database } from 'better-sqlite3'

export type TDbChainTips = {
  id: number
  height: number
  hash: string
  branchlen: number
  status: string
  createdAt: number
}

export const insertChainTips = (
  db: Database,
  values: Omit<TDbChainTips, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO chainTips(
    height,
    hash,
    branchlen,
    status,
    createdAt
  ) VALUES (
    $height,
    $hash,
    $branchlen,
    $status,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
