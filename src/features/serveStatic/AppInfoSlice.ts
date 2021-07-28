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
  isPackaged: boolean
  locatePastelConfDir: string
  locateSentTxStore: string
  addressBookFileName: string
  info: TWalletInfo
}

const initialState: IAppInfoState = {
  isPackaged: false,
  locatePastelConfDir: '',
  locateSentTxStore: '',
  addressBookFileName: '',
  info: defaultPastelInfo,
}

type TAppInfoAction = {
  isPackaged: boolean
  locatePastelConfDir: string
  locateSentTxStore: string
}

type TInfoAction = {
  info: TWalletInfo
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setAppInfo(state: IAppInfoState, action: PayloadAction<TAppInfoAction>) {
      state.isPackaged = action.payload.isPackaged
      state.locatePastelConfDir = action.payload.locatePastelConfDir
      state.locateSentTxStore = action.payload.locateSentTxStore
    },
    setPastelInfo(state: IAppInfoState, action: PayloadAction<TInfoAction>) {
      state.info = action.payload.info
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setAppInfo, setPastelInfo } = appInfoSlice.actions
