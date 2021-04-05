import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, AppDispatch, RootState } from '../../store'
import { openErrorModal } from '../../../features/errorModal'

interface IPastelDBState {
  pastelDB: any;
  isCreated: boolean
}
// Define the initial state using that type
const initialState: IPastelDBState = {
  pastelDB: {},
  isCreated: false,
}

export const pastelDBSlice = createSlice({
  name: 'pastelDB',
  initialState,
  reducers: {
    createPastelDBAction(
      state: IPastelDBState,
      action: PayloadAction<any>,
    ) {
      state.pastelDB = action.payload;
      state.isCreated = true
    }
  },
})

const {
  createPastelDBAction
} = pastelDBSlice.actions

export const pastelDBReducer = pastelDBSlice.reducer

export function createPastelDB(
  db: any
): AppThunk {
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

export const pastelDBSelector = (state: RootState) => state.pastelDB