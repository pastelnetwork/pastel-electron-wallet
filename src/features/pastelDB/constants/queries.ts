export const create_statisticinfo = `CREATE TABLE statisticinfo (
  id int NOT NULL,
  hashrate VARCHAR(255),
  miner_distribution VARCHAR(255),
  difficulty VARCHAR(255),
  create_timestamp int
)`

export const create_networkinfo = `CREATE TABLE networkinfo (
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

export const create_nettotals = `CREATE TABLE nettotals (
  id int NOT NULL,
  totalbytesrecv int,
  totalbytessent int,
  timemillis int,
  create_timestamp int
)`

export const create_mempoolinfo = `CREATE TABLE mempoolinfo (
  id int NOT NULL,
  size int,
  bytes int,
  usage int,
  create_timestamp int
)`

export const create_rawmempoolinfo = `CREATE TABLE rawmempoolinfo (
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

export const create_mininginfo = `CREATE TABLE mininginfo (
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
  generate boolean,
  create_timestamp int
)`

export const create_block = `CREATE TABLE blockinfo (
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

export const create_rawtransaction = `CREATE TABLE rawtransaction (
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
  valueBalance float,
  vShieldedSpend text,
  vShieldedOutput text,
  bindingSig VARCHAR(255),
  blockhash VARCHAR(255),
  confirmations int,
  time int,
  blocktime int,
  create_timestamp int    
)`

export const create_transaction = `CREATE TABLE transaction_tbl (
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
  valueBalance float,
  vShieldedSpend text,
  vShieldedOutput text,
  bindingSig VARCHAR(255),
  blockhash VARCHAR(255),
  confirmations int,
  time int,
  blocktime int,
  create_timestamp int    
)`

export const create_txoutsetinfo = `CREATE TABLE txoutsetinfo (
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

export const create_chaintips = `CREATE TABLE chaintips (
  id int NOT NULL,
  height int,
  hash VARCHAR(255),
  branchlen int,
  status VARCHAR(255),
  create_timestamp int
)`

export const create_blocksubsidy = `CREATE TABLE blocksubsidy (
  id int NOT NULL,
  miner int,
  masternode int,
  governance int,
  create_timestamp int  
)`

export const create_walletinfo = `CREATE TABLE walletinfo (
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

export const create_listreceivedbyaddress = `CREATE TABLE listreceivedbyaddress (
  id int NOT NULL,
  address VARCHAR(255),
  account VARCHAR(255),
  amount int,
  confirmations int,
  txids text,
  create_timestamp int
)`

export const create_listtransactions = `CREATE TABLE listtransactions (
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
  lastblock VARCHAR(255),
  create_timestamp int
)`

export const create_listunspent = `CREATE TABLE listunspent (
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

export const create_totalbalance = `CREATE TABLE totalbalance (
  id int NOT NULL,
  transparent VARCHAR(255),
  private VARCHAR(255),
  total VARCHAR(255),
  create_timestamp int
)`

export const create_listaddresses = `CREATE TABLE listaddresses (
  id int NOT NULL,
  address VARCHAR(255),
  create_timestamp int
)`
