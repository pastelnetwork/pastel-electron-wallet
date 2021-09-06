import { Database } from 'better-sqlite3'

export type TDbRawTransaction = {
  id: number
  hex: string
  txid: string
  overwintered: 0 | 1
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: string
  vout: string
  vjoinsplit: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
  createdAt: number
}

export const insertRawTransaction = (
  db: Database,
  values: Omit<TDbRawTransaction, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO rawTransaction(
    hex,
    txid,
    overwintered,
    version,
    versiongroupid,
    locktime,
    expiryheight,
    vin,
    vout,
    vjoinsplit,
    blockhash,
    confirmations,
    time,
    blocktime,
    createdAt
  ) VALUES (
    $hex,
    $txid,
    $overwintered,
    $version,
    $versiongroupid,
    $locktime,
    $expiryheight,
    $vin,
    $vout,
    $vjoinsplit,
    $blockhash,
    $confirmations,
    $time,
    $blocktime,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
