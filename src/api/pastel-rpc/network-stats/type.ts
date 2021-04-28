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
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: TRawMempoolInfo[]
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

export type TScriptSig = {
  asm: string
  hex: string
}

export type TVin = {
  txid: string
  vout: number
  scriptSig: TScriptSig
  sequence: number
}

export type TScriptPubkey = {
  asm: string
  hex: string
  regSigs: number
  type: string
  addresses: string[]
}

export type TVout = {
  value: number
  n: number
  scriptPubkey: TScriptPubkey
}

export type TVjoinsplit = {
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

export type TRawTransaction = {
  hex: string
  txid: string
  overwintered: boolean
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: TVin[]
  vout: TVout[]
  vjoinsplit: TVjoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export type TTransactionInfo = {
  hex: string
  txid: string
  overwintered: number
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: TVin[]
  vout: TVout[]
  vjoinsplit: TVjoinsplit[]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

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

export type TListTransactions = {
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
  vjoinsplit: TVjoinsplit[]
  size: number
  lastblock: string
}

export type TListUnspent = {
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

export type TGetrawtransaction = {
  result: TRawTransaction
  error: TError
  id: string
}

export type TGettransaction = {
  result: TTransactionInfo
  error: TError
  id: string
}

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

export type Tlisttransactions = {
  result: TListTransactions[]
  error: TError
  id: string
}

export type Tlistunspent = {
  result: TListUnspent[]
  error: TError
  id: string
}

export type TGettotalbalance = {
  result: TTotalBalance
  error: TError
  id: string
}

export type Tlistaddresses = {
  result: string[]
  error: TError
  id: string
}

export type TError = {
  message: string
}
