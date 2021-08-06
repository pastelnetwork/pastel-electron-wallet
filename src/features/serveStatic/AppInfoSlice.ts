import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const defaultPastelInfo = {
  connections: 0,
  currencyName: '',
  disconnected: false,
  latestBlock: 0,
  pslPrice: undefined,
  solps: 0,
  testnet: false,
  verificationProgress: 0,
  version: 0,
}

export type TWalletInfo = {
  connections: number
  currencyName: string
  disconnected: boolean
  latestBlock: number
  pslPrice: number | undefined
  solps: number
  testnet: boolean
  verificationProgress: number
  version: number
}

export interface IAppInfoState {
  addressBookFileName: string
  info: TWalletInfo
}

const initialState: IAppInfoState = {
  addressBookFileName: '',
  info: defaultPastelInfo,
}

type TInfoAction = {
  info: TWalletInfo
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setPastelInfo(state: IAppInfoState, action: PayloadAction<TInfoAction>) {
      state.info = action.payload.info
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setPastelInfo } = appInfoSlice.actions
