import { TResponse } from './response'

export type TAddress = string
export type TBalance = number

type TAddressBalance = {
  address: string | number
  balance: number
}

type TAddressList = {
  txid: string
  address: string
  amount: number
  type: 'shielded' | 'transparent' | 'balance'
}

type TAddressBook = {
  label: string
  address: string
}

type TAddressRow = {
  id: string
  address: string
  time?: number
  qrCode?: string
  viewKey: string
  privateKey: string
  amount: number
  psl: number
  type: 'shielded' | 'transparent' | 'balance' | 'promoCode'
  addressNick?: string
}

// z_gettotalbalance
type TTotalBalance = {
  transparent: number
  private: number
  total: number
}

// z_listunspent
type TZListUnspent = {
  txid: string
  jsindex: number
  jsoutindex: number
  outindex: number
  confirmations: number
  spendable: boolean
  address: string
  amount: number
  memo: number
  change: boolean
}

// listunspent
type TListUnspent = {
  txid: string
  vout: number
  generated: boolean
  address: string
  account: string
  scriptPubKey: string
  amount: number
  confirmations: number
  redeemScript: number
  spendable: number
}

// z_listreceivedbyaddress
type TZListReceivedByAddress = {
  txid: string
  amount: number
  amountZat: number
  memo: string
  confirmations: number
  blockheight: number
  blockindex: number
  blocktime: number
  jsindex: number
  jsoutindex: number
  outindex: number
  change: boolean
}

type TShieldedOutput = {
  cv: string
  anchor: string
  nullifier: string
}

type TShieldedSpendInfo = {
  cmu: string
  cv: string
  encCiphertext: string
  ephemeralKey: string
  outCiphertext: string
  proof: string
}

type TWalletInfo = {
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

type TValidateAddress = {
  isvalid: boolean
  address: string
  scriptPubkey: string
  ismine: boolean
  isscript: boolean
  pubkey: string
  iscompressed: boolean
  account: string
}

type TAddressesBalance = {
  addresses: string[]
}

type TAddressDelta = {
  satoshis: number
  txid: string
  index: number
  height: number
  address: string
}

type TAddressUtxo = {
  utxos: TUtxo[]
  hash: string
  height: number
}

type TUtxo = {
  address: string
  txid: string
  height: number
  outputIndex: number
  script: string
}

type TAddressMempool = {
  address: string
  txid: string
  index: number
  satoshis: number
  timestamp: number
  prevtxid: string
  prevout: string
}

type TImportKey = {
  type: string
  address: string
}

type TListAddressAmounts = {
  address: string
  amount: number
}

type TAddressTxIdResponse = TResponse<string[]>
type TWalletInfoResponse = TResponse<TWalletInfo>
type TListAddressesResponse = string[]
type TAddressTxosResponse = TResponse<TAddressUtxo>
type TListUnspentResponse = TListUnspent[]
type TTotalBalanceResponse = TTotalBalance
type TAddressDeltaResponse = TResponse<TAddressDelta[]>
type TAddressBalanceResponse = TResponse<TAddressesBalance>
type TAddressMempoolResponse = TResponse<TAddressMempool[]>
type TValidateAddressesResponse = TResponse<TValidateAddress>
type TZListUnspentResponse = TZListUnspent[]
type TZListReceivedByAddressResponse = TResponse<TZListReceivedByAddress[]>
type TCreateAddressResponse = TResponse<string>
export type TAddressBalancesResponse = Record<TAddress, TBalance>
type TPrivKeyResponse = TResponse<string>
type TZPrivKeyResponse = TResponse<TImportKey>

export type {
  TUtxo,
  TWalletInfo,
  TAddressRow,
  TAddressUtxo,
  TAddressList,
  TAddressBook,
  TListUnspent,
  TAddressDelta,
  TTotalBalance,
  TAddressMempool,
  TShieldedOutput,
  TAddressBalance,
  TValidateAddress,
  TAddressesBalance,
  TShieldedSpendInfo,
  TWalletInfoResponse,
  TZListUnspent,
  TAddressTxIdResponse,
  TListUnspentResponse,
  TAddressTxosResponse,
  TAddressDeltaResponse,
  TZListUnspentResponse,
  TTotalBalanceResponse,
  TListAddressesResponse,
  TAddressMempoolResponse,
  TZListReceivedByAddress,
  TAddressBalanceResponse,
  TValidateAddressesResponse,
  TZListReceivedByAddressResponse,
  TCreateAddressResponse,
  TPrivKeyResponse,
  TZPrivKeyResponse,
  TListAddressAmounts,
}
