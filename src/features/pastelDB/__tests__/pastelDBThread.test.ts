import initSqlJs, { Database, QueryExecResult } from 'sql.js'

import {
  exportSqliteDB,
  getDatasFromDB,
  insertBlockInfoToDB,
  insertBlocksubsidy,
  insertChaintips,
  insertListaddresses,
  insertListTransactions,
  insertListunspent,
  insertMempoolinfoToDB,
  insertMiningInfoToDB,
  insertNetTotalsToDB,
  insertNetworkInfotoDB,
  insertRawMempoolinfoToDB,
  insertRawtransaction,
  insertStatisticDataToDB,
  insertTotalbalance,
  insertTransaction,
  insertTxoutsetinfo,
  insertWalletinfo,
} from '../pastelDBLib'

describe('PastelDBThread', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const getstatisticinfo = jest.fn(() => {
    return {
      difficult: 1.0,
      hashrate: 1.2345,
    }
  })

  test('statistic data should fetch and store correctly', async () => {
    const SQL = await initSqlJs()
    const db: Database = new SQL.Database()
    const info = getstatisticinfo()
    // const result = insertStatisticDataToDB(db, info.hashrate, info.difficult)
    // expect(result).not.toBeNull()
  })
})
