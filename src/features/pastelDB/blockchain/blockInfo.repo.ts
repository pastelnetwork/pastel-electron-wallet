import { Database } from 'better-sqlite3'

export type TDbBlockInfo = {
  id: number
  hash: string
  confirmations: number
  size: number
  height: number
  version: number
  merkleroot: string
  finalsaplingroot: string
  tx: string
  time: number
  nonce: string
  solution: string
  bits: string
  difficulty: number
  chainwork: string
  anchor: string
  valuePools: string
  previousblockhash: string
  nextblockhash: string
  createdAt: number
}

export const insertBlockInfo = (
  db: Database,
  values: Omit<TDbBlockInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO blockInfo(
    hash,
    confirmations,
    size,
    height,
    version,
    merkleroot,
    finalsaplingroot,
    tx,
    time,
    nonce,
    solution,
    bits,
    difficulty,
    chainwork,
    anchor,
    valuePools,
    previousblockhash,
    nextblockhash,
    createdAt
  ) VALUES (
    $hash,
    $confirmations,
    $size,
    $height,
    $version,
    $merkleroot,
    $finalsaplingroot,
    $tx,
    $time,
    $nonce,
    $solution,
    $bits,
    $difficulty,
    $chainwork,
    $anchor,
    $valuePools,
    $previousblockhash,
    $nextblockhash,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
