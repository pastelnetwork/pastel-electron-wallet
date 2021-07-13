// TODO Remove this functionality PastelConf fetch functionality will be moved from LoadingScreen to a separate shared package or file.
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RPCConfig } from 'legacy/components/AppState'

export type TRpcConfigState = {
  config: RPCConfig
}

const initialState: TRpcConfigState = {
  config: {
    username: '',
    password: '',
    url: '',
  },
}

export const errorModalSlice = createSlice({
  name: 'rpcConfig',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRpcConfig(
      state: TRpcConfigState,
      action: PayloadAction<TRpcConfigState>,
    ) {
      state.config = action.payload.config
    },
  },
})

export const rpcConfigReducer = errorModalSlice.reducer

export const { setRpcConfig } = errorModalSlice.actions
