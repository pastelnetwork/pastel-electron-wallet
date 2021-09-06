import { Database } from 'better-sqlite3'

export type TDbBlockChainInfo = {
  id: number
  bestblockhash: string
  blocks: number
  chain: string
  chainwork: string
  commitments: number
  consensus: string
  difficulty: number
  headers: number
  pruned: 0 | 1
  softforks: string
  upgrades: string
  valuePools: string
  verificationprogress: number
  createdAt: number
}

export const insertBlockChainInfo = (
  db: Database,
  values: Omit<TDbBlockChainInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO blockchainInfo(
    bestblockhash,
    blocks,
    chain,
    chainwork,
    commitments,
    consensus,
    difficulty,
    headers,
    pruned,
    softforks,
    upgrades,
    valuePools,
    verificationprogress,
    createdAt
  ) VALUES (
    $bestblockhash,
    $blocks,
    $chain,
    $chainwork,
    $commitments,
    $consensus,
    $difficulty,
    $headers,
    $pruned,
    $softforks,
    $upgrades,
    $valuePools,
    $verificationprogress,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
