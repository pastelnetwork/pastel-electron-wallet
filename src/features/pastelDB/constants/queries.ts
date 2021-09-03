export type TDbStatisticInfo = {
  id: number
  solutions: number
  difficulty: number
  createdAt: number
}

export const createStatisticinfo = `CREATE TABLE IF NOT EXISTS statisticinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  solutions int,
  difficulty float,
  createdAt int
)`

export type TDbNetworkInfo = {
  id: number
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: string
  relayfee: number
  localaddresses: string
  warnings: string
  createdAt: number
}

export const createNetworkinfo = `CREATE TABLE IF NOT EXISTS networkinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version int,
  subversion VARCHAR(255),
  protocolversion int,
  localservices VARCHAR(255),
  timeoffset int,
  connections int,
  networks text,
  relayfee float,
  localaddresses text,
  warnings VARCHAR(255),
  createdAt int
)`

export type TDbNetTotals = {
  id: number
  totalbytesrecv: number
  totalbytessent: number
  timemillis: number
  createdAt: number
}

export const createNettotals = `CREATE TABLE IF NOT EXISTS nettotals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  totalbytesrecv int,
  totalbytessent int,
  timemillis int,
  createdAt int
)`

export type TDbMemPoolInfo = {
  id: number
  size: number
  bytes: number
  usage: number
  createdAt: number
}

export const createMempoolinfo = `CREATE TABLE IF NOT EXISTS mempoolinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  size int,
  bytes int,
  usage int,
  createdAt int
)`

export type TDbRawMemPoolInfo = {
  id: number
  transactionid: string
  size: number
  fee: number
  time: number
  height: number
  startingpriority: number
  currentpriority: number
  depends: string
  createdAt: number
}

export const createRawmempoolinfo = `CREATE TABLE IF NOT EXISTS rawmempoolinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transactionid int NOT NULL,
  size int,
  fee int,
  time int,
  height int,
  startingpriority int,
  currentpriority int,
  depends text,
  createdAt int
)`

export type TDbMiningInfo = {
  id: number
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
  createdAt: number
}

export const createMininginfo = `CREATE TABLE IF NOT EXISTS mininginfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blocks int,
  currentblocksize int,
  currentblocktx int,
  difficulty float,
  errors text,
  genproclimit int,
  localsolps int,
  networksolps int,
  networkhashps int,
  pooledtx int,
  testnet int,
  chain text,
  createdAt int
)`

export type TDbBlockChainInfo = {
  id: number
  bestblockhash: string
  blocks: number
  chain: string
  chainwork: string
  commitments: number
  consensus: string
  difficulty: number
  headers: number
  pruned: 0 | 1
  softforks: string
  upgrades: string
  valuePools: string
  verificationprogress: number
  createdAt: number
}

export const createBlockChainInfo = `CREATE TABLE IF NOT EXISTS blockchaininfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bestblockhash VARCHAR(255),
  blocks int,
  chain VARCHAR(255),
  chainwork VARCHAR(255),
  commitments int,
  consensus text,
  difficulty float,
  headers int,
  pruned boolean,
  softforks text,
  upgrades text,
  valuePools text,
  verificationprogress int,
  createdAt int
)`

export type TDbBlockInfo = {
  id: number
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
  createdAt: number
}

export const createBlock = `CREATE TABLE IF NOT EXISTS blockinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hash VARCHAR(255),
  confirmations int,
  size int,
  height int,
  version int,
  merkleroot VARCHAR(255),
  finalsaplingroot VARCHAR(255),
  tx text,
  time int,
  nonce VARCHAR(255),
  solution VARCHAR(255),
  bits VARCHAR(255),
  difficulty float,
  chainwork VARCHAR(255),
  anchor VARCHAR(255),
  valuePools text,
  previousblockhash VARCHAR(255),
  nextblockhash VARCHAR(255),
  createdAt int
)`

export type TDbRawTransaction = {
  id: number
  hex: string
  txid: string
  overwintered: 0 | 1
  version: number
  versiongroupid: string
  locktime: number
  expiryheight: number
  vin: string
  vout: string
  vjoinsplit: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
  createdAt: number
}

export const createRawtransaction = `CREATE TABLE IF NOT EXISTS rawtransaction (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hex VARCHAR(255),
  txid VARCHAR(255),
  overwintered boolean,
  version int,
  versiongroupid VARCHAR(255),
  locktime int,
  expiryheight int,
  vin text,
  vout text,
  vjoinsplit text,
  blockhash VARCHAR(255),
  confirmations int,
  time int,
  blocktime int,
  createdAt int
)`

export type TDbTransactionTbl = {
  id: number
  amount: number
  blockhash: string
  blockindex: number
  blocktime: number
  confirmations: number
  details: string
  expiryheight: number
  hex: string
  time: number
  timereceived: number
  txid: string
  vjoinsplit: string
  walletconflicts: string
  createdAt: number
}

export const createTransaction = `CREATE TABLE IF NOT EXISTS transaction_tbl (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount int,
  blockhash VARCHAR(255),
  blockindex int,
  blocktime int,
  confirmations int,
  details text,
  expiryheight int,
  hex VARCHAR(255),
  time int,
  timereceived int,
  txid VARCHAR(255),
  vjoinsplit text,
  walletconflicts text,
  createdAt int
)`

export type TDbTxOutSetInfo = {
  id: number
  height: number
  bestblock: string
  transactions: number
  txouts: number
  bytes_serialized: number
  hash_serialized: string
  total_amount: number
  createdAt: number
}

export const createTxoutsetinfo = `CREATE TABLE IF NOT EXISTS txoutsetinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  height int,
  bestblock VARCHAR(255),
  transactions int,
  txouts int,
  bytes_serialized int,
  hash_serialized VARCHAR(255),
  total_amount float,
  createdAt int
)`

export type TDbChainTips = {
  id: number
  height: number
  hash: string
  branchlen: number
  status: string
  createdAt: number
}

export const createChaintips = `CREATE TABLE IF NOT EXISTS chaintips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  height int,
  hash VARCHAR(255),
  branchlen int,
  status VARCHAR(255),
  createdAt int
)`

export type TDbBlockSubsidy = {
  id: number
  miner: number
  masternode: number
  governance: number
  createdAt: number
}

export const createBlocksubsidy = `CREATE TABLE IF NOT EXISTS blocksubsidy (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  miner int,
  masternode int,
  governance int,
  createdAt int
)`

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

export const createWalletinfo = `CREATE TABLE IF NOT EXISTS walletinfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  walletversion int,
  balance int,
  unconfirmed_balance int,
  immature_balance int,
  txcount int,
  keypoololdest int,
  keypoolsize int,
  paytxfee int,
  seedfp VARCHAR(255),
  createdAt int
)`

export type TDbListReceivedByAddress = {
  id: number
  address: string
  account: string
  amount: number
  confirmations: number
  txids: string
  createdAt: number
}

export const createListreceivedbyaddress = `CREATE TABLE IF NOT EXISTS listreceivedbyaddress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address VARCHAR(255),
  account VARCHAR(255),
  amount int,
  confirmations int,
  txids text,
  createdAt int
)`

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

export const createListunspent = `CREATE TABLE IF NOT EXISTS listunspent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  txid VARCHAR(255),
  vout int,
  generated boolean,
  address VARCHAR(255),
  account VARCHAR(255),
  scriptPubKey VARCHAR(255),
  amount int,
  confirmations int,
  spendable int,
  createdAt int
)`

export type TDbTotalBalance = {
  id: number
  transparent: string
  private: string
  total: string
  createdAt: number
}

export const createTotalbalance = `CREATE TABLE IF NOT EXISTS totalbalance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transparent VARCHAR(255),
  private VARCHAR(255),
  total VARCHAR(255),
  createdAt int
)`

export type TDbListAddress = {
  id: number
  address: string
  createdAt: number
}

export const createListaddresses = `CREATE TABLE IF NOT EXISTS listaddresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address VARCHAR(255),
  createdAt int
)`

export type TDbPriceInfo = {
  id: number
  priceUsd: number
  createdAt: number
}

export const createPastelPriceTable = `CREATE TABLE IF NOT EXISTS pslprice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  priceUsd number,
  createdAt int
)`

export const insertPastelPriceInfoQuery = `INSERT INTO pslprice(
  priceUsd,
  createdAt
) VALUES (
  $priceUsd,
  $createdAt
)`

export const insertStatisticinfoQuery = `INSERT INTO statisticinfo(
  solutions,
  difficulty,
  createdAt
) VALUES (
  $solutions,
  $difficulty,
  $createdAt
)`

export const insertNetworkinfoQuery = `INSERT INTO networkinfo(
  version,
  subversion,
  protocolversion,
  localservices,
  timeoffset,
  connections,
  networks,
  relayfee,
  localaddresses,
  warnings,
  createdAt
) VALUES (
  $version,
  $subversion,
  $protocolversion,
  $localservices,
  $timeoffset,
  $connections,
  $networks,
  $relayfee,
  $localaddresses,
  $warnings,
  $createdAt
)`

export const insertNettotalsQuery = `INSERT INTO nettotals(
  totalbytesrecv,
  totalbytessent,
  timemillis,
  createdAt
) VALUES (
  $totalbytesrecv,
  $totalbytessent,
  $timemillis,
  $createdAt
)`

export const insertMempoolinfoQuery = `INSERT INTO mempoolinfo(
  size,
  bytes,
  usage,
  createdAt
) VALUES (
  $size,
  $bytes,
  $usage,
  $createdAt
)`

export const insertRawmempoolinfoQuery = `INSERT INTO rawmempoolinfo(
  transactionid,
  size,
  fee,
  time,
  height,
  startingpriority,
  currentpriority,
  depends,
  createdAt
) VALUES (
  $transactionid,
  $size,
  $fee,
  $time,
  $height,
  $startingpriority,
  $currentpriority,
  $depends,
  $createdAt
)`

export const insertMininginfoQuery = `INSERT INTO mininginfo(
  blocks,
  currentblocksize,
  currentblocktx,
  difficulty,
  errors,
  genproclimit,
  localsolps,
  networksolps,
  networkhashps,
  pooledtx,
  testnet,
  chain,
  createdAt
) VALUES (
  $blocks,
  $currentblocksize,
  $currentblocktx,
  $difficulty,
  $errors,
  $genproclimit,
  $localsolps,
  $networksolps,
  $networkhashps,
  $pooledtx,
  $testnet,
  $chain,
  $createdAt
)`

export const insertBlockChainInfoQuery = `INSERT INTO blockchaininfo(
  bestblockhash,
  blocks,
  chain,
  chainwork,
  commitments,
  consensus,
  difficulty,
  headers,
  pruned,
  softforks,
  upgrades,
  valuePools,
  verificationprogress,
  createdAt
) VALUES (
  $bestblockhash,
  $blocks,
  $chain,
  $chainwork,
  $commitments,
  $consensus,
  $difficulty,
  $headers,
  $pruned,
  $softforks,
  $upgrades,
  $valuePools,
  $verificationprogress,
  $createdAt
)`

export const insertBlockinfoQuery = `INSERT INTO blockinfo(
  hash,
  confirmations,
  size,
  height,
  version,
  merkleroot,
  finalsaplingroot,
  tx,
  time,
  nonce,
  solution,
  bits,
  difficulty,
  chainwork,
  anchor,
  valuePools,
  previousblockhash,
  nextblockhash,
  createdAt
) VALUES (
  $hash,
  $confirmations,
  $size,
  $height,
  $version,
  $merkleroot,
  $finalsaplingroot,
  $tx,
  $time,
  $nonce,
  $solution,
  $bits,
  $difficulty,
  $chainwork,
  $anchor,
  $valuePools,
  $previousblockhash,
  $nextblockhash,
  $createdAt
)`

export const insertRawtransactionQuery = `INSERT INTO rawtransaction(
  hex,
  txid,
  overwintered,
  version,
  versiongroupid,
  locktime,
  expiryheight,
  vin,
  vout,
  vjoinsplit,
  blockhash,
  confirmations,
  time,
  blocktime,
  createdAt
) VALUES (
  $hex,
  $txid,
  $overwintered,
  $version,
  $versiongroupid,
  $locktime,
  $expiryheight,
  $vin,
  $vout,
  $vjoinsplit,
  $blockhash,
  $confirmations,
  $time,
  $blocktime,
  $createdAt
)`

export const insertTransactionTableQuery = `INSERT INTO transaction_tbl(
  amount,
  blockhash,
  blockindex,
  blocktime,
  confirmations,
  details,
  expiryheight,
  hex,
  time,
  timereceived,
  txid,
  vjoinsplit,
  walletconflicts,
  createdAt
) VALUES (
  $amount,
  $blockhash,
  $blockindex,
  $blocktime,
  $confirmations,
  $details,
  $expiryheight,
  $hex,
  $time,
  $timereceived,
  $txid,
  $vjoinsplit,
  $walletconflicts,
  $createdAt
)`

export const insertTxoutsetinfoQuery = `INSERT INTO txoutsetinfo(
  height,
  bestblock,
  transactions,
  txouts,
  bytes_serialized,
  hash_serialized,
  total_amount,
  createdAt
) VALUES (
  $height,
  $bestblock,
  $transactions,
  $txouts,
  $bytes_serialized,
  $hash_serialized,
  $total_amount,
  $createdAt
)`

export const insertChaintipsQuery = `INSERT INTO chaintips(
  height,
  hash,
  branchlen,
  status,
  createdAt
) VALUES (
  $height,
  $hash,
  $branchlen,
  $status,
  $createdAt
)`

export const insertBlocksubsidyQuery = `INSERT INTO blocksubsidy(
  miner,
  masternode,
  governance,
  createdAt
) VALUES (
  $miner,
  $masternode,
  $governance,
  $createdAt
)`

export const insertWalletinfoQuery = `INSERT INTO walletinfo(
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
)`

export const insertListunspentQuery = `INSERT INTO listunspent(
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
)`

export const insertTotalbalanceQuery = `INSERT INTO totalbalance(
  transparent,
  private,
  total,
  createdAt
) VALUES (
  $transparent,
  $private,
  $total,
  $createdAt
)`

export const insertListaddressesQuery = `INSERT INTO listaddresses(
  address,
  createdAt
) VALUES (
  $address,
  $createdAt
)`

export const selectAllQuery = 'SELECT * FROM '

export const selectIDQuery = 'SELECT id FROM '

export const whereTransactionIDMatchingQuery =
  ' WHERE transactionid=$tid AND time=$time'

export const orderByIDQuery = ' ORDER BY id DESC LIMIT 1'

export const averageFilterByDailyPeriodQuery =
  "SELECT strftime('%m/%d/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockinfo"

export const averageFilterByMonthlyPeriodQuery =
  "SELECT strftime('%m/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockinfo"

export const averageFilterByYearlyPeriodQuery =
  "SELECT strftime('%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockinfo"

export const groupbyDaily =
  "GROUP BY strftime('%Y-%m-%d', datetime(createdAt / 1000, 'unixepoch'))"

export const groupByMonthly =
  "GROUP BY strftime('%Y-%m', datetime(createdAt / 1000, 'unixepoch'))"

export const groupByYearly =
  "GROUP BY strftime('%Y', datetime(createdAt / 1000, 'unixepoch'))"

export const transactionFeeDailyQuery =
  "SELECT strftime('%Y', datetime(createdAt / 1000, 'unixepoch')) AS year, SUM(fee) AS sumFee FROM "

export const countIdByDailyPeriodQuery =
  "SELECT strftime('%m/%d/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, COUNT(id) AS count from "
