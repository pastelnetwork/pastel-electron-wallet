import SQLite, { Database } from 'better-sqlite3'
import path from 'path'
import {
  TBlock,
  TBlockChainInfo,
  TListUnspent,
  TRawMempool,
  TRawTransaction,
  TTotalBalance,
  TTransactionInfo,
} from 'types/rpc'
import { TMiningInfo } from '../../types/rpc'

import {
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
import { TValidateFields } from './type'
import store from '../../redux/store'
import fs from 'fs'
import log from 'electron-log'
import {
  insertBlockChainInfo,
  TDbBlockChainInfo,
} from './blockchain/blockChainInfo.repo'
import { insertBlockInfo, TDbBlockInfo } from './blockchain/blockInfo.repo'
import { insertPriceInfo, TDbPriceInfo } from './price/priceInfo.repo'
import { insertRawMemPoolInfo } from './blockchain/rawMemPoolInfo.repo'
import { insertMiningInfo } from './mining/miningInfo.repo'
import { insertRawTransaction } from './rawTransaction/rawTransaction.repo'
import { insertTransactionTbl } from './wallet/transactionTbl.repo'
import { insertListUnspent } from './wallet/listUnspent.repo'
import { insertTotalBalance } from './wallet/totalBalance.repo'

const getSqliteFilePath = () => {
  const path = store.getState().appInfo.sqliteFilePath
  if (!path) {
    throw new Error("Can't get SQLite file path")
  }
  return path
}

const getMigrationsPath = () => {
  const path = store.getState().appInfo.migrationsPath
  if (!path) {
    throw new Error("Can't get SQLite file path")
  }
  return path
}

// todo: db should be moved to node process to not block interface
export const createDatabase = async (
  dbPath = getSqliteFilePath(),
  migrationsPath = getMigrationsPath(),
): Promise<Database> => {
  let db = new SQLite(dbPath)
  const migrationsTableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='migrations'",
    )
    .get()

  if (!migrationsTableExists) {
    try {
      const dbFileExists = await fs.promises.stat(dbPath)
      if (dbFileExists) {
        await fs.promises.unlink(dbPath)
      }
    } catch (_) {
      // no file
    }
    db.close()
    db = new SQLite(dbPath)
    db.prepare('CREATE TABLE migrations ( version int )').run()
  }

  const migratedVersions = db
    .prepare('SELECT version FROM migrations')
    .all()
    .map(row => row.version)

  const migrationFiles = await fs.promises.readdir(migrationsPath)
  for (const file of migrationFiles) {
    const version = parseInt(file.split('-')[0])
    if (isNaN(version)) {
      throw new Error(`Incorrect migration file name: ${file}`)
    }

    if (migratedVersions.includes(version)) {
      continue
    }

    const migrationContent = await fs.promises.readFile(
      path.join(migrationsPath, file),
      'utf-8',
    )
    db.prepare(migrationContent).run()
    db.prepare('INSERT INTO migrations (version) VALUES ($version)').run({
      version,
    })
    log.info(`Migration ${file} was applied`)
  }

  return db
}

export function validateDuplicatedRawmempoolInfo(
  pastelDB: Database,
  tableName: string,
  validateFields: TValidateFields,
): boolean {
  if (!tableNames[tableName]) {
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
  if (!tableNames[tableName]) {
    throw new Error(
      `pastelDB validateDuplicatedRawmempoolInfo error: ${tableName} is invalid table name`,
    )
  }

  if (tableName === 'rawMemPoolInfo') {
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
        case 'blockChainInfo':
          if (
            validateFields.bestblockhash ===
            (sqlResult as TDbBlockChainInfo).bestblockhash
          ) {
            return false
          }
          break
        case 'blockInfo':
          if (validateFields.hash === (sqlResult as TDbBlockInfo).hash) {
            return false
          }
          break
        case 'priceInfo':
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
  if (!tableNames[tableName]) {
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
  if (!tableNames[tableName]) {
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
  if (!tableNames[tableName]) {
    throw new Error(`pastelDB getLastIdFromDB error: ${tableName} is invalid`)
  }

  const sqlText = selectIDQuery + tableName + orderByIDQuery
  const sqlResult = <{ id: number }>pastelDB.prepare(sqlText).get()
  return (sqlResult?.id || 0) + 1
}

export function getDatasFromDB<T extends unknown>(
  pastelDB: Database,
  tableName: string,
): T[] {
  if (!tableNames[tableName]) {
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
  if (!tableNames[tableName]) {
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
  if (!tableNames[tableName]) {
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

export function insertRawMempoolinfoToDB(
  pastelDB: Database,
  mempoolinfo: TRawMempool,
): void {
  if (
    !validateDataFromDB(pastelDB, 'rawMemPoolInfo', {
      transactionid: mempoolinfo.transactionid,
      time: mempoolinfo.time,
    })
  ) {
    // mempoolinfo already exist on db.
    return
  }

  insertRawMemPoolInfo(pastelDB, {
    ...mempoolinfo,
    depends: JSON.stringify(mempoolinfo.depends),
  })
}

export function insertMiningInfoToDB(
  pastelDB: Database,
  mininginfo: TMiningInfo,
): void {
  insertMiningInfo(pastelDB, {
    ...mininginfo,
    testnet: mininginfo.testnet ? 1 : 0,
    chain: mininginfo.chain,
    generate: mininginfo.generate ? 1 : 0,
  })
}

export function insertBlockInfoToDB(
  pastelDB: Database,
  blockInfo: TBlock,
): void {
  if (
    validateDataFromDB(pastelDB, 'blockInfo', {
      hash: blockInfo.hash,
    })
  ) {
    insertBlockInfo(pastelDB, {
      ...blockInfo,
      tx: JSON.stringify(blockInfo.tx),
      valuePools: JSON.stringify(blockInfo.valuePools),
      nextblockhash: blockInfo.nextblockhash ? blockInfo.nextblockhash : '',
    })
  }
}

export function insertRawtransaction(
  pastelDB: Database,
  rawtransaction: TRawTransaction,
): void {
  insertRawTransaction(pastelDB, {
    ...rawtransaction,
    overwintered: rawtransaction.overwintered ? 1 : 0,
    versiongroupid: rawtransaction?.versiongroupid || '',
    expiryheight: rawtransaction.expiryheight || 0,
    vin: JSON.stringify(rawtransaction.vin),
    vout: JSON.stringify(rawtransaction.vout),
    vjoinsplit: JSON.stringify(rawtransaction.vjoinsplit),
  })
}

export const insertTransaction = (
  pastelDB: Database,
  transactionInfo: TTransactionInfo,
): void => {
  insertTransactionTbl(pastelDB, {
    ...transactionInfo,
    details: JSON.stringify(transactionInfo.details),
    vjoinsplit: JSON.stringify(transactionInfo.vjoinsplit),
    walletconflicts: JSON.stringify(transactionInfo.walletconflicts),
  })
}

export function insertListunspent(
  pastelDB: Database,
  listunspent: TListUnspent,
): void {
  insertListUnspent(pastelDB, {
    ...listunspent,
    account: listunspent.account || '',
    generated: listunspent.generated ? 1 : 0,
  })
}

export function insertTotalbalance(
  pastelDB: Database,
  totalBalance: TTotalBalance,
): void {
  insertTotalBalance(pastelDB, {
    transparent: String(totalBalance.transparent),
    private: String(totalBalance.private),
    total: String(totalBalance.total),
  })
}

export function insertPastelPrice(pastelDB: Database, priceUsd: number): void {
  if (validateDataFromDB(pastelDB, 'priceInfo', { priceUsd })) {
    insertPriceInfo(pastelDB, { priceUsd })
  }
}

export function insertBlockChainInfoToDb(
  pastelDB: Database,
  blockChainInfo: TBlockChainInfo,
): void {
  if (
    validateDataFromDB(pastelDB, 'blockChainInfo', {
      bestblockhash: blockChainInfo.bestblockhash,
    })
  ) {
    insertBlockChainInfo(pastelDB, {
      ...blockChainInfo,
      consensus: JSON.stringify(blockChainInfo.consensus),
      softforks: JSON.stringify(blockChainInfo.softforks),
      upgrades: JSON.stringify(blockChainInfo.upgrades),
      valuePools: JSON.stringify(blockChainInfo.valuePools),
      pruned: blockChainInfo.pruned ? 1 : 0,
    })
  }
}
