import { TResponse } from './response'

enum TTransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
  ALL = 'all',
}

type TBaseAddAm = {
  address: string
  amount: number
}

type TxDetail = {
  address: string
  amount: number
  memo?: string
}

type TTransferPayload = {
  from: string
  to: TxDetail[]
}

type TRpcParam = string | number | boolean | TxDetail[]

type TBaseTransaction = {
  // TODO: fix type, address may be undefined https://rpc-doc.pastel.network/listtransactions.html
  // but changing this field to be optional requires changes in other code and may break something
  address: string
  txid: string
  memo?: string
  amount: number
  index?: number
}

type TTransactionDetail = TBaseAddAm & {
  account: string
  category: string
}

type TTransaction = TBaseTransaction &
  TTransactionDetail & {
    account: string
    category: string
    vout: number
    confirmations: number
    blockhash: string
    blockindex: number
    blocktime: number
    expiryheight: number
    txid: string
    walletconflicts: string[]
    time: number
    timereceived: number
    vjoinsplit: TVJoinsplit[]
    size: number
    lastblock?: string | null
    fee?: number
    type?: string
    detailedTxns?: TDetailedTxns[]
    inputAddresses?: string[]
  }

type TVJoinsplit = {
  vpub_old: number
  vpub_new: number
  anchor: string
  nullifiers: string[]
  commitments: string[]
  onetimePubKey: string
  randomSeed: string
  macs: string[]
  proof: string
  ciphertexts: string[]
}

type TDetailedTxns = TBaseAddAm & {
  memo?: string | null
}

type TSentTxStore = TBaseAddAm & {
  type: string
  from: string
  txid: string
  datetime: number
  detailedTxns: TDetailedTxns
  memo: string
}

type TScriptSig = {
  asm: string
  hex: string
}

type TScriptPubkey = {
  asm: string
  hex: string
  regSigs: number
  type: string
  addresses: string[]
}

type TVin = {
  txid: string
  vout: number
  scriptSig: TScriptSig
  sequence: number
}

type TVout = {
  value: number
  n: number
  scriptPubkey: TScriptPubkey
}

type TTransactionRow = {
  date: string
  address: string
  type: TTransactionType
  status?: string
  id: string
  comments: string
  fee: number
  amount: number
}

type TTransactionInfoDetail = TBaseAddAm & {
  account: string
  category: string
  size: number
  vout: number
}

// getrawtransaction
type TRawTransaction = {
  hex: string
  txid: string
  overwintered: boolean
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: TVin[]
  vout: TVout[]
  vjoinsplit: TVJoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
  details: TTransactionDetail[]
}

// gettransaction
type TTransactionInfo = {
  amount: number
  blockhash: string
  blockindex: number
  blocktime: number
  confirmations: number
  details: TTransactionInfoDetail[]
  expiryheight: number
  hex: string
  time: number
  timereceived: number
  txid: string
  vjoinsplit: TVJoinsplit[]
  walletconflicts: string[]
}

type TTxout = {
  bestblock: string
  confirmations: number
  value: number
  scriptPubKey: TScriptPubkey
}

type TSinceBlockTransaction = {
  account: string
  address: string
  category: string
  status: string
  amount: number
  amountZat: number
  vout: number
  fee: number
  confirmations: number
  blockhash: number
  blockindex: number
  blocktime: number
  txid: string
  time: number
  timereceived: number
  comment: string
  to: string
}

type TTxoutResponse = TResponse<TTxout>
type TTransactionResponse = TTransaction[]
type TRawTransactionResponse = TResponse<TRawTransaction>
type TTransactionInfoResponse = TResponse<TTransactionInfo>

export { TTransactionType }

export type {
  TVin,
  TVout,
  TTxout,
  TxDetail,
  TRpcParam,
  TScriptSig,
  TBaseAddAm,
  TVJoinsplit,
  TTransaction,
  TSentTxStore,
  TDetailedTxns,
  TScriptPubkey,
  TTxoutResponse,
  TRawTransaction,
  TTransactionRow,
  TTransferPayload,
  TTransactionInfo,
  TBaseTransaction,
  TTransactionDetail,
  TTransactionResponse,
  TSinceBlockTransaction,
  TTransactionInfoDetail,
  TTransactionInfoResponse,
  TRawTransactionResponse,
}
