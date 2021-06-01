import {
  ITDetailedTxns,
  ITSentTxStore,
  ITTransactionResponse,
  ITTransactionResult,
  ITRawTransactionResponse,
  ITRawTransactionResult,
  ITVJoinsplit,
  ITTransactionDetail,
  ITScriptSig,
  ITScriptPubkey,
  ITVout,
  ITVin,
  ITTransactionInfoResult,
  ITTransactionInfoDetails,
  IListUnspentResult,
  IListAddressesResponse,
  IListUnspentResponse,
  IResponse,
  IResonseError,
  ITZListReceivedByAddressResult,
  ITZListReceivedByAddressResponse,
  ITTransactionInfoResponse,
} from '../../types/rpc'

export type TNetworks = {
  name: string
  limited: boolean
  reachable: boolean
  proxy: string
}

export type TLocaladdresses = {
  address: string
  port: number
  score: number
}

export type TNetworkInfo = {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: TNetworks[]
  relayfee: number
  localaddresses: TLocaladdresses[]
  warnings: string
  create_timestamp: string
}

export type TNetTotals = {
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
}

export type TMempoolInfo = {
  size: number
  bytes: number
  usage: number
}

export type TRawMempool = {
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: TRawMempoolInfo[]
}

export type TRawMempoolInfo = {
  [index: string]: {
    transactionid: string
    size: number
    fee: number
    time: number
    height: number
    startingpriority: number
    currentpriority: number
    depends: TRawMempoolInfo[]
  }
}

export type TMiningInfo = {
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

export type TBlockInfo = {
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

export type TScriptSig = ITScriptSig

export type TVin = ITVin

export type TScriptPubkey = ITScriptPubkey

export type TVout = ITVout

export type TVjoinsplit = ITVJoinsplit

export type TTransactionInfo = ITTransactionInfoResult

export type TTransactionInfoDetails = ITTransactionInfoDetails

export type TShieldedOutput = {
  cv: string
  anchor: string
  nullifier: string
}

export type TShieldedSpendInfo = {
  cmu: string
  cv: string
  encCiphertext: string
  ephemeralKey: string
  outCiphertext: string
  proof: string
}

export type TDetails = ITTransactionDetail

export type TRawTransaction = ITRawTransactionResult

export type TTxoutsetInfo = {
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
}

export type TChainTips = {
  height: number
  hash: string
  branchlen: number
  status: string
}

export type TBlockSubsidy = {
  miner: number
  masternode: number
  governance: number
}

export type TWalletInfo = {
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

export type TDetailedTxns = ITDetailedTxns

export type TListTransactions = ITTransactionResult

export type TListUnspent = IListUnspentResult

export type TTotalBalance = {
  transparent: string
  private: string
  total: string
}

export type TValidateaddress = {
  isvalid: boolean
  address: string
  scriptPubkey: string
  ismine: boolean
  isscript: boolean
  pubkey: string
  iscompressed: boolean
  account: string
}

export type TTxout = {
  bestblock: string
  confirmations: number
  value: number
  scriptPubKey: TScriptPubkey
}

export type TAddressesBalance = {
  addresses: string[]
}

export type TAddressDelta = {
  satoshis: number
  txid: string
  index: number
  height: number
  address: string
}

export type TAddressMempool = {
  address: string
  txid: string
  index: number
  satoshis: number
  timestamp: number
  prevtxid: string
  prevout: string
}

export type TUtxo = {
  address: string
  txid: string
  height: number
  outputIndex: number
  script: string
}

export type TAddressUtxo = {
  utxos: TUtxo[]
  hash: string
  height: number
}

export type TGetnetworkhashps = {
  result: number
  error: TError
  id: string
}

export type TGetdifficulty = {
  result: number
  error: TError
  id: string
}

export type TGetNetworkinfo = {
  result: TNetworkInfo
  error: TError
  id: string
}

export type TGetNetTotals = {
  result: TNetTotals
  error: TError
  id: string
}

export type TGetmempoolinfo = {
  result: TMempoolInfo
  error: TError
  id: string
}

export type TGetmininginfo = {
  result: TMiningInfo
  error: TError
  id: string
}

export type Tgetmininginfo = {
  result: TMiningInfo
  error: TError
  id: string
}

export type TGetrawmempool = {
  result: TRawMempoolInfo
  error: TError
  id: string
}

export type TGetblockhash = {
  result: string
  error: TError
  id: string
}

export type TGetblock = {
  result: TBlockInfo
  error: TError
  id: string
}

export type TValidateaddresses = {
  result: TValidateaddress
  error: TError
  id: string
}

export type TGetrawtransaction = ITRawTransactionResponse

export type TGettransaction = ITTransactionInfoResponse

export type TGettxout = {
  result: TTxout
  error: TError
  id: string
}

export type TGettxoutsetinfo = {
  result: TTxoutsetInfo
  error: TError
  id: string
}

export type TGetaddressbalance = {
  result: TAddressesBalance
  error: TError
  id: string
}

export type TGetaddressdeltas = {
  result: TAddressDelta[]
  error: TError
  id: string
}

export type TGetaddressmempool = {
  result: TAddressMempool[]
  error: TError
  id: string
}

export type TGetaddresstxids = {
  result: string[]
  error: TError
  id: string
}

export type TGetaddressutxos = {
  result: TAddressUtxo
  error: TError
  id: string
}

export type TGetbestblockhash = {
  result: string
  error: TError
  id: string
}

export type TGetblockcount = {
  result: number
  error: TError
  id: string
}

export type TGetchaintips = {
  result: TChainTips[]
  error: TError
  id: string
}

export type TGetblocksubsidy = {
  result: TBlockSubsidy
  error: TError
  id: string
}

export type TGetwalletinfo = {
  result: TWalletInfo
  error: TError
  id: string
}

export type TSinceblock = {
  transactions: TSinceblockTransaction[]
  lastblock: string
}

export type TSinceblockTransaction = {
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

export type TListsinceblock = {
  result: TSinceblock
  error: TError
  id: string
}

export type Tlisttransactions = ITTransactionResponse

export type Tlistunspent = IListUnspentResponse

export type TGettotalbalance = IResponse<TTotalBalance>

export type Tlistaddresses = IListAddressesResponse

export type TError = IResonseError

export type TZListReceivedByAddress = ITZListReceivedByAddressResult

export type TListReceivedByAddress = ITZListReceivedByAddressResponse

export type TSentTxStore = ITSentTxStore

export type TGetBlockChainInfo = IResponse<TBlockChainInfo>

export type TBlockChainInfo = {
  bestblockhash: string
  blocks: number
  chain: string
  chainwork: string
  commitments: number
  consensus: Tconsensus
  difficulty: number
  headers: number
  pruned: boolean
  softforks: Tsoftfork[]
  upgrades: TUpgrades
  valuePools: TValuePool[]
  verificationprogress: number
}

export type TValuePool = {
  chainValue?: number
  chainValueZat?: number
  id: string
  monitored: boolean
}

export type TUpgrades = {
  [index: string]: {
    activationheight: number
    info: string
    name: string
    status: string
  }
}

export type Tsoftfork = {
  enforce: Tenforce
  id: string
  reject: Tenforce
  version: number
}

export type Tenforce = {
  found: number
  required: number
  status: boolean
  window: number
}

export type Tconsensus = {
  chaintip: string
  nextblock: string
}

export type TValidateFields = {
  bestBlockHash?: string
  hash?: string
  price?: number
  time?: number
  transactionid?: string
}
