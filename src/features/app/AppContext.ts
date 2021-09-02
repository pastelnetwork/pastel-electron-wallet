import { createContext, useContext } from 'react'
import { Database } from 'sql.js'

export type TAppContextValues = {
  db: Database
}

export const AppContext = createContext({} as TAppContextValues)

export const useAppContext = (): TAppContextValues => useContext(AppContext)

export const useDb = (): Database => useAppContext().db
