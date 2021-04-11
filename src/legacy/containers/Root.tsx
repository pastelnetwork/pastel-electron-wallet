import React, { useEffect, useState } from 'react'
import { MemoryRouter, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Database } from 'sql.js'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import { createDatabase, createPastelDB } from '../../features/pastelDB'
import Routes from '../Routes'

const Root = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isCreateDB, setIsCreateDB] = useState(false)
  const [err, setError] = useState()

  useEffect(() => {
    const useCallBackCreateDatabase = async () => {
      try {
        const newdb: Database = await createDatabase()
        setIsCreateDB(true)
        dispatch(createPastelDB(newdb))
        sessionStorage.setItem('pastelDB', JSON.stringify(newdb))
      } catch (error) {
        console.error('Error: Craete Database - ', error)
        setError(err)
      }
    }
    if (!isCreateDB) {
      useCallBackCreateDatabase()
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
