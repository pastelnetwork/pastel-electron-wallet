import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { pastelIDReducer } from '../features/pastelID'
import { errorModalReducer } from '../features/errorModal'
import { pastelConfReducer } from '../features/pastelConf'

const store = configureStore({
  reducer: {
    pastelID: pastelIDReducer,
    errorModal: errorModalReducer,
    pastelConf: pastelConfReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {pastelID: PastelIDState, errorModal: IErrorModalState, ...}
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
