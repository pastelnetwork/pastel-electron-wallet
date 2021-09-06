import { Database } from 'better-sqlite3'

export type TDbListUnspent = {
  id: number
  txid: string
  vout: number
  generated: 0 | 1
  address: string
  account: string
  scriptPubKey: string
  amount: number
  confirmations: number
  spendable: number
  createdAt: number
}

export const insertListUnspent = (
  db: Database,
  values: Omit<TDbListUnspent, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO listUnspent(
    txid,
    vout,
    generated,
    address,
    account,
    scriptPubKey,
    amount,
    confirmations,
    spendable,
    createdAt
  ) VALUES (
    $txid,
    $vout,
    $generated,
    $address,
    $account,
    $scriptPubKey,
    $amount,
    $confirmations,
    $spendable,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
