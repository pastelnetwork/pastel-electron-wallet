import fs from 'fs-extra'
import path from 'path'
import { Database } from 'sql.js'

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

const initSqlJs = require('./sql-wasm.js')

export const createDatabase = async (): Promise<Database> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      return `static/bin/${file}`
    },
  })

  let filebuffer
  try {
    filebuffer = fs.readFileSync(
      path.join(process.env.HOMEPATH as string, './pasteldb.sqlite'),
    )
  } catch (error) {
    const newdb: Database = new SQL.Database()
    await createTables(newdb)
    return newdb
  }
  const newdb: Database = new SQL.Database(filebuffer)
  return newdb
}

export const saveDataToLocalSqlite = async (db: Database): Promise<void> => {
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(
    path.join(process.env.HOMEPATH as string, './pasteldb.sqlite'),
    buffer,
    { flag: 'a+' },
  )
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
