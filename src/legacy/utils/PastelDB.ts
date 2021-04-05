export const getLastIdFromDB = (pastelDBState: any): number => {
  const sqlText = 'SELECT id FROM  StatisticTable';
  const sqlResult = pastelDBState.pastelDB.exec(sqlText);
  console.log("stored id array...", sqlResult);
  if (sqlResult.length) {
    return sqlResult[0].values.length;
  } else {
    return 0;
  }
}

export const insertStatisticDataToDB = (pastelDBState: any, newId: number, hashrate: string, block: string, difficulty: string) => {
  const create_timestamp: string = new Date().toLocaleTimeString();
  const sqlText = `INSERT INTO StatisticTable
    (id, hashrate, miner_distribution, difficulty, create_timestamp) VALUES
    (${newId}, "${hashrate}", "", "${difficulty}", "${create_timestamp}")`;
    console.log("query string...", sqlText);
  pastelDBState.pastelDB.exec(sqlText);
}

export const getStatisticDatasFromDB = (pastelDBState: any) => {
  const sqlText = `SELECT * FROM StatisticTable`;
  const sqlResult = pastelDBState.pastelDB.exec(sqlText);
  return sqlResult;
}
