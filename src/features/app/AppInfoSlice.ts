import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAppInfoState {
  isPackaged: boolean
  locatePastelConfDir: string
  appVersion: string
  locatePastelConf: string
  pasteldBasePath: string
  locatePasteld: string
  pastelUtilityBinPath: string
  locatePastelParamsDir: string
  locatePastelWalletDir: string
  locateSentTxStore: string
  pastelReinstallPath: string
  locatePastelLog: string
  locatePastelWalletFullnodeDir: string
  locatePastelDDir: string
}

const initialState: IAppInfoState = {
  isPackaged: false,
  locatePastelConfDir: '',
  appVersion: '',
  locatePastelConf: '',
  pasteldBasePath: '',
  locatePasteld: '',
  pastelUtilityBinPath: '',
  locatePastelParamsDir: '',
  locatePastelWalletDir: '',
  locateSentTxStore: '',
  pastelReinstallPath: '',
  locatePastelLog: '',
  locatePastelWalletFullnodeDir: '',
  locatePastelDDir: '',
}

type TOpenAction = {
  isPackaged: boolean
  locatePastelConfDir: string
  appVersion: string
  locatePastelConf: string
  pasteldBasePath: string
  locatePasteld: string
  pastelUtilityBinPath: string
  locatePastelParamsDir: string
  locatePastelWalletDir: string
  locateSentTxStore: string
  pastelReinstallPath: string
  locatePastelLog: string
  locatePastelWalletFullnodeDir: string
  locatePastelDDir: string
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
      state.pastelUtilityBinPath = payload.pastelUtilityBinPath
      state.locatePastelParamsDir = payload.locatePastelParamsDir
      state.locatePastelWalletDir = payload.locatePastelWalletDir
      state.locateSentTxStore = payload.locateSentTxStore
      state.pastelReinstallPath = payload.pastelReinstallPath
      state.locatePastelLog = payload.locatePastelLog
      state.locatePastelWalletFullnodeDir = payload.locatePastelWalletFullnodeDir
      state.locatePastelDDir = payload.locatePastelDDir
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setAppInfo } = appInfoSlice.actions
