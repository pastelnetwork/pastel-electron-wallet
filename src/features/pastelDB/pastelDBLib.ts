import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import initSqlJs, { Database } from 'sql.js'

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

export const createDatabase = async (): Promise<Database> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      return `/static/bin/${file}`
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
