import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Database } from 'sql.js'

import type { AppDispatch, AppThunk, RootState } from '../../redux/store'
import { openErrorModal } from '../errorModal'

export interface TPastelDBState {
  pastelDB: Database
  isCreated: boolean
}
// Define the initial state using that type
const initialState: TPastelDBState = {
  pastelDB: {} as Database,
  isCreated: false,
}

export const pastelDBSlice = createSlice({
  name: 'pastelDB',
  initialState,
  reducers: {
    createPastelDBAction(
      state: TPastelDBState,
      action: PayloadAction<Database>,
    ) {
      state.pastelDB = action.payload
      state.isCreated = true
    },
  },
})

const { createPastelDBAction } = pastelDBSlice.actions

export const pastelDBReducer = pastelDBSlice.reducer

export function createPastelDB(db: Database): AppThunk {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(createPastelDBAction(db))
    } catch (err) {
      dispatch(
        openErrorModal({
          title: 'Can not create new Pastel ID',
          body:
            "We cound't create a new Pastel ID for some reason. Please restart the wallet and try again.",
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(err)
    }
  }
}

export const pastelDBSelector = (state: RootState): TPastelDBState =>
  state.pastelDB
