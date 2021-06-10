export const createStatisticinfo = `CREATE TABLE statisticinfo (
  id int NOT NULL,
  solutions int,
  difficulty float,
  create_timestamp int
)`

export const createNetworkinfo = `CREATE TABLE networkinfo (
  id int NOT NULL,
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
  create_timestamp int
)`

export const createNettotals = `CREATE TABLE nettotals (
  id int NOT NULL,
  totalbytesrecv int,
  totalbytessent int,
  timemillis int,
  create_timestamp int
)`

export const createMempoolinfo = `CREATE TABLE mempoolinfo (
  id int NOT NULL,
  size int,
  bytes int,
  usage int,
  create_timestamp int
)`

export const createRawmempoolinfo = `CREATE TABLE rawmempoolinfo (
  id int NOT NULL,
  transactionid int NOT NULL,
  size int,
  fee int,
  time int,
  height int,
  startingpriority int,
  currentpriority int,
  depends text,
  create_timestamp int
)`

export const createMininginfo = `CREATE TABLE mininginfo (
  id int NOT NULL,
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
  create_timestamp int
)`

export const createBlockChainInfo = `CREATE TABLE blockchaininfo (
  id int NOT NULL,
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
  create_timestamp int
)`

export const createBlock = `CREATE TABLE blockinfo (
  id int NOT NULL,
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
  create_timestamp int
)`

export const createRawtransaction = `CREATE TABLE rawtransaction (
  id int NOT NULL,
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
  create_timestamp int
)`

export const createTransaction = `CREATE TABLE transaction_tbl (
  id int NOT NULL,
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
  create_timestamp int    
)`

export const createTxoutsetinfo = `CREATE TABLE txoutsetinfo (
  id int NOT NULL,
  height int,
  bestblock VARCHAR(255),
  transactions int,
  txouts int,
  bytes_serialized int,
  hash_serialized VARCHAR(255),
  total_amount float,
  create_timestamp int  
)`

export const createChaintips = `CREATE TABLE chaintips (
  id int NOT NULL,
  height int,
  hash VARCHAR(255),
  branchlen int,
  status VARCHAR(255),
  create_timestamp int
)`

export const createBlocksubsidy = `CREATE TABLE blocksubsidy (
  id int NOT NULL,
  miner int,
  masternode int,
  governance int,
  create_timestamp int  
)`

export const createWalletinfo = `CREATE TABLE walletinfo (
  id int NOT NULL,
  walletversion int,
  balance int,
  unconfirmed_balance int,
  immature_balance int,
  txcount int,
  keypoololdest int,
  keypoolsize int,
  paytxfee int,
  seedfp VARCHAR(255),
  create_timestamp int
)`

export const createListreceivedbyaddress = `CREATE TABLE listreceivedbyaddress (
  id int NOT NULL,
  address VARCHAR(255),
  account VARCHAR(255),
  amount int,
  confirmations int,
  txids text,
  create_timestamp int
)`

export const createListtransactions = `CREATE TABLE listtransactions (
  id int NOT NULL,
  account VARCHAR(255),
  address VARCHAR(255),
  category VARCHAR(255),
  amount int,
  vout int,
  confirmations int,
  blockhash int,
  blockindex int,
  blocktime int,
  expiryheight int,
  txid VARCHAR(255),
  walletconflicts text,
  time int,
  timereceived int,
  vjoinsplit text,
  size int,
  create_timestamp int
)`

export const createListunspent = `CREATE TABLE listunspent (
  id int NOT NULL,
  txid VARCHAR(255),
  vout int,
  generated boolean,
  address VARCHAR(255),
  account VARCHAR(255),
  scriptPubKey VARCHAR(255),
  amount int,
  confirmations int,
  spendable int,
  create_timestamp int
)`

export const createTotalbalance = `CREATE TABLE totalbalance (
  id int NOT NULL,
  transparent VARCHAR(255),
  private VARCHAR(255),
  total VARCHAR(255),
  create_timestamp int
)`

export const createListaddresses = `CREATE TABLE listaddresses (
  id int NOT NULL,
  address VARCHAR(255),
  create_timestamp int
)`

export const createPastelPriceTable = `CREATE TABLE pslprice (
  id int NOT NULL,
  price_usd number,
  create_timestamp int
)`

export const insertPastelPriceInfoQuery = `INSERT INTO pslprice VALUES (
  $newId,
  $priceUsd,
  $createTimestamp
)`

export const insertStatisticinfoQuery = `INSERT INTO statisticinfo VALUES (
  $newId,
  $solutions,
  $difficulty,
  $createTimestamp
)`

export const insertNetworkinfoQuery = `INSERT INTO networkinfo VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertNettotalsQuery = `INSERT INTO nettotals VALUES (
  $newId,
  $totalbytesrecv,
  $totalbytessent,
  $timemillis,
  $createTimestamp
)`

export const insertMempoolinfoQuery = `INSERT INTO mempoolinfo VALUES (
  $newId,
  $size,
  $bytes,
  $usage,
  $createTimestamp
)`

export const insertRawmempoolinfoQuery = `INSERT INTO rawmempoolinfo VALUES (
  $newId,
  $transactionid,
  $size,
  $fee,
  $time,
  $height,
  $startingpriority,
  $currentpriority,
  $depends,
  $createTimestamp
)`

export const insertMininginfoQuery = `INSERT INTO mininginfo VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertBlockChainInfoQuery = `INSERT INTO blockchaininfo VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertBlockinfoQuery = `INSERT INTO blockinfo VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertRawtransactionQuery = `INSERT INTO rawtransaction VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertTransactionTableQuery = `INSERT INTO transaction_tbl VALUES (
  $newId,
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
  $createTimestamp
)`

export const insertTxoutsetinfoQuery = `INSERT INTO txoutsetinfo VALUES (
  $newId,
  $height,
  $bestblock,
  $transactions,
  $txouts,
  $bytes_serialized,
  $hash_serialized,
  $total_amount,
  $createTimestamp
)`

export const insertChaintipsQuery = `INSERT INTO chaintips VALUES (
  $newId,
  $height,
  $hash,
  $branchlen,
  $status,
  $createTimestamp
)`

export const insertBlocksubsidyQuery = `INSERT INTO blocksubsidy VALUES (
  $newId,
  $miner,
  $masternode,
  $governance,
  $createTimestamp
)`

export const insertWalletinfoQuery = `INSERT INTO walletinfo VALUES (
  $newId,
  $walletversion,
  $balance,
  $unconfirmed_balance,
  $immature_balance,
  $txcount,
  $keypoololdest,
  $keypoolsize,
  $paytxfee,
  $seedfp,
  $createTimestamp
)`

export const insertListtransactionsQuery = `INSERT INTO listtransactions VALUES (
  $newId,
  $account,
  $address,
  $category,
  $amount,
  $vout,
  $confirmations,
  $blockhash,
  $blockindex,
  $blocktime,
  $expiryheight,
  $txid,
  $walletconflicts,
  $time,
  $timereceived,
  $vjoinsplit,
  $size,
  $createTimestamp
)`

export const insertListunspentQuery = `INSERT INTO listunspent VALUES (
  $newId,
  $txid,
  $vout,
  $generated,
  $address,
  $account,
  $scriptPubKey,
  $amount,
  $confirmations,
  $spendable,
  $createTimestamp
)`

export const insertTotalbalanceQuery = `INSERT INTO totalbalance VALUES (
  $newId,
  $transparent,
  $private,
  $total,
  $createTimestamp
)`

export const insertListaddressesQuery = `INSERT INTO listaddresses VALUES (
  $newId,
  $address,
  $createTimestamp
)`

export const selectAllQuery = 'SELECT * FROM '

export const selectIDQuery = 'SELECT id FROM '

export const whereTransactionIDMatchingQuery =
  ' WHERE transactionid=$tid AND time=$time'

export const orderByIDQuery = ' ORDER BY id DESC LIMIT 1'

export const averageFilterByDailyPeriodQuery = `SELECT strftime('%m/%d/%Y', datetime(create_timestamp / 1000, 'unixepoch')), 
  AVG(size) FROM blockinfo`

export const averageFilterByMonthlyPeriodQuery = `SELECT strftime('%m/%Y', datetime(create_timestamp / 1000, 'unixepoch')), 
  AVG(size) FROM blockinfo`

export const averageFilterByYearlyPeriodQuery = `SELECT strftime('%Y', datetime(create_timestamp / 1000, 'unixepoch')), 
  AVG(size) FROM blockinfo`

export const groupbyDaily =
  "GROUP BY strftime('%Y-%m-%d', datetime(create_timestamp / 1000, 'unixepoch'))"

export const groupByMonthly =
  "GROUP BY strftime('%Y-%m', datetime(create_timestamp / 1000, 'unixepoch'))"

export const groupByYearly =
  "GROUP BY strftime('%Y', datetime(create_timestamp / 1000, 'unixepoch'))"

export const countIdByDailyPeriodQuery = `SELECT strftime('%m/%d/%Y', datetime(create_timestamp / 1000, 'unixepoch')), 
COUNT(id) from `
