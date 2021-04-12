import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { errorModalReducer } from '../features/errorModal'
import { pastelConfReducer } from '../features/pastelConf'
import { pastelIDReducer } from '../features/pastelID'
import { pastelPaperWalletModalReducer } from '../features/pastelPaperWalletGenerator'
import { pastelPriceReducer } from '../features/pastelPrice'

const store = configureStore({
  reducer: {
    pastelID: pastelIDReducer,
    errorModal: errorModalReducer,
    pastelConf: pastelConfReducer,
    pastelPrice: pastelPriceReducer,
    pastelPaperWalletModal: pastelPaperWalletModalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {pastelID: PastelIDState, errorModal: IErrorModalState, ...}
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
