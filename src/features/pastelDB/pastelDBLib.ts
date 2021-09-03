import SQLite, { Database } from 'better-sqlite3'
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
  TTransactionInfo,
  TWalletInfo,
} from 'types/rpc'
import { TMiningInfo } from '../../types/rpc'

import {
  createBlock,
  createBlockChainInfo,
  createBlocksubsidy,
  createChaintips,
  createListaddresses,
  createListreceivedbyaddress,
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
  TDbBlockChainInfo,
  TDbBlockInfo,
  TDbPriceInfo,
} from './constants'
import { TTxoutsetInfo, TValidateFields } from './type'
import store from '../../redux/store'
import { createListTransactions } from './wallet/listTransaction.repo'

const getSqliteFilePath = () => {
  const path = store.getState().appInfo.sqliteFilePath
  if (!path) {
    throw new Error("Can't get SQLite file path")
  }
  return path
}

// todo: db should be moved to node process to not block interface
export const createDatabase = async (): Promise<Database> => {
  const db = new SQLite(getSqliteFilePath())
  await createTables(db)
  return db
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
  createListTransactions(db)
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
    tid: validateFields.transactionid,
    time: validateFields.time,
  }
  const sqlResult = pastelDB.prepare(sqlText).get(values)
  return !sqlResult
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

  if (tableName === 'rawmempoolinfo') {
    const sqlText = selectIDQuery + tableName + whereTransactionIDMatchingQuery
    const values = {
      tid: validateFields.transactionid,
      time: validateFields.time,
    }
    const sqlResult = pastelDB.prepare(sqlText).get(values)
    return !sqlResult
  } else {
    const sqlText = selectAllQuery + tableName + orderByIDQuery
    const sqlResult = pastelDB.prepare(sqlText).get()
    if (sqlResult) {
      switch (tableName) {
        case 'blockchaininfo':
          if (
            validateFields.bestblockhash ===
            (sqlResult as TDbBlockChainInfo).bestblockhash
          ) {
            return false
          }
          break
        case 'blockinfo':
          if (validateFields.hash === (sqlResult as TDbBlockInfo).hash) {
            return false
          }
          break
        case 'pslprice':
          if (
            validateFields.priceUsd === (sqlResult as TDbPriceInfo).priceUsd
          ) {
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
): unknown[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getLastDataFromDB error: ${tableName} is invalid table name`,
    )
  }

  return pastelDB.prepare(selectAllQuery + tableName + orderByIDQuery).all()
}

export function getLastRowFromDB<T = unknown>(
  pastelDB: Database,
  tableName: string,
): T {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getLastDataFromDB error: ${tableName} is invalid table name`,
    )
  }

  return pastelDB.prepare(selectAllQuery + tableName + orderByIDQuery).get()
}

export function validateDuplicatedBlockchainInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ bestblockhash: string }>(
    pastelDB,
    tableName,
  )
  return !(
    sqlResult && validateFields.bestblockhash === sqlResult.bestblockhash
  )
}

export function validateDuplicatedBlockInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ hash: string }>(pastelDB, tableName)
  return !(sqlResult && validateFields.hash === sqlResult.hash)
}

export function validateDuplicatedBlocksubsidy(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ miner: number; masternode: number }>(
    pastelDB,
    tableName,
  )
  return !(
    sqlResult &&
    validateFields.miner === sqlResult.miner &&
    validateFields.masternode === sqlResult.masternode
  )
}

export function validateDuplicatedPriceInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ priceUsd: number }>(pastelDB, tableName)
  return !(sqlResult && validateFields.priceUsd === sqlResult.priceUsd)
}

export function validateDuplicatedMempoolInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{
    size: number
    bytes: number
    usage: number
  }>(pastelDB, tableName)

  return !(
    sqlResult &&
    validateFields.size === sqlResult.size &&
    validateFields.bytes === sqlResult.bytes &&
    validateFields.usage === sqlResult.usage
  )
}

export function validateDuplicatedMiningInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ blocks: number }>(pastelDB, tableName)
  return !(sqlResult && validateFields.blocks === sqlResult.blocks)
}

export function validateDuplicatedStatisticInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{ solutions: number; difficulty: number }>(
    pastelDB,
    tableName,
  )
  return !(
    sqlResult &&
    validateFields.solutions === sqlResult.solutions &&
    validateFields.difficulty === sqlResult.difficulty
  )
}

export function validateDuplicatedTotalbalance(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{
    transparent: string
    total: string
  }>(pastelDB, tableName)
  return !(
    sqlResult &&
    validateFields.transparent === sqlResult.transparent &&
    validateFields.total === sqlResult.total
  )
}

export function validateDuplicatedTxoutsetInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{
    height: number
    bestblock: string
  }>(pastelDB, tableName)
  return !(
    sqlResult &&
    validateFields.height === sqlResult.height &&
    validateFields.bestblock === sqlResult.bestblock
  )
}

export function validateDuplicatedWalletInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  const sqlResult = getLastRowFromDB<{
    walletversion: number
    balance: number
    keypoololdest: number
    seedfp: string
  }>(pastelDB, tableName)
  return !(
    sqlResult &&
    validateFields.walletversion === sqlResult.walletversion &&
    validateFields.balance === sqlResult.balance &&
    validateFields.keypoololdest === sqlResult.keypoololdest &&
    validateFields.seedfp === sqlResult.seedfp
  )
}

export function getLastIdFromDB(pastelDB: Database, tableName: string): number {
  if (tableNames[tableName] !== true) {
    throw new Error(`pastelDB getLastIdFromDB error: ${tableName} is invalid`)
  }

  const sqlText = selectIDQuery + tableName + orderByIDQuery
  const sqlResult = <{ id: number }>pastelDB.prepare(sqlText).get()
  return (sqlResult?.id || 0) + 1
}

export function insertStatisticDataToDB(
  pastelDB: Database,
  solutions: number,
  difficulty: number,
): void {
  const createdAt: number = +new Date()
  const values = {
    solutions: solutions,
    difficulty: difficulty,
    createdAt: createdAt,
  }
  pastelDB.prepare(insertStatisticinfoQuery).run(values)
}

export function getDatasFromDB<T extends unknown>(
  pastelDB: Database,
  tableName: string,
): T[] {
  if (tableNames[tableName] !== true) {
    throw new Error(
      `pastelDB getDatasFromDB error: ${tableName} is invalid table name`,
    )
  }

  const sqlText = selectAllQuery + tableName
  return pastelDB.prepare(sqlText).all(sqlText)
}

export function getFilteredDataFromDBByPeriod(
  pastelDB: Database,
  tableName: string,
  granularity: string,
  period: string,
): { date: string; averageSize: number }[] {
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
    whereSqlText = ` where createdAt > ${time_stamp} `
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
  return pastelDB.prepare(sqlText).all()
}

export function getTransactionsDataFromDBByPeriod(
  pastelDB: Database,
  tableName: string,
  period: string,
): { date: string; count: number }[] {
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
    whereSqlText = ` where createdAt > ${time_stamp} `
  }
  sqlText = countIdByDailyPeriodQuery + tableName + whereSqlText + groupbyDaily

  return pastelDB.prepare(sqlText).all()
}

export function insertNetworkInfoToDB(
  pastelDB: Database,
  networkinfo: TNetworkInfo,
): void {
  const createdAt = Date.now()
  const networks = JSON.stringify(networkinfo.networks)
  const localaddresses = JSON.stringify(networkinfo.localaddresses)
  const values = {
    version: networkinfo.version,
    subversion: networkinfo.subversion,
    protocolversion: networkinfo.protocolversion,
    localservices: networkinfo.localservices,
    timeoffset: networkinfo.timeoffset,
    connections: networkinfo.connections,
    networks: networks,
    relayfee: networkinfo.relayfee,
    localaddresses: localaddresses,
    warnings: networkinfo.warnings,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertNetworkinfoQuery).run(values)
}

export function insertNetTotalsToDB(
  pastelDB: Database,
  nettotals: TNetTotal,
): void {
  const createdAt = Date.now()
  const values = {
    totalbytesrecv: nettotals.totalbytesrecv,
    totalbytessent: nettotals.totalbytessent,
    timemillis: nettotals.timemillis,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertNettotalsQuery).run(values)
}

export function insertMempoolInfoToDB(
  pastelDB: Database,
  mempoolinfo: TMempoolInfo,
): void {
  const createdAt: number = +new Date()
  const values = {
    size: mempoolinfo.size,
    bytes: mempoolinfo.bytes,
    usage: mempoolinfo.usage,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertMempoolinfoQuery).run(values)
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

  const createdAt: number = +new Date()
  const depends = JSON.stringify(mempoolinfo.depends)
  const values = {
    transactionid: mempoolinfo.transactionid,
    size: mempoolinfo.size,
    fee: mempoolinfo.fee,
    time: mempoolinfo.time,
    height: mempoolinfo.height,
    startingpriority: mempoolinfo.startingpriority,
    currentpriority: mempoolinfo.currentpriority,
    depends: depends,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertRawmempoolinfoQuery).run(values)
}

export function insertMiningInfoToDB(
  pastelDB: Database,
  mininginfo: TMiningInfo,
): void {
  const createdAt = Date.now()
  const generate = mininginfo.generate ? mininginfo.generate?.toString() : ''
  const values = {
    blocks: mininginfo.blocks,
    currentblocksize: mininginfo.currentblocksize,
    currentblocktx: mininginfo.currentblocktx,
    difficulty: mininginfo.difficulty,
    errors: mininginfo.errors,
    genproclimit: mininginfo.genproclimit,
    localsolps: mininginfo.localsolps,
    networksolps: mininginfo.networksolps,
    networkhashps: mininginfo.networkhashps,
    pooledtx: mininginfo.pooledtx || null,
    testnet: mininginfo.testnet ? 1 : 0,
    chain: mininginfo.chain,
    generate: generate,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertMininginfoQuery).run(values)
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
    const createdAt = Date.now()
    const valuePools = JSON.stringify(blockInfo.valuePools)
    const txs = JSON.stringify(blockInfo.tx)
    const values = {
      hash: blockInfo.hash,
      confirmations: blockInfo.confirmations,
      size: blockInfo.size,
      height: blockInfo.height,
      version: blockInfo.version,
      merkleroot: blockInfo.merkleroot,
      finalsaplingroot: blockInfo.finalsaplingroot,
      tx: txs,
      time: blockInfo.time,
      nonce: blockInfo.nonce,
      solution: blockInfo.solution,
      bits: blockInfo.bits,
      difficulty: blockInfo.difficulty,
      chainwork: blockInfo.chainwork,
      anchor: blockInfo.anchor,
      valuePools: valuePools,
      previousblockhash: blockInfo.previousblockhash,
      nextblockhash: blockInfo.nextblockhash ? blockInfo.nextblockhash : '',
      createdAt: createdAt,
    }
    pastelDB.prepare(insertBlockinfoQuery).run(values)
  }
}

export function insertRawtransaction(
  pastelDB: Database,
  rawtransaction: TRawTransaction,
): void {
  const createdAt = Date.now()
  const overwintered = rawtransaction.overwintered
    ? rawtransaction.overwintered.toString()
    : ''
  const vin = JSON.stringify(rawtransaction.vin)
  const vout = JSON.stringify(rawtransaction.vout)
  const vjoinsplit = JSON.stringify(rawtransaction.vjoinsplit)
  const values = {
    hex: rawtransaction.hex,
    txid: rawtransaction.txid,
    overwintered: overwintered,
    version: rawtransaction?.version,
    versiongroupid: rawtransaction?.versiongroupid || '',
    locktime: rawtransaction?.locktime,
    expiryheight: rawtransaction?.expiryheight || 0,
    vin: vin,
    vout: vout,
    vjoinsplit: vjoinsplit,
    blockhash: rawtransaction.blockhash,
    confirmations: rawtransaction.confirmations,
    time: rawtransaction.time,
    blocktime: rawtransaction.blocktime,
    createdAt: createdAt,
  }
  pastelDB.prepare(insertRawtransactionQuery).run(values)
}

export const insertTransaction = (
  pastelDB: Database,
  transactionInfo: TTransactionInfo,
): void => {
  const createdAt: string = new Date().toLocaleTimeString()
  const details = JSON.stringify(transactionInfo.details)
  const vjoinsplit = JSON.stringify(transactionInfo.vjoinsplit)
  const walletconflicts = JSON.stringify(transactionInfo.walletconflicts)
  const values = {
    amount: transactionInfo.amount,
    blockhash: transactionInfo.blockhash,
    blockindex: transactionInfo.blockindex,
    blocktime: transactionInfo.blocktime,
    confirmations: transactionInfo.confirmations,
    details: details,
    expiryheight: transactionInfo.expiryheight,
    hex: transactionInfo.hex,
    time: transactionInfo.time,
    timereceived: transactionInfo.timereceived,
    txid: transactionInfo.txid,
    vjoinsplit: vjoinsplit,
    walletconflicts: walletconflicts,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertTransactionTableQuery).run(values)
}

export function insertTxoutsetinfo(
  pastelDB: Database,
  txoutsetinfo: TTxoutsetInfo,
): void {
  const createdAt = Date.now()
  const values = {
    height: txoutsetinfo.height,
    bestblock: txoutsetinfo.bestblock,
    transactions: txoutsetinfo.transactions,
    txouts: txoutsetinfo.txouts,
    bytes_serialized: txoutsetinfo.bytes_serialized,
    hash_serialized: txoutsetinfo.hash_serialized,
    total_amount: txoutsetinfo.total_amount,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertTxoutsetinfoQuery).run(values)
}

export function insertChaintips(
  pastelDB: Database,
  chaintips: TChainTips,
): void {
  const createdAt = Date.now()
  const values = {
    height: chaintips.height,
    hash: chaintips.hash,
    branchlen: chaintips.branchlen,
    status: chaintips.status,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertChaintipsQuery).run(values)
}

export function insertBlocksubsidy(
  pastelDB: Database,
  blocksubsidy: TBlockSubsidy,
): void {
  const createdAt = Date.now()
  const values = {
    miner: blocksubsidy.miner,
    masternode: blocksubsidy.masternode,
    governance: blocksubsidy.governance,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertBlocksubsidyQuery).run(values)
}

export function insertWalletinfo(
  pastelDB: Database,
  walletinfo: TWalletInfo,
): void {
  const createdAt = Date.now()
  const values = {
    walletversion: walletinfo.walletversion,
    balance: walletinfo.balance,
    unconfirmed_balance: walletinfo.unconfirmed_balance,
    immature_balance: walletinfo.immature_balance,
    txcount: walletinfo.txcount,
    keypoololdest: walletinfo.keypoololdest,
    keypoolsize: walletinfo.keypoolsize,
    paytxfee: walletinfo.paytxfee,
    seedfp: walletinfo.seedfp,
    createdAt: createdAt,
  }

  pastelDB.prepare(insertWalletinfoQuery).run(values)
}

export function insertListunspent(
  pastelDB: Database,
  listunspent: TListUnspent,
): void {
  const createdAt = Date.now()

  const generated = listunspent?.generated?.toString()
  const values = {
    txid: listunspent.txid,
    vout: listunspent.vout,
    generated: generated,
    address: listunspent.address,
    account: listunspent?.account || '',
    scriptPubKey: listunspent.scriptPubKey,
    amount: listunspent.amount,
    confirmations: listunspent.confirmations,
    spendable: listunspent.spendable,
    createdAt: createdAt,
  }
  pastelDB.prepare(insertListunspentQuery).run(values)
}

export function insertTotalbalance(
  pastelDB: Database,
  totalBalance: TTotalBalance,
): void {
  const createdAt = Date.now()
  const values = {
    transparent: totalBalance.transparent,
    private: totalBalance.private,
    total: totalBalance.total,
    createdAt: createdAt,
  }
  pastelDB.prepare(insertTotalbalanceQuery).run(values)
}

export function insertListaddresses(pastelDB: Database, address: string): void {
  const createdAt = Date.now()
  const values = {
    address: address,
    createdAt: createdAt,
  }
  pastelDB.prepare(insertListaddressesQuery).run(values)
}

export function insertPastelPrice(pastelDB: Database, priceUsd: number): void {
  const createdAt = Date.now()
  if (validateDataFromDB(pastelDB, 'pslprice', { priceUsd })) {
    const values = {
      priceUsd,
      createdAt: createdAt,
    }
    pastelDB.prepare(insertPastelPriceInfoQuery).run(values)
  }
}

export function insertBlockChainInfo(
  pastelDB: Database,
  blockChainInfo: TBlockChainInfo,
): void {
  const createdAt = Date.now()
  if (
    validateDataFromDB(pastelDB, 'blockchaininfo', {
      bestblockhash: blockChainInfo.bestblockhash,
    })
  ) {
    const consensus = JSON.stringify(blockChainInfo.consensus)
    const softforks = JSON.stringify(blockChainInfo.softforks)
    const upgrades = JSON.stringify(blockChainInfo.upgrades)
    const valuePools = JSON.stringify(blockChainInfo.valuePools)
    const pruned = JSON.stringify(blockChainInfo.pruned)
    const values = {
      bestblockhash: blockChainInfo.bestblockhash,
      blocks: blockChainInfo.blocks,
      chain: blockChainInfo.chain,
      chainwork: blockChainInfo.chainwork,
      commitments: blockChainInfo.commitments,
      consensus: consensus,
      difficulty: blockChainInfo.difficulty,
      headers: blockChainInfo.headers,
      pruned: pruned,
      softforks: softforks,
      upgrades: upgrades,
      valuePools: valuePools,
      verificationprogress: blockChainInfo.verificationprogress,
      createdAt: createdAt,
    }
    pastelDB.prepare(insertBlockChainInfoQuery).run(values)
  }
}
