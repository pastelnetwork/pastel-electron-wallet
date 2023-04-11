import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAppInfoState {
  isPackaged: boolean
  locatePastelConfDir: string
  appVersion: string
  locatePastelConf: string
  pasteldBasePath: string
  locatePasteld: string
  locatePastelParamsDir: string
  locatePastelWalletDir: string
  locateSentTxStore: string
}

const initialState: IAppInfoState = {
  isPackaged: false,
  locatePastelConfDir: '',
  appVersion: '',
  locatePastelConf: '',
  pasteldBasePath: '',
  locatePasteld: '',
  locatePastelParamsDir: '',
  locatePastelWalletDir: '',
  locateSentTxStore: '',
}

type TOpenAction = {
  isPackaged: boolean
  locatePastelConfDir: string
  appVersion: string
  locatePastelConf: string
  pasteldBasePath: string
  locatePasteld: string
  locatePastelParamsDir: string
  locatePastelWalletDir: string
  locateSentTxStore: string
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setAppInfo(state: IAppInfoState, { payload }: PayloadAction<TOpenAction>) {
      state.isPackaged = payload.isPackaged
      state.locatePastelConfDir = payload.locatePastelConfDir
      state.appVersion = payload.appVersion
      state.locatePastelConf = payload.locatePastelConf
      state.pasteldBasePath = payload.pasteldBasePath
      state.locatePasteld = payload.locatePasteld
      state.locatePastelParamsDir = payload.locatePastelParamsDir
      state.locatePastelWalletDir = payload.locatePastelWalletDir
      state.locateSentTxStore = payload.locateSentTxStore
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setAppInfo } = appInfoSlice.actions
