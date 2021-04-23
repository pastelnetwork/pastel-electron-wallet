import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Database } from 'sql.js'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import {
  createDatabase,
  createPastelDB,
  saveDataToLocalSqlite,
} from '../../features/pastelDB'
import Routes from '../Routes'

const Root = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isCreateDB, setIsCreateDB] = useState(false)

  useEffect(() => {
    let newdb: Database
    const useCallBackCreateDatabase = async () => {
      try {
        newdb = await createDatabase()
        dispatch(createPastelDB(newdb))
        setIsCreateDB(true)
      } catch (error) {
        throw new Error(`Create Database error: ${error.message}`)
      }
    }

    if (!isCreateDB) {
      useCallBackCreateDatabase()
    }

    ipcRenderer.on('appquitting', async () => {
      saveDataToLocalSqlite(newdb)
    })
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
