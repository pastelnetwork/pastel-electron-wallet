import initSqlJs, { Database, QueryExecResult } from 'sql.js'

import {
  create_block,
  create_blocksubsidy,
  create_chaintips,
  create_listaddresses,
  create_listreceivedbyaddress,
  create_listtransactions,
  create_listunspent,
  create_mempoolinfo,
  create_mininginfo,
  create_nettotals,
  create_networkinfo,
  create_rawtransaction,
  create_statisticinfo,
  create_totalbalance,
  create_transaction,
  create_txoutsetinfo,
  create_walletinfo,
} from '../constants'
import {
  BlockInfo,
  BlockSubsidy,
  ChainTips,
  IPastelDBState,
  ListTransactions,
  ListUnspent,
  MempoolInfo,
  MiningInfo,
  NetTotals,
  NetworkInfo,
  RawTransaction,
  ReceivedByAddress,
  TotalBalance,
  TransactionInfo,
  TxoutsetInfo,
  WalletInfo,
} from '../type'

export const createDatabase = async (): Promise<Database> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      return `static/bin/${file}`
    },
  })

  const newdb: Database = new SQL.Database()
  await createTables(newdb)
  return newdb
}

export const createTables = async (db: Database): Promise<void> => {
  db.exec(create_statisticinfo)
  db.exec(create_networkinfo)
  db.exec(create_nettotals)
  db.exec(create_mempoolinfo)
  db.exec(create_mininginfo)
  db.exec(create_block)
  db.exec(create_rawtransaction)
  db.exec(create_transaction)
  db.exec(create_txoutsetinfo)
  db.exec(create_chaintips)
  db.exec(create_blocksubsidy)
  db.exec(create_walletinfo)
  db.exec(create_listreceivedbyaddress)
  db.exec(create_listtransactions)
  db.exec(create_listunspent)
  db.exec(create_totalbalance)
  db.exec(create_listaddresses)
  return
}

export const getLastIdFromDB = (
  pastelDBState: IPastelDBState,
  tableName: string,
): number => {
  const sqlText = `SELECT id FROM  ${tableName}`
  const sqlResult = pastelDBState.pastelDB.exec(sqlText)
  if (sqlResult.length) {
    return sqlResult[0].values.length + 1
  } else {
    return 1
  }
}

export const insertStatisticDataToDB = (
  pastelDBState: IPastelDBState,
  hashrate: string,
  difficulty: string,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'statisticinfo')
  const sqlText = `INSERT INTO statisticinfo
      (id, hashrate, miner_distribution, difficulty, create_timestamp) VALUES
      (${newId}, '${hashrate}', '', '${difficulty}', '${create_timestamp}')`
  pastelDBState.pastelDB.exec(sqlText)
}

export const getDatasFromDB = (
  pastelDBState: IPastelDBState,
  tableName: string,
): QueryExecResult[] => {
  const sqlText = `SELECT * FROM ${tableName}`
  const sqlResult = pastelDBState.pastelDB.exec(sqlText)
  console.log(`${tableName} table data: `, sqlResult)
  return sqlResult
}

export const insertNetworkInfotoDB = (
  pastelDBState: IPastelDBState,
  networkinfo: NetworkInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'networkinfo')
  const networks = JSON.stringify(networkinfo.networks)
  const sqlText = `INSERT INTO networkinfo VALUES (
    ${newId},
    '${networkinfo.version}',
    '${networkinfo.subversion}',
    '${networkinfo.protocolversion}',
    '${networkinfo.localservices}',
    '${networkinfo.timeoffset}',
    '${networkinfo.connections}',
    '${networks}',
    '${networkinfo.relayfee}',
    '${networkinfo.localaddresses}',
    '${networkinfo.warnings}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertNetTotalsToDB = (
  pastelDBState: IPastelDBState,
  nettotals: NetTotals,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'nettotals')
  const sqlText = `INSERT INTO nettotals VALUES (
    ${newId},
    '${nettotals.totalbytesrecv}',
    '${nettotals.totalbytessent}',
    '${nettotals.timemillis}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertMempoolinfoToDB = (
  pastelDBState: IPastelDBState,
  mempoolinfo: MempoolInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'mempoolinfo')
  const sqlText = `INSERT INTO mempoolinfo VALUES (
    ${newId},
    '${mempoolinfo.size}',
    '${mempoolinfo.bytes}',
    '${mempoolinfo.usage}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertMiningInfoToDB = (
  pastelDBState: IPastelDBState,
  mininginfo: MiningInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'mininginfo')
  const sqlText = `INSERT INTO mininginfo VALUES (
    ${newId},
    '${mininginfo.blocks}',
    '${mininginfo.currentblocksize}',
    '${mininginfo.currentblocktx}',
    '${mininginfo.difficulty}',
    '${mininginfo.errors}',
    '${mininginfo.genproclimit}',
    '${mininginfo.localsolps}',
    '${mininginfo.networksolps}',
    '${mininginfo.networkhashps}',
    '${mininginfo.pooledtx}',
    '${mininginfo.testnet}',
    '${mininginfo.chain}',
    '${mininginfo.generate}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertBlockInfoToDB = (
  pastelDBState: IPastelDBState,
  blockInfo: BlockInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'blockinfo')
  const valuePools = JSON.stringify(blockInfo.valuePools)
  const sqlText = `INSERT INTO blockinfo VALUES (
    ${newId},
    '${blockInfo.hash}',
    '${blockInfo.confirmations}',
    '${blockInfo.size}',
    '${blockInfo.height}',
    '${blockInfo.version}',
    '${blockInfo.merkleroot}',
    '${blockInfo.finalsaplingroot}',
    '${blockInfo.tx}',
    '${blockInfo.time}',
    '${blockInfo.nonce}',
    '${blockInfo.solution}',
    '${blockInfo.bits}',
    '${blockInfo.difficulty}',
    '${blockInfo.chainwork}',
    '${blockInfo.anchor}',
    '${valuePools}',
    '${blockInfo.previousblockhash}',
    '${blockInfo.nextblockhash}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertRawtransaction = (
  pastelDBState: IPastelDBState,
  rawtransaction: RawTransaction,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'rawtransaction')
  const sqlText = `INSERT INTO rawtransaction VALUES (
    ${newId},
    '${rawtransaction.hex}',
    '${rawtransaction.txid}',
    '${rawtransaction.overwintered}',
    '${rawtransaction.version}',
    '${rawtransaction.versiongroupid}',
    '${rawtransaction.locktime}',
    '${rawtransaction.expiryheight}',
    '${rawtransaction.vin}',
    '${rawtransaction.vout}',
    '${rawtransaction.vjoinsplit}',
    '${rawtransaction.valueBalance}',
    '${rawtransaction.vShieldedSpend}',
    '${rawtransaction.vShieldedOutput}',
    '${rawtransaction.bindingSig}',
    '${rawtransaction.blockhash}',
    '${rawtransaction.confirmations}',
    '${rawtransaction.time}',
    '${rawtransaction.blocktime}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertTransaction = (
  pastelDBState: IPastelDBState,
  transactionInfo: TransactionInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'transaction_tbl')
  const sqlText = `INSERT INTO transaction_tbl VALUES (
    ${newId},
    '${transactionInfo.hex}',
    '${transactionInfo.txid}',
    '${transactionInfo.overwintered}',
    '${transactionInfo.version}',
    '${transactionInfo.versiongroupid}',
    '${transactionInfo.locktime}',
    '${transactionInfo.expiryheight}',
    '${transactionInfo.vin}',
    '${transactionInfo.vout}',
    '${transactionInfo.vjoinsplit}',
    '${transactionInfo.valueBalance}',
    '${transactionInfo.vShieldedSpend}',
    '${transactionInfo.vShieldedOutput}',
    '${transactionInfo.bindingSig}',
    '${transactionInfo.blockhash}',
    '${transactionInfo.confirmations}',
    '${transactionInfo.time}',
    '${transactionInfo.blocktime}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertTxoutsetinfo = (
  pastelDBState: IPastelDBState,
  txoutsetinfo: TxoutsetInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'txoutsetinfo')
  const sqlText = `INSERT INTO txoutsetinfo VALUES (
    ${newId},
    '${txoutsetinfo.height}',
    '${txoutsetinfo.bestblock}',
    '${txoutsetinfo.transactions}',
    '${txoutsetinfo.txouts}',
    '${txoutsetinfo.bytes_serialized}',
    '${txoutsetinfo.hash_serialized}',
    '${txoutsetinfo.total_amount}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertChaintips = (
  pastelDBState: IPastelDBState,
  chaintips: ChainTips,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'chaintips')
  const sqlText = `INSERT INTO chaintips VALUES (
    ${newId},
    '${chaintips.height}',
    '${chaintips.hash}',
    '${chaintips.branchlen}',
    '${chaintips.status}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertBlocksubsidy = (
  pastelDBState: IPastelDBState,
  blocksubsidy: BlockSubsidy,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'blocksubsidy')
  const sqlText = `INSERT INTO blocksubsidy VALUES (
    ${newId},
    '${blocksubsidy.miner}',
    '${blocksubsidy.masternode}',
    '${blocksubsidy.governance}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertWalletinfo = (
  pastelDBState: IPastelDBState,
  walletinfo: WalletInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'walletinfo')
  const sqlText = `INSERT INTO walletinfo VALUES (
    ${newId},
    '${walletinfo.walletversion}',
    '${walletinfo.balance}',
    '${walletinfo.unconfirmed_balance}',
    '${walletinfo.immature_balance}',
    '${walletinfo.txcount}',
    '${walletinfo.keypoololdest}',
    '${walletinfo.keypoolsize}',
    '${walletinfo.paytxfee}',
    '${walletinfo.seedfp}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertListreceivedbyaddress = (
  pastelDBState: IPastelDBState,
  listreceivedbyaddress: ReceivedByAddress,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'listreceivedbyaddress')
  const sqlText = `INSERT INTO listreceivedbyaddress VALUES (
    ${newId},
    '${listreceivedbyaddress.address}',
    '${listreceivedbyaddress.account}',
    '${listreceivedbyaddress.amount}',
    '${listreceivedbyaddress.confirmations}',
    '${listreceivedbyaddress.txids}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertListTransactions = (
  pastelDBState: IPastelDBState,
  listtransactions: ListTransactions,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'listtransactions')
  const sqlText = `INSERT INTO listtransactions VALUES (
    ${newId},
    '${listtransactions.account}',
    '${listtransactions.address}',
    '${listtransactions.category}',
    '${listtransactions.amount}',
    '${listtransactions.vout}',
    '${listtransactions.confirmations}',
    '${listtransactions.blockhash}',
    '${listtransactions.blockindex}',
    '${listtransactions.blocktime}',
    '${listtransactions.expiryheight}',
    '${listtransactions.txid}',
    '${listtransactions.walletconflicts}',
    '${listtransactions.time}',
    '${listtransactions.timereceived}',
    '${listtransactions.vjoinsplit}',
    '${listtransactions.size}',
    '${listtransactions.lastblock}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertListunspent = (
  pastelDBState: IPastelDBState,
  listunspent: ListUnspent,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'listunspent')
  const sqlText = `INSERT INTO listunspent VALUES (
    ${newId},
    '${listunspent.txid}',
    '${listunspent.vout}',
    '${listunspent.generated}',
    '${listunspent.address}',
    '${listunspent.account}',
    '${listunspent.scriptPubKey}',
    '${listunspent.amount}',
    '${listunspent.confirmations}',
    '${listunspent.spendable}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertTotalbalance = (
  pastelDBState: IPastelDBState,
  totalbalance: TotalBalance,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'totalbalance')
  const sqlText = `INSERT INTO totalbalance VALUES (
    ${newId},
    '${totalbalance.transparent}',
    '${totalbalance.private}',
    '${totalbalance.total}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}

export const insertListaddresses = (
  pastelDBState: IPastelDBState,
  address: string,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDBState, 'listaddresses')
  const sqlText = `INSERT INTO listaddresses VALUES (
    ${newId},
    '${address}',
    '${create_timestamp}'
  )`
  pastelDBState.pastelDB.exec(sqlText)
}
