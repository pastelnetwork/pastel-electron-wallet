import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAppInfoState {
  isPackaged: boolean
  locatePastelConfDir: string
  locateSentTxStore: string
  addressBookFileName: string
}

const initialState: IAppInfoState = {
  isPackaged: false,
  locatePastelConfDir: '',
  locateSentTxStore: '',
  addressBookFileName: '',
}

type TAppInfoAction = {
  isPackaged: boolean
  locatePastelConfDir: string
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setAppInfo(state: IAppInfoState, action: PayloadAction<TAppInfoAction>) {
      state.isPackaged = action.payload.isPackaged
      state.locatePastelConfDir = action.payload.locatePastelConfDir
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setAppInfo } = appInfoSlice.actions
