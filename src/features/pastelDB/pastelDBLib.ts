import { QueryExecResult } from 'sql.js'

import { IPastelDBState } from './pastelDBSlice'

export const getLastIdFromDB = (pastelDBState: IPastelDBState): number => {
  const sqlText = 'SELECT id FROM  StatisticTable'
  const sqlResult = pastelDBState.pastelDB.exec(sqlText)
  if (sqlResult.length) {
    return sqlResult[0].values.length
  } else {
    return 0
  }
}

export const insertStatisticDataToDB = (
  pastelDBState: IPastelDBState,
  newId: number,
  hashrate: string,
  difficulty: string,
): void => {
  const create_timestamp: string = new Date().toLocaleTimeString()
  const sqlText = `INSERT INTO StatisticTable
      (id, hashrate, miner_distribution, difficulty, create_timestamp) VALUES
      (${newId}, '${hashrate}', '', '${difficulty}', '${create_timestamp}')`
  console.log('query string...', sqlText)
  pastelDBState.pastelDB.exec(sqlText)
}

export const getStatisticDatasFromDB = (
  pastelDBState: IPastelDBState,
): QueryExecResult[] => {
  const sqlText = 'SELECT * FROM StatisticTable'
  const sqlResult = pastelDBState.pastelDB.exec(sqlText)
  return sqlResult
}
