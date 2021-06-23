import { IResponse } from './response'

enum TransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
  ALL = 'all',
}

type IBaseAddAm = {
  address: string
  amount: number
}

type IBaseTransaction = {
  address: string
  txid: string
  memo?: string
  amount: number
  index?: number
}

type ITTransactionDetail = IBaseAddAm & {
  account: string
  category: string
}

type ITransaction = IBaseTransaction &
  ITTransactionDetail & {
    account: string
    category: string
    vout: number
    confirmations: number
    blockhash: number
    blockindex: number
    blocktime: number
    expiryheight: number
    txid: string
    walletconflicts: string[]
    time: number
    timereceived: number
    vjoinsplit: ITVJoinsplit[]
    size: number
    lastblock: string
    fee?: number
    type?: string
    detailedTxns?: ITDetailedTxns[]
    inputAddresses?: string[]
  }

type ITVJoinsplit = {
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

type ITDetailedTxns = IBaseAddAm & {
  memo?: string | null
}

type ITSentTxStore = IBaseAddAm & {
  type: string
  from: string
  txid: string
  datetime: number
  detailedTxns: ITDetailedTxns
  memo: string
}

type ITScriptSig = {
  asm: string
  hex: string
}

type ITScriptPubkey = {
  asm: string
  hex: string
  regSigs: number
  type: string
  addresses: string[]
}

type ITVin = {
  txid: string
  vout: number
  scriptSig: ITScriptSig
  sequence: number
}

type ITVout = {
  value: number
  n: number
  scriptPubkey: ITScriptPubkey
}

type ITransactionRow = {
  date: string
  address: string
  type: TransactionType
  status?: string
  id: string
  comments: string
  fee: number
  amount: number
}

type ITTransactionInfoDetails = IBaseAddAm & {
  account: string
  category: string
  size: number
  vout: number
}

// listtransactions
type ITTransactionResult = {
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
  walletconflicts: string[]
  time: number
  timereceived: number
  vjoinsplit: ITVJoinsplit[]
  size: number
  lastblock: string
  fee?: number
  type?: string
  detailedTxns?: ITDetailedTxns[]
  inputAddresses?: string[]
  index?: number
}

// getrawtransaction
type ITRawTransactionResult = {
  hex: string
  txid: string
  overwintered: boolean
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: ITVin[]
  vout: ITVout[]
  vjoinsplit: ITVJoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
  details: ITTransactionDetail[]
}

// gettransaction
type ITTransactionInfoResult = {
  amount: number
  blockhash: string
  blockindex: number
  blocktime: number
  confirmations: number
  details: ITTransactionInfoDetails[]
  expiryheight: number
  hex: string
  time: number
  timereceived: number
  txid: string
  vjoinsplit: ITVJoinsplit[]
  walletconflicts: string[]
}

type ITTransactionResponse = IResponse<ITTransactionResult[]>
type ITRawTransactionResponse = IResponse<ITRawTransactionResult>
type ITTransactionInfoResponse = IResponse<ITTransactionInfoResult>

export { TransactionType }

export type {
  IBaseAddAm,
  ITransactionRow,
  IBaseTransaction,
  ITDetailedTxns,
  ITransaction,
  ITRawTransactionResponse,
  ITRawTransactionResult,
  ITScriptPubkey,
  ITScriptSig,
  ITSentTxStore,
  ITTransactionDetail,
  ITTransactionInfoDetails,
  ITTransactionInfoResponse,
  ITTransactionInfoResult,
  ITTransactionResponse,
  ITTransactionResult,
  ITVin,
  ITVJoinsplit,
  ITVout,
}
