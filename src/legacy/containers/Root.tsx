import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import initSqlJs, { Database } from 'sql.js'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import { createPastelDB } from '../../features/pastelDB'
import Routes from '../Routes'

const Root = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isCreateDB, setIsCreateDB] = useState(false)
  const [err, setError] = useState()

  useEffect(() => {
    const createDatabase = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file: string) => {
            return `static/bin/${file}`
          },
        })
        const newdb: Database = new SQL.Database()
        //TODO: should remove (update the db)
        const sqlText = `CREATE TABLE StatisticTable (
          id int NOT NULL,
          hashrate VARCHAR(255),
          miner_distribution VARCHAR(255),
          difficulty VARCHAR(255),
          create_timestamp VARCHAR(255)
        )`
        newdb.exec(sqlText)

        setIsCreateDB(true)
        dispatch(createPastelDB(newdb))
        sessionStorage.setItem('pastelDB', JSON.stringify(newdb))
      } catch (error) {
        console.error('Error: Craete Database!!!', error)
        setError(err)
      }
    }
    if (!isCreateDB) {
      createDatabase()
    }
  }, [])

  return (
    <>
      <Router>
        <Routes />
      </Router>
      <ReduxErrorModal />
    </>
  )
}

export default Root
