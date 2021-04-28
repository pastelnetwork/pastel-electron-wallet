import { app, remote } from 'electron'
import fs from 'fs'
import path from 'path'
import initSqlJs, { Database, QueryExecResult } from 'sql.js'

import {
  TBlockInfo,
  TBlockSubsidy,
  TChainTips,
  TListTransactions,
  TListUnspent,
  TMempoolInfo,
  TMiningInfo,
  TNetTotals,
  TNetworkInfo,
  TRawMempool,
  TRawTransaction,
  TTotalBalance,
  TTxoutsetInfo,
  TWalletInfo,
} from '../../api/pastel-rpc/network-stats/type'
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
  create_rawmempoolinfo,
  create_rawtransaction,
  create_statisticinfo,
  create_totalbalance,
  create_transaction,
  create_txoutsetinfo,
  create_walletinfo,
} from './constants'

export const readSqliteDBFile = async (): Promise<Buffer> => {
  return await fs.promises.readFile(
    path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
  )
}

export const writeSqliteDBFile = async (buffer: Buffer): Promise<void> => {
  await fs.promises.writeFile(
    path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
    buffer,
    { flag: 'a+' },
  )
}

export async function delayValidPath(path: string): Promise<boolean> {
  try {
    const stats = fs.statSync(path)
    const isValid = stats.isDirectory()
    if (isValid) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const createDatabase = async (): Promise<Database> => {
  // delay untill create./webpack folder
  while (
    (await delayValidPath(
      `${app.getAppPath()}/.webpack/renderer/static/bin`,
    )) === false
  ) {
    await sleep(1000)
  }

  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      return `${app.getAppPath()}/.webpack/renderer/static/bin/${file}`
    },
  })

  try {
    const filebuffer: Buffer = await readSqliteDBFile()
    return new SQL.Database(filebuffer)
  } catch (error) {
    const newdb: Database = new SQL.Database()
    await createTables(newdb)
    return newdb
  }
}

export const saveDataToLocalSqlite = async (db: Database): Promise<void> => {
  const data = db.export()
  const buffer = Buffer.from(data)
  await writeSqliteDBFile(buffer)
  return
}

export const createTables = async (db: Database): Promise<void> => {
  db.exec(create_statisticinfo)
  db.exec(create_networkinfo)
  db.exec(create_nettotals)
  db.exec(create_mempoolinfo)
  db.exec(create_rawmempoolinfo)
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

export const validateDataFromDB = (
  pastelDB: Database,
  tableName: string,
  transactionid: string,
  time: number,
): boolean => {
  const sqlText = `SELECT id FROM  ${tableName} WHERE transactionid='${transactionid}' AND time=${time}`
  const sqlResult = pastelDB.exec(sqlText)
  return sqlResult.length ? false : true
}
export const getLastIdFromDB = (
  pastelDB: Database,
  tableName: string,
): number => {
  const sqlText = `SELECT id FROM  ${tableName}`
  const sqlResult = pastelDB.exec(sqlText)
  if (sqlResult.length) {
    return sqlResult[0].values.length + 1
  } else {
    return 1
  }
}

export const insertStatisticDataToDB = (
  pastelDB: Database,
  hashrate: number,
  difficulty: number,
): void => {
  const create_timestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'statisticinfo')
  const sqlText = `INSERT INTO statisticinfo
      (id, hashrate, miner_distribution, difficulty, create_timestamp) VALUES
      (${newId}, '${hashrate}', '', '${difficulty}', ${create_timestamp})`
  pastelDB.exec(sqlText)
}

export const getDatasFromDB = (
  pastelDB: Database,
  tableName: string,
): QueryExecResult[] => {
  const sqlText = `SELECT * FROM ${tableName}`
  const sqlResult = pastelDB.exec(sqlText)
  console.log(`${tableName} table data: `, sqlResult)
  return sqlResult
}

export const insertNetworkInfotoDB = (
  pastelDB: Database,
  networkinfo: TNetworkInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'networkinfo')
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
  pastelDB.exec(sqlText)
}

export const insertNetTotalsToDB = (
  pastelDB: Database,
  nettotals: TNetTotals,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'nettotals')
  const sqlText = `INSERT INTO nettotals VALUES (
    ${newId},
    '${nettotals.totalbytesrecv}',
    '${nettotals.totalbytessent}',
    '${nettotals.timemillis}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertMempoolinfoToDB = (
  pastelDB: Database,
  mempoolinfo: TMempoolInfo,
): void => {
  const create_timestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'mempoolinfo')
  const sqlText = `INSERT INTO mempoolinfo VALUES (
    ${newId},
    '${mempoolinfo.size}',
    '${mempoolinfo.bytes}',
    '${mempoolinfo.usage}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertRawMempoolinfoToDB = (
  pastelDB: Database,
  mempoolinfo: TRawMempool,
): void => {
  if (
    !validateDataFromDB(
      pastelDB,
      'rawmempoolinfo',
      mempoolinfo.transactionid,
      mempoolinfo.time,
    )
  ) {
    // mempoolinfo already exist on db.
    return
  }

  const create_timestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'rawmempoolinfo')
  const depends = JSON.stringify(mempoolinfo.depends)
  const sqlText = `INSERT INTO rawmempoolinfo VALUES (
    ${newId},
    '${mempoolinfo.transactionid}',
    '${mempoolinfo.size}',
    '${mempoolinfo.fee}',
    '${mempoolinfo.time}',
    '${mempoolinfo.height}',
    '${mempoolinfo.startingpriority}',
    '${mempoolinfo.currentpriority}',
    '${depends}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertMiningInfoToDB = (
  pastelDB: Database,
  mininginfo: TMiningInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'mininginfo')
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
  pastelDB.exec(sqlText)
}

export const insertBlockInfoToDB = (
  pastelDB: Database,
  blockInfo: TBlockInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'blockinfo')
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
  pastelDB.exec(sqlText)
}

export const insertRawtransaction = (
  pastelDB: Database,
  rawtransaction: TRawTransaction,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'rawtransaction')
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
    '${rawtransaction.blockhash}',
    '${rawtransaction.confirmations}',
    '${rawtransaction.time}',
    '${rawtransaction.blocktime}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertTransaction = (
  pastelDB: Database,
  transactionInfo: TRawTransaction,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'transaction_tbl')
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
    '${transactionInfo.blockhash}',
    '${transactionInfo.confirmations}',
    '${transactionInfo.time}',
    '${transactionInfo.blocktime}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertTxoutsetinfo = (
  pastelDB: Database,
  txoutsetinfo: TTxoutsetInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'txoutsetinfo')
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
  pastelDB.exec(sqlText)
}

export const insertChaintips = (
  pastelDB: Database,
  chaintips: TChainTips,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'chaintips')
  const sqlText = `INSERT INTO chaintips VALUES (
    ${newId},
    '${chaintips.height}',
    '${chaintips.hash}',
    '${chaintips.branchlen}',
    '${chaintips.status}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertBlocksubsidy = (
  pastelDB: Database,
  blocksubsidy: TBlockSubsidy,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'blocksubsidy')
  const sqlText = `INSERT INTO blocksubsidy VALUES (
    ${newId},
    '${blocksubsidy.miner}',
    '${blocksubsidy.masternode}',
    '${blocksubsidy.governance}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertWalletinfo = (
  pastelDB: Database,
  walletinfo: TWalletInfo,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'walletinfo')
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
  pastelDB.exec(sqlText)
}

export const insertListTransactions = (
  pastelDB: Database,
  listtransactions: TListTransactions,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'listtransactions')
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
  pastelDB.exec(sqlText)
}

export const insertListunspent = (
  pastelDB: Database,
  listunspent: TListUnspent,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'listunspent')
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
  pastelDB.exec(sqlText)
}

export const insertTotalbalance = (
  pastelDB: Database,
  totalbalance: TTotalBalance,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'totalbalance')
  const sqlText = `INSERT INTO totalbalance VALUES (
    ${newId},
    '${totalbalance.transparent}',
    '${totalbalance.private}',
    '${totalbalance.total}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}

export const insertListaddresses = (
  pastelDB: Database,
  address: string,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'listaddresses')
  const sqlText = `INSERT INTO listaddresses VALUES (
    ${newId},
    '${address}',
    '${create_timestamp}'
  )`
  pastelDB.exec(sqlText)
}
