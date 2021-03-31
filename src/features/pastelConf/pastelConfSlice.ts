// TODO Remove this functionality PastelConf fetch functionality will be moved from LoadingScreen to a separate shared package or file.
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IPastelConfState {
  url: string
  username: string
  password: string
}

const initialState: IPastelConfState = {
  url: '',
  username: '',
  password: '',
}

export const errorModalSlice = createSlice({
  name: 'errorModal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPastelConf(
      state: IPastelConfState,
      action: PayloadAction<IPastelConfState>,
    ) {
      state.url = action.payload.url
      state.username = action.payload.username
      state.password = action.payload.password
    },
  },
})

export const pastelConfReducer = errorModalSlice.reducer

export const { setPastelConf } = errorModalSlice.actions
