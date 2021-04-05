import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import Routes from '../Routes'
import { createPastelDB } from '../../redux/modules/pastelDB';
const initSqlJs = require('sql.js');

const Root = (): JSX.Element => { 
  const dispatch = useDispatch();
  const [db, setDB] = useState<any>();
  const [isCreateDB, setIsCreateDB] = useState(false);
  const [err, setError] = useState();
  
  useEffect(() => {
    const createDatabase = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file: any) => {
            return `static/bin/${file}`;
          }
        })
        const newdb = new SQL.Database();
        //TODO: should remove (update the db)
        let sqlText = `CREATE TABLE StatisticTable (
          id int NOT NULL,
          hashrate VARCHAR(255),
          miner_distribution VARCHAR(255),
          difficulty VARCHAR(255),
          create_timestamp VARCHAR(255)
        )`;
        newdb.exec(sqlText);
        
        setDB(newdb);
        setIsCreateDB(true);
        dispatch(createPastelDB(newdb))
        sessionStorage.setItem('pastelDB', JSON.stringify(newdb));
      } catch (error) {
        console.error("Error: Craete Database!!!", error)
        setError(err);
      }
    }
    if(!isCreateDB) {
      createDatabase();
    }
  }, []);

  return(
    <>
      <Router>
        <Routes />
      </Router>
      <ReduxErrorModal />
    </>
  )
}

export default Root
