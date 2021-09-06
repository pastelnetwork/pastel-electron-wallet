import { Database } from 'better-sqlite3'

export type TDbWalletInfo = {
  id: number
  walletversion: number
  balance: number
  unconfirmed_balance: number
  immature_balance: number
  txcount: number
  keypoololdest: number
  keypoolsize: number
  paytxfee: number
  seedfp: string
  createdAt: number
}

export const insertWalletInfo = (
  db: Database,
  values: Omit<TDbWalletInfo, 'id' | 'createdAt'>,
): void => {
  db.prepare(
    `INSERT INTO walletInfo(
    walletversion,
    balance,
    unconfirmed_balance,
    immature_balance,
    txcount,
    keypoololdest,
    keypoolsize,
    paytxfee,
    seedfp,
    createdAt
  ) VALUES (
    $walletversion,
    $balance,
    $unconfirmed_balance,
    $immature_balance,
    $txcount,
    $keypoololdest,
    $keypoolsize,
    $paytxfee,
    $seedfp,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
  })
}
