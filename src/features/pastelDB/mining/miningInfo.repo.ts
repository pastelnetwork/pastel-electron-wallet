import { Database } from 'better-sqlite3'

export type TDbMiningInfo = {
  id: number
  blocks: number
  currentblocksize: number
  currentblocktx: number
  difficulty: number
  errors: string
  genproclimit: number
  localsolps: number
  networksolps: number
  networkhashps: number
  pooledtx?: number | null
  testnet: number
  chain: string
  generate: 0 | 1
  createdAt: number
}

export const insertMiningInfo = (
  db: Database,
  values: Omit<TDbMiningInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO miningInfo(
    blocks,
    currentblocksize,
    currentblocktx,
    difficulty,
    errors,
    genproclimit,
    localsolps,
    networksolps,
    networkhashps,
    pooledtx,
    testnet,
    chain,
    generate,
    createdAt
  ) VALUES (
    $blocks,
    $currentblocksize,
    $currentblocktx,
    $difficulty,
    $errors,
    $genproclimit,
    $localsolps,
    $networksolps,
    $networkhashps,
    $pooledtx,
    $testnet,
    $chain,
    $generate,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
    pooledtx: values.pooledtx ?? null,
  })
}
