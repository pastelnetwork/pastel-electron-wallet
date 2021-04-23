export interface INetworks {
  name: string
  limited: boolean
  reachable: boolean
  proxy: string
}

export interface ILocaladdresses {
  address: string
  port: number
  score: number
}

export interface INetworkInfo {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: INetworks[]
  relayfee: number
  localaddresses: ILocaladdresses[]
  warnings: string
  create_timestamp: string
}

export interface INetTotals {
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
}

export interface IMempoolInfo {
  size: number
  bytes: number
  usage: number
}

export interface IRawMempoolInfo {
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: IRawMempoolInfo[]
}

export interface IMiningInfo {
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

export interface IBlockInfo {
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

export interface IScriptSig {
  asm: string
  hex: string
}

export interface IVin {
  txid: string
  vout: number
  scriptSig: IScriptSig
  sequence: number
}

export interface IScriptPubkey {
  asm: string
  hex: string
  regSigs: number
  type: string
  addresses: string[]
}

export interface IVout {
  value: number
  n: number
  scriptPubkey: IScriptPubkey
}

export interface IVjoinsplit {
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

export interface IRawTransaction {
  hex: string
  txid: string
  overwintered: boolean
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: IVin[]
  vout: IVout[]
  vjoinsplit: IVjoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export interface ITransactionInfo {
  hex: string
  txid: string
  overwintered: number
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: IVin[]
  vout: IVout[]
  vjoinsplit: IVjoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export interface ITxoutsetInfo {
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
}

export interface IChainTips {
  height: number
  hash: string
  branchlen: number
  status: string
}

export interface IBlockSubsidy {
  miner: number
  masternode: number
  governance: number
}

export interface IWalletInfo {
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

export interface IListTransactions {
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
  vjoinsplit: IVjoinsplit[]
  size: number
  lastblock: string
}

export interface IListUnspent {
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

export interface ITotalBalance {
  transparent: string
  private: string
  total: string
}

export interface IValidateaddress {
  isvalid: boolean
  address: string
  scriptPubkey: string
  ismine: boolean
  isscript: boolean
  pubkey: string
  iscompressed: boolean
  account: string
}

export interface ITxout {
  bestblock: string
  confirmations: number
  value: number
  scriptPubKey: IScriptPubkey
}

export interface IAddressesBalance {
  addresses: string[]
}

export interface IAddressDelta {
  satoshis: number
  txid: string
  index: number
  height: number
  address: string
}

export interface IAddressMempool {
  address: string
  txid: string
  index: number
  satoshis: number
  timestamp: number
  prevtxid: string
  prevout: string
}

export interface IUtxo {
  address: string
  txid: string
  height: number
  outputIndex: number
  script: string
}

export interface IAddressUtxo {
  utxos: IUtxo[]
  hash: string
  height: number
}

export type TGetnetworkhashps = {
  result: number
  error: IError
  id: string
}

export type TGetdifficulty = {
  result: number
  error: IError
  id: string
}

export type TGetNetworkinfo = {
  result: INetworkInfo
  error: IError
  id: string
}

export type TGetNetTotals = {
  result: INetTotals
  error: IError
  id: string
}

export type TGetmempoolinfo = {
  result: IMempoolInfo
  error: IError
  id: string
}

export type TGetmininginfo = {
  result: IMiningInfo
  error: IError
  id: string
}

export type Tgetmininginfo = {
  result: IMiningInfo
  error: IError
  id: string
}

export type TGetrawmempool = {
  result: IRawMempoolInfo
  error: IError
  id: string
}

export type TGetblockhash = {
  result: string
  error: IError
  id: string
}

export type TGetblock = {
  result: IBlockInfo
  error: IError
  id: string
}

export type TValidateaddress = {
  result: IValidateaddress
  error: IError
  id: string
}

export type TGetrawtransaction = {
  result: IRawTransaction
  error: IError
  id: string
}

export type TGettransaction = {
  result: ITransactionInfo
  error: IError
  id: string
}

export type TGettxout = {
  result: ITxout
  error: IError
  id: string
}

export type TGettxoutsetinfo = {
  result: ITxoutsetInfo
  error: IError
  id: string
}

export type TGetaddressbalance = {
  result: IAddressesBalance
  error: IError
  id: string
}

export type TGetaddressdeltas = {
  result: IAddressDelta[]
  error: IError
  id: string
}

export type TGetaddressmempool = {
  result: IAddressMempool[]
  error: IError
  id: string
}

export type TGetaddresstxids = {
  result: string[]
  error: IError
  id: string
}

export type TGetaddressutxos = {
  result: IAddressUtxo
  error: IError
  id: string
}

export type TGetbestblockhash = {
  result: string
  error: IError
  id: string
}

export type TGetblockcount = {
  result: number
  error: IError
  id: string
}

export type TGetchaintips = {
  result: IChainTips[]
  error: IError
  id: string
}

export type TGetblocksubsidy = {
  result: IBlockSubsidy
  error: IError
  id: string
}

export type TGetwalletinfo = {
  result: IWalletInfo
  error: IError
  id: string
}

export type Tlisttransactions = {
  result: IListTransactions[]
  error: IError
  id: string
}

export type Tlistunspent = {
  result: IListUnspent[]
  error: IError
  id: string
}

export type TGettotalbalance = {
  result: ITotalBalance
  error: IError
  id: string
}

export type Tlistaddresses = {
  result: string[]
  error: IError
  id: string
}

export interface IError {
  message: string
}
