import { ipcRenderer, remote } from 'electron'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Database } from 'sql.js'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import {
  createDatabase,
  createPastelDB,
  saveDataToLocalSqlite,
} from '../../features/pastelDB'
import { pastelDBSelector } from '../../features/pastelDB/pastelDBSlice'
import Routes from '../Routes'

const Root = (): JSX.Element => {
  const dispatch = useDispatch()
  const pastelDBState = useSelector(pastelDBSelector)
  const [isCreateDB, setIsCreateDB] = useState(false)

  useEffect(() => {
    const useCallBackCreateDatabase = async () => {
      try {
        const newdb: Database = await createDatabase()
        dispatch(createPastelDB(newdb))
        sessionStorage.setItem('pastelDB', JSON.stringify(newdb))
        setIsCreateDB(true)
      } catch (error) {
        throw new Error(`Create Database error: ${error.message}`)
      }
    }

    const saveVirtualDatabasetoSqlite = async () => {
      try {
        await saveDataToLocalSqlite(pastelDBState.pastelDB)
      } catch (error) {
        throw new Error(`Save Database error: ${error.message}`)
      }
    }

    if (!isCreateDB) {
      useCallBackCreateDatabase()
      saveVirtualDatabasetoSqlite()
    }
  }, [])

  return (
    <>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
      <ReduxErrorModal />
    </>
  )
}

export default Root
