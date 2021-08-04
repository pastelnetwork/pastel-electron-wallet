import { remote } from 'electron'
import log from 'electron-log'
import fs from 'fs'
import path from 'path'
import initSqlJs, { Database, QueryExecResult, SqlJsStatic } from 'sql.js'
import {
  TBlock,
  TBlockChainInfo,
  TBlockSubsidy,
  TChainTips,
  TListUnspent,
  TMempoolInfo,
  TNetTotal,
  TNetworkInfo,
  TRawMempool,
  TRawTransaction,
  TTotalBalance,
  TTransaction,
  TTransactionInfo,
  TWalletInfo,
} from 'types/rpc'
import { TMiningInfo } from '../../types/rpc/mining'

import {
  createBlock,
  createBlockChainInfo,
  createBlocksubsidy,
  createChaintips,
  createListaddresses,
  createListreceivedbyaddress,
  createListtransactions,
  createListunspent,
  createMempoolinfo,
  createMininginfo,
  createNettotals,
  createNetworkinfo,
  createPastelPriceTable,
  createRawmempoolinfo,
  createRawtransaction,
  createStatisticinfo,
  createTotalbalance,
  createTransaction,
  createTxoutsetinfo,
  createWalletinfo,
  insertBlockChainInfoQuery,
  insertBlockinfoQuery,
  insertBlocksubsidyQuery,
  insertChaintipsQuery,
  insertListaddressesQuery,
  insertListtransactionsQuery,
  insertListunspentQuery,
  insertMempoolinfoQuery,
  insertMininginfoQuery,
  insertNettotalsQuery,
  insertNetworkinfoQuery,
  insertPastelPriceInfoQuery,
  insertRawmempoolinfoQuery,
  insertRawtransactionQuery,
  insertStatisticinfoQuery,
  insertTotalbalanceQuery,
  insertTransactionTableQuery,
  insertTxoutsetinfoQuery,
  insertWalletinfoQuery,
  orderByIDQuery,
  selectAllQuery,
  selectIDQuery,
  tableNames,
  whereTransactionIDMatchingQuery,
  averageFilterByDailyPeriodQuery,
  averageFilterByMonthlyPeriodQuery,
  averageFilterByYearlyPeriodQuery,
  countIdByDailyPeriodQuery,
  groupbyDaily,
  groupByMonthly,
  groupByYearly,
} from './constants'
import { TTxoutsetInfo, TValidateFields } from './type'

export const readSqliteDBFile = async (): Promise<Buffer | null> => {
  try {
    const file = await fs.promises.open(
      path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
      'r',
    )
    const stat = await file.stat()
    if (stat.birthtimeMs > +new Date('2021-06-10')) {
      return await fs.promises.readFile(
        path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
      )
    }
  } catch (e) {
    log.error(`pastelDB readSqliteDBFile error: ${e}`)
  }
  return null
}

export const RemoveSqliteDBFile = async (): Promise<void> => {
  try {
    await fs.promises.unlink(
      path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
    )
  } catch (e) {
    log.error('File not found')
  }
}

export const writeSqliteDBFile = async (buffer: Buffer): Promise<void> => {
  await fs.promises.writeFile(
    path.join(remote.app.getPath('appData'), 'Pastel', 'pasteldb.sqlite'),
    buffer,
    { flag: 'w+' },
  )
}

async function initSqlJS(): Promise<SqlJsStatic> {
  if (remote.app.isPackaged) {
    return await initSqlJs({
      locateFile: (file: string) => {
        return path.join(
          process.resourcesPath,
          `/app.asar/.webpack/renderer/static/bin/${file}`,
        )
      },
    })
  }
  return await initSqlJs({
    locateFile: (file: string) => {
      return `/static/bin/${file}`
    },
  })
}

export const createDatabase = async (): Promise<Database> => {
  const SQL = await initSqlJS()

  try {
    const filebuffer: Buffer | null = await readSqliteDBFile()
    if (filebuffer && filebuffer.length) {
      const db = new SQL.Database(filebuffer)

      // check database valid.
      getLastIdFromDB(db, 'walletinfo')

      return db
    }
  } catch (error) {
    log.error(`pastelDB createDatabase error: ${error}`)
  }
  await RemoveSqliteDBFile()
  const newdb: Database = new SQL.Database()
  await createTables(newdb)
  return newdb
}

export async function exportSqliteDB(db: Database): Promise<void> {
  const data = db.export()
  const buffer = Buffer.from(data)
  await writeSqliteDBFile(buffer)
  return
}

export async function createTables(db: Database): Promise<void> {
  // create whole tables
  await Promise.all([
    createAddressTables(db),
    createBlockChainTables(db),
    createMiningTables(db),
    createNetworkTables(db),
    createPSLPriceTable(db),
    createRawTransactionTables(db),
    createStatisticTable(db),
    createWalletTables(db),
  ])
  return
}

export async function createAddressTables(db: Database): Promise<void> {
  // create tables that keep Address related informations
  db.exec(createListreceivedbyaddress)
  db.exec(createListaddresses)
  return
}

export async function createStatisticTable(db: Database): Promise<void> {
  // create statisticinfo table
  db.exec(createStatisticinfo)
}

export async function createPSLPriceTable(db: Database): Promise<void> {
  // create Pastel Price table
  db.exec(createPastelPriceTable)
}

export async function createBlockChainTables(db: Database): Promise<void> {
  // Create the tables that keep various info regarding block chain processing.
  db.exec(createMempoolinfo)
  db.exec(createRawmempoolinfo)
  db.exec(createBlock)
  db.exec(createBlockChainInfo)
  db.exec(createChaintips)
  db.exec(createTxoutsetinfo)
  return
}

export async function createNetworkTables(db: Database): Promise<void> {
  // create Network data tables
  db.exec(createNetworkinfo)
  db.exec(createNettotals)
  return
}

export async function createWalletTables(db: Database): Promise<void> {
  // create Wallet data tables
  db.exec(createWalletinfo)
  db.exec(createListunspent)
  db.exec(createListtransactions)
  db.exec(createTotalbalance)
}

export async function createMiningTables(db: Database): Promise<void> {
  // create Mining data tables
  db.exec(createMininginfo)
  db.exec(createBlocksubsidy)
  return
}

export async function createRawTransactionTables(db: Database): Promise<void> {
  // create RawTransaction Data tables
  db.exec(createRawtransaction)
  db.exec(createTransaction)
  return
}

export function validateDuplicatedRawmempoolInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB validateDuplicatedRawmempoolInfo error: ${tableName} is invalid table name`,
    )
  }

  let values = {}

  const sqlText = selectIDQuery + tableName + whereTransactionIDMatchingQuery
  values = {
    $tid: validateFields.transactionid,
    $time: validateFields.time,
  }
  const sqlResult = pastelDB.exec(sqlText, values)
  return sqlResult.length ? false : true
}

export function validateDataFromDB(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB validateDuplicatedRawmempoolInfo error: ${tableName} is invalid table name`,
    )
  }

  let sqlResult: QueryExecResult[]
  let sqlText = ''
  let values = {}

  if (tableName === 'rawmempoolinfo') {
    sqlText = selectIDQuery + tableName + whereTransactionIDMatchingQuery
    values = {
      $tid: validateFields.transactionid,
      $time: validateFields.time,
    }
    sqlResult = pastelDB.exec(sqlText, values)
    return sqlResult.length ? false : true
  } else {
    sqlText = selectAllQuery + tableName + orderByIDQuery
    sqlResult = pastelDB.exec(sqlText)
    if (sqlResult.length && sqlResult[0].values[0]) {
      switch (tableName) {
        case 'blockchaininfo':
          if (validateFields.bestBlockHash === sqlResult[0].values[0][1]) {
            return false
          }
          break
        case 'blockinfo':
          if (validateFields.hash === sqlResult[0].values[0][1]) {
            return false
          }
          break
        case 'pslprice':
          if (validateFields.price === sqlResult[0].values[0][1]) {
            return false
          }
          break
        default:
          break
      }
      return true
    }
  }
  return true
}

export function getLastDataFromDB(
  pastelDB: Database,
  tableName: string,
): QueryExecResult[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getLastDataFromDB error: ${tableName} is invalid table name`,
    )
  }

  const sqlText = selectAllQuery + tableName + orderByIDQuery
  const sqlResult = pastelDB.exec(sqlText)
  return sqlResult
}

export function validateDuplicatedBlockchainInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (validateFields.bestBlockHash === sqlResult[0].values[0][1]) {
      return false
    }
  }
  return true
}

export function validateDuplicatedBlockInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (validateFields.hash === sqlResult[0].values[0][1]) {
      return false
    }
  }
  return true
}

export function validateDuplicatedBlocksubsidy(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.miner === sqlResult[0].values[0][1] &&
      validateFields.masterNode === sqlResult[0].values[0][2]
    ) {
      return false
    }
  }
  return true
}

export function validateDuplicatedPriceInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (validateFields.price === sqlResult[0].values[0][1]) {
      return false
    }
  }
  return true
}

export function validateDuplicatedMempoolInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.mempoolSize === sqlResult[0].values[0][1] &&
      validateFields.mempoolByte === sqlResult[0].values[0][2] &&
      validateFields.mempoolUsage === sqlResult[0].values[0][3]
    ) {
      return false
    }
  }
  return true
}

export function validateDuplicatedMiningInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (validateFields.miningBlocks === sqlResult[0].values[0][1]) {
      return false
    }
  }
  return true
}

export function validateDuplicatedStatisticInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.solutions === sqlResult[0].values[0][1] &&
      validateFields.difficulty === sqlResult[0].values[0][2]
    ) {
      return false
    }
  }
  return true
}

export function validateDuplicatedTotalbalance(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.balanceTransparent === sqlResult[0].values[0][1] &&
      validateFields.balanceTotal === sqlResult[0].values[0][3]
    ) {
      return false
    }
  }
  return true
}

export function validateDuplicatedTxoutsetInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.height === sqlResult[0].values[0][1] &&
      validateFields.bestBlockHash === sqlResult[0].values[0][2]
    ) {
      return false
    }
  }
  return true
}

export function validateDuplicatedWalletInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastDataFromDB(pastelDB, tableName)
  if (sqlResult.length && sqlResult[0].values[0]) {
    if (
      validateFields.walletversion === sqlResult[0].values[0][1] &&
      validateFields.balance === sqlResult[0].values[0][2] &&
      validateFields.keypoololdest === sqlResult[0].values[0][6] &&
      validateFields.seedfp === sqlResult[0].values[0][9]
    ) {
      return false
    }
  }
  return true
}

export function getLastIdFromDB(pastelDB: Database, tableName: string): number {
  if (tableNames[tableName] !== true) {
    throw new Error(`pastelDB getLastIdFromDB error: ${tableName} is invalid`)
  }

  const sqlText = selectIDQuery + tableName + orderByIDQuery
  const sqlResult = pastelDB.exec(sqlText)
  if (sqlResult.length && sqlResult[0].values[0][0]) {
    return parseInt(sqlResult[0].values[0][0].toString()) + 1
  } else {
    return 1
  }
}

export function insertStatisticDataToDB(
  pastelDB: Database,
  hashrate: number,
  difficulty: number,
): void {
  const createTimestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'statisticinfo')
  const values = {
    $newId: newId,
    $hashrate: hashrate,
    $difficulty: difficulty,
    $createTimestamp: createTimestamp,
  }
  pastelDB.exec(insertStatisticinfoQuery, values)
}

export function getDatasFromDB(
  pastelDB: Database,
  tableName: string,
): QueryExecResult[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getDatasFromDB error: ${tableName} is invalid table name`,
    )
  }

  const sqlText = selectAllQuery + tableName
  const sqlResult = pastelDB.exec(sqlText)
  return sqlResult
}

export function getFilteredDataFromDBByPeriod(
  pastelDB: Database,
  tableName: string,
  granularity: string,
  period: string,
): QueryExecResult[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getFilteredDataFromDBByPeriod error: ${tableName} is invalid table name`,
    )
  }

  let duration = 0
  let sqlText = ''

  let whereSqlText = ' '
  if (period !== 'all') {
    if (period === '30d') {
      duration = 30 * 24
    } else if (period === '180d') {
      duration = 180 * 24
    } else if (period === '1y') {
      duration = 360 * 24
    }
    const time_stamp = Date.now() - duration * 60 * 60 * 1000
    whereSqlText = ` where create_timestamp > ${time_stamp} `
  }

  switch (granularity) {
    case '1d':
      sqlText = averageFilterByDailyPeriodQuery + whereSqlText + groupbyDaily
      break
    case '30d':
      sqlText =
        averageFilterByMonthlyPeriodQuery + whereSqlText + groupByMonthly
      break
    case '1y':
      sqlText = averageFilterByYearlyPeriodQuery + whereSqlText + groupByYearly
      break
    case 'all':
      sqlText = selectAllQuery + tableName
      break
  }
  const sqlResult = pastelDB.exec(sqlText)
  return sqlResult
}

export function getTransactionsDataFromDBByPeriod(
  pastelDB: Database,
  tableName: string,
  period: string,
): QueryExecResult[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getTransactionsDataFromDBByPeriod error: ${tableName} is invalid table name`,
    )
  }

  let duration = 0
  let sqlText = ''

  let whereSqlText = ' '
  if (period !== 'all') {
    if (period === '30d') {
      duration = 30 * 24
    } else if (period === '180d') {
      duration = 180 * 24
    } else if (period === '1y') {
      duration = 360 * 24
    }
    const time_stamp = Date.now() - duration * 60 * 60 * 1000
    whereSqlText = ` where create_timestamp > ${time_stamp} `
  }
  sqlText = countIdByDailyPeriodQuery + tableName + whereSqlText + groupbyDaily

  const sqlResult = pastelDB.exec(sqlText)
  return sqlResult
}

export function insertNetworkInfoToDB(
  pastelDB: Database,
  networkinfo: TNetworkInfo,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'networkinfo')
  const networks = JSON.stringify(networkinfo.networks)
  const localaddresses = JSON.stringify(networkinfo.localaddresses)
  const values = {
    $newId: newId,
    $version: networkinfo.version,
    $subversion: networkinfo.subversion,
    $protocolversion: networkinfo.protocolversion,
    $localservices: networkinfo.localservices,
    $timeoffset: networkinfo.timeoffset,
    $connections: networkinfo.connections,
    $networks: networks,
    $relayfee: networkinfo.relayfee,
    $localaddresses: localaddresses,
    $warnings: networkinfo.warnings,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertNetworkinfoQuery, values)
}

export function insertNetTotalsToDB(
  pastelDB: Database,
  nettotals: TNetTotal,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'nettotals')
  const values = {
    $newId: newId,
    $totalbytesrecv: nettotals.totalbytesrecv,
    $totalbytessent: nettotals.totalbytessent,
    $timemillis: nettotals.timemillis,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertNettotalsQuery, values)
}

export function insertMempoolInfoToDB(
  pastelDB: Database,
  mempoolinfo: TMempoolInfo,
): void {
  const createTimestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'mempoolinfo')
  const values = {
    $newId: newId,
    $size: mempoolinfo.size,
    $bytes: mempoolinfo.bytes,
    $usage: mempoolinfo.usage,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertMempoolinfoQuery, values)
}

export function insertRawMempoolinfoToDB(
  pastelDB: Database,
  mempoolinfo: TRawMempool,
): void {
  if (
    !validateDataFromDB(pastelDB, 'rawmempoolinfo', {
      transactionid: mempoolinfo.transactionid,
      time: mempoolinfo.time,
    })
  ) {
    // mempoolinfo already exist on db.
    return
  }

  const createTimestamp: number = +new Date()
  const newId = getLastIdFromDB(pastelDB, 'rawmempoolinfo')
  const depends = JSON.stringify(mempoolinfo.depends)
  const values = {
    $newId: newId,
    $transactionid: mempoolinfo.transactionid,
    $size: mempoolinfo.size,
    $fee: mempoolinfo.fee,
    $time: mempoolinfo.time,
    $height: mempoolinfo.height,
    $startingpriority: mempoolinfo.startingpriority,
    $currentpriority: mempoolinfo.currentpriority,
    $depends: depends,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertRawmempoolinfoQuery, values)
}

export function insertMiningInfoToDB(
  pastelDB: Database,
  mininginfo: TMiningInfo,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'mininginfo')
  const generate = mininginfo.generate ? mininginfo.generate?.toString() : ''
  const values = {
    $newId: newId,
    $blocks: mininginfo.blocks,
    $currentblocksize: mininginfo.currentblocksize,
    $currentblocktx: mininginfo.currentblocktx,
    $difficulty: mininginfo.difficulty,
    $errors: mininginfo.errors,
    $genproclimit: mininginfo.genproclimit,
    $localsolps: mininginfo.localsolps,
    $networksolps: mininginfo.networksolps,
    $networkhashps: mininginfo.networkhashps,
    $pooledtx: mininginfo.pooledtx,
    $testnet: mininginfo.testnet,
    $chain: mininginfo.chain,
    $generate: generate,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertMininginfoQuery, values)
}

export function insertBlockInfoToDB(
  pastelDB: Database,
  blockInfo: TBlock,
): void {
  if (
    validateDataFromDB(pastelDB, 'blockinfo', {
      hash: blockInfo.hash,
    })
  ) {
    const createTimestamp = Date.now()
    const newId = getLastIdFromDB(pastelDB, 'blockinfo')
    const valuePools = JSON.stringify(blockInfo.valuePools)
    const txs = JSON.stringify(blockInfo.tx)
    const values = {
      $newId: newId,
      $hash: blockInfo.hash,
      $confirmations: blockInfo.confirmations,
      $size: blockInfo.size,
      $height: blockInfo.height,
      $version: blockInfo.version,
      $merkleroot: blockInfo.merkleroot,
      $finalsaplingroot: blockInfo.finalsaplingroot,
      $tx: txs,
      $time: blockInfo.time,
      $nonce: blockInfo.nonce,
      $solution: blockInfo.solution,
      $bits: blockInfo.bits,
      $difficulty: blockInfo.difficulty,
      $chainwork: blockInfo.chainwork,
      $anchor: blockInfo.anchor,
      $valuePools: valuePools,
      $previousblockhash: blockInfo.previousblockhash,
      $nextblockhash: blockInfo.nextblockhash ? blockInfo.nextblockhash : '',
      $createTimestamp: createTimestamp,
    }
    pastelDB.exec(insertBlockinfoQuery, values)
  }
}

export function insertRawtransaction(
  pastelDB: Database,
  rawtransaction: TRawTransaction,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'rawtransaction')
  const overwintered = rawtransaction.overwintered
    ? rawtransaction.overwintered.toString()
    : ''
  const vin = JSON.stringify(rawtransaction.vin)
  const vout = JSON.stringify(rawtransaction.vout)
  const vjoinsplit = JSON.stringify(rawtransaction.vjoinsplit)
  const values = {
    $newId: newId,
    $hex: rawtransaction.hex,
    $txid: rawtransaction.txid,
    $overwintered: overwintered,
    $version: rawtransaction?.version,
    $versiongroupid: rawtransaction?.versiongroupid || '',
    $locktime: rawtransaction?.locktime,
    $expiryheight: rawtransaction?.expiryheight || 0,
    $vin: vin,
    $vout: vout,
    $vjoinsplit: vjoinsplit,
    $blockhash: rawtransaction.blockhash,
    $confirmations: rawtransaction.confirmations,
    $time: rawtransaction.time,
    $blocktime: rawtransaction.blocktime,
    $createTimestamp: createTimestamp,
  }
  pastelDB.exec(insertRawtransactionQuery, values)
}

export const insertTransaction = (
  pastelDB: Database,
  transactionInfo: TTransactionInfo,
): void => {
  const createTimestamp: string = new Date().toLocaleTimeString()
  const newId = getLastIdFromDB(pastelDB, 'transaction_tbl')
  const details = JSON.stringify(transactionInfo.details)
  const vjoinsplit = JSON.stringify(transactionInfo.vjoinsplit)
  const walletconflicts = JSON.stringify(transactionInfo.walletconflicts)
  const values = {
    $newId: newId,
    $amount: transactionInfo.amount,
    $blockhash: transactionInfo.blockhash,
    $blockindex: transactionInfo.blockindex,
    $blocktime: transactionInfo.blocktime,
    $confirmations: transactionInfo.confirmations,
    $details: details,
    $expiryheight: transactionInfo.expiryheight,
    $hex: transactionInfo.hex,
    $time: transactionInfo.time,
    $timereceived: transactionInfo.timereceived,
    $txid: transactionInfo.txid,
    $vjoinsplit: vjoinsplit,
    $walletconflicts: walletconflicts,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertTransactionTableQuery, values)
}

export function insertTxoutsetinfo(
  pastelDB: Database,
  txoutsetinfo: TTxoutsetInfo,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'txoutsetinfo')
  const values = {
    $newId: newId,
    $height: txoutsetinfo.height,
    $bestblock: txoutsetinfo.bestblock,
    $transactions: txoutsetinfo.transactions,
    $txouts: txoutsetinfo.txouts,
    $bytes_serialized: txoutsetinfo.bytes_serialized,
    $hash_serialized: txoutsetinfo.hash_serialized,
    $total_amount: txoutsetinfo.total_amount,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertTxoutsetinfoQuery, values)
}

export function insertChaintips(
  pastelDB: Database,
  chaintips: TChainTips,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'chaintips')
  const values = {
    $newId: newId,
    $height: chaintips.height,
    $hash: chaintips.hash,
    $branchlen: chaintips.branchlen,
    $status: chaintips.status,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertChaintipsQuery, values)
}

export function insertBlocksubsidy(
  pastelDB: Database,
  blocksubsidy: TBlockSubsidy,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'blocksubsidy')
  const values = {
    $newId: newId,
    $miner: blocksubsidy.miner,
    $masternode: blocksubsidy.masternode,
    $governance: blocksubsidy.governance,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertBlocksubsidyQuery, values)
}

export function insertWalletinfo(
  pastelDB: Database,
  walletinfo: TWalletInfo,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'walletinfo')
  const values = {
    $newId: newId,
    $walletversion: walletinfo.walletversion,
    $balance: walletinfo.balance,
    $unconfirmed_balance: walletinfo.unconfirmed_balance,
    $immature_balance: walletinfo.immature_balance,
    $txcount: walletinfo.txcount,
    $keypoololdest: walletinfo.keypoololdest,
    $keypoolsize: walletinfo.keypoolsize,
    $paytxfee: walletinfo.paytxfee,
    $seedfp: walletinfo.seedfp,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertWalletinfoQuery, values)
}

export function insertListTransactions(
  pastelDB: Database,
  listtransactions: TTransaction,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'listtransactions')
  const walletconflicts = JSON.stringify(listtransactions.walletconflicts)
  const vjoinsplit = JSON.stringify(listtransactions.vjoinsplit)
  const values = {
    $newId: newId,
    $account: listtransactions.account,
    $address: listtransactions.address,
    $category: listtransactions.category,
    $amount: listtransactions.amount,
    $vout: listtransactions.vout,
    $confirmations: listtransactions.confirmations,
    $blockhash: listtransactions.blockhash,
    $blockindex: listtransactions.blockindex,
    $blocktime: listtransactions.blocktime,
    $expiryheight: listtransactions.expiryheight,
    $txid: listtransactions.txid,
    $walletconflicts: walletconflicts,
    $time: listtransactions.time,
    $timereceived: listtransactions.timereceived,
    $vjoinsplit: vjoinsplit,
    $size: listtransactions.size,
    $lastblock: listtransactions.lastblock,
    $createTimestamp: createTimestamp,
  }

  pastelDB.exec(insertListtransactionsQuery, values)
}

export function insertListunspent(
  pastelDB: Database,
  listunspent: TListUnspent,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'listunspent')

  const generated = listunspent?.generated?.toString()
  const values = {
    $newId: newId,
    $txid: listunspent.txid,
    $vout: listunspent.vout,
    $generated: generated,
    $address: listunspent.address,
    $account: listunspent?.account || '',
    $scriptPubKey: listunspent.scriptPubKey,
    $amount: listunspent.amount,
    $confirmations: listunspent.confirmations,
    $spendable: listunspent.spendable,
    $createTimestamp: createTimestamp,
  }
  pastelDB.exec(insertListunspentQuery, values)
}

export function insertTotalbalance(
  pastelDB: Database,
  totalBalance: TTotalBalance,
): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'totalbalance')
  const values = {
    $newId: newId,
    $transparent: totalBalance.transparent,
    $private: totalBalance.private,
    $total: totalBalance.total,
    $createTimestamp: createTimestamp,
  }
  pastelDB.exec(insertTotalbalanceQuery, values)
}

export function insertListaddresses(pastelDB: Database, address: string): void {
  const createTimestamp = Date.now()
  const newId = getLastIdFromDB(pastelDB, 'listaddresses')
  const values = {
    $newId: newId,
    $address: address,
    $createTimestamp: createTimestamp,
  }
  pastelDB.exec(insertListaddressesQuery, values)
}

export function insertPastelPrice(pastelDB: Database, price: number): void {
  const createTimestamp = Date.now()
  if (validateDataFromDB(pastelDB, 'pslprice', { price: price })) {
    const newId = getLastIdFromDB(pastelDB, 'pslprice')
    const values = {
      $newId: newId,
      $priceUsd: price,
      $createTimestamp: createTimestamp,
    }
    pastelDB.exec(insertPastelPriceInfoQuery, values)
  }
}

export function insertBlockChainInfo(
  pastelDB: Database,
  blockChainInfo: TBlockChainInfo,
): void {
  const createTimestamp = Date.now()
  if (
    validateDataFromDB(pastelDB, 'blockchaininfo', {
      bestBlockHash: blockChainInfo.bestblockhash,
    })
  ) {
    const newId = getLastIdFromDB(pastelDB, 'blockchaininfo')
    const consensus = JSON.stringify(blockChainInfo.consensus)
    const softforks = JSON.stringify(blockChainInfo.softforks)
    const upgrades = JSON.stringify(blockChainInfo.upgrades)
    const valuePools = JSON.stringify(blockChainInfo.valuePools)
    const pruned = JSON.stringify(blockChainInfo.pruned)
    const values = {
      $newId: newId,
      $bestblockhash: blockChainInfo.bestblockhash,
      $blocks: blockChainInfo.blocks,
      $chain: blockChainInfo.chain,
      $chainwork: blockChainInfo.chainwork,
      $commitments: blockChainInfo.commitments,
      $consensus: consensus,
      $difficulty: blockChainInfo.difficulty,
      $headers: blockChainInfo.headers,
      $pruned: pruned,
      $softforks: softforks,
      $upgrades: upgrades,
      $valuePools: valuePools,
      $verificationprogress: blockChainInfo.verificationprogress,
      $createTimestamp: createTimestamp,
    }
    pastelDB.exec(insertBlockChainInfoQuery, values)
  }
}
