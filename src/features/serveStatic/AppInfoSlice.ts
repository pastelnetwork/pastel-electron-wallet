import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppSelector } from '../../redux/hooks'

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
  getInfoError?: string
}

const initialState: IAppInfoState = {
  addressBookFileName: '',
  info: defaultPastelInfo,
}

type TInfoAction = {
  info: TWalletInfo
}

type TSetGetInfoError = {
  message: string
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    setPastelInfo(state: IAppInfoState, action: PayloadAction<TInfoAction>) {
      state.info = action.payload.info
    },
    setGetInfoError(
      state: IAppInfoState,
      action: PayloadAction<TSetGetInfoError>,
    ) {
      state.getInfoError = action.payload.message
    },
  },
})

export const appInfoReducer = appInfoSlice.reducer

export const { setPastelInfo, setGetInfoError } = appInfoSlice.actions

export const useGetInfoError = (): string | undefined => {
  return useAppSelector(state => state.appInfo.getInfoError)
}
