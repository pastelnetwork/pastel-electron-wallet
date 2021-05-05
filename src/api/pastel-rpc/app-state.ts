import { TDetailedTxns, TVjoinsplit } from './network-stats/type'

export class TxDetail {
  address!: string
  amount!: number
  memo?: string | null
}

export class Transaction {
  account!: string
  address!: string
  category!: string
  amount!: number
  vout!: number
  confirmations!: number
  blockhash!: number
  blockindex!: number
  blocktime!: number
  expiryheight!: number
  txid!: string
  walletconflicts!: string[]
  time!: number
  timereceived!: number
  vjoinsplit!: TVjoinsplit[]
  size!: number
  lastblock!: string
  fee?: number
  type?: string
  detailedTxns?: TDetailedTxns[]
  inputAddresses?: string[]
}

export class RPCConfig {
  username = ''
  password = ''
  url = ''
}
