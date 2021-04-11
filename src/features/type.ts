/* eslint-disable */
import { Database } from 'sql.js'

export interface IPastelDBState {
  pastelDB: Database
  isCreated: boolean
}

export interface PastelRPCResponse {
  id: string
  error: string
  result: any
}

export interface StatisticInfo {
  hashrate: string
  miner_distribution: string
  difficulty: string
}

export interface NetworkInfo {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: any
  relayfee: number
  localaddresses: any
  warnings: string
  create_timestamp: string
}

export interface NetTotals {
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
}

export interface MempoolInfo {
  size: number
  bytes: number
  usage: number
}

export interface MiningInfo {
  blocks: number
  currentblocksize: number
  currentblocktx: number
  difficulty: number
  errors: string
  genproclimit: number
  localsolps: number
  networksolps: number
  networkhashps: number
  pooledtx: number
  testnet: number
  chain: string
  generate: boolean
}

export interface BlockInfo {
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
}

export interface RawTransaction {
  hex: string
  txid: string
  overwintered: boolean
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: any
  vout: any
  vjoinsplit: any
  valueBalance: number
  vShieldedSpend: any
  vShieldedOutput: any
  bindingSig: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export interface TransactionInfo {
  hex: string
  txid: string
  overwintered: number
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: any
  vout: any
  vjoinsplit: any
  valueBalance: number
  vShieldedSpend: any
  vShieldedOutput: any
  bindingSig: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export interface TxoutsetInfo {
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
}

export interface ChainTips {
  height: number
  hash: string
  branchlen: number
  status: string
}
export interface BlockSubsidy {
  miner: number
  masternode: number
  governance: number
}
export interface WalletInfo {
  walletversion: number
  balance: number
  unconfirmed_balance: number
  immature_balance: number
  txcount: number
  keypoololdest: number
  keypoolsize: number
  paytxfee: number
  seedfp: string
}
export interface ReceivedByAddress {
  address: string
  account: string
  amount: number
  confirmations: number
  txids: any
  create_timestamp: string
}
export interface ListTransactions {
  account: string
  address: string
  category: string
  amount: number
  vout: number
  confirmations: number
  blockhash: number
  blockindex: number
  blocktime: number
  expiryheight: number
  txid: string
  walletconflicts: any
  time: number
  timereceived: number
  vjoinsplit: any
  size: number
  lastblock: string
}
export interface ListUnspent {
  txid: string
  vout: number
  generated: boolean
  address: string
  account: string
  scriptPubKey: string
  amount: number
  confirmations: number
  spendable: number
}
export interface TotalBalance {
  transparent: string
  private: string
  total: string
}
