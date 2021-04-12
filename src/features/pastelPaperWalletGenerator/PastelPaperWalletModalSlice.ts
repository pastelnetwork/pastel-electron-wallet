import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPastelPaperWalletModalState {
  address: string
  privateKey: string
  modalIsOpen: boolean
}

const initialState: IPastelPaperWalletModalState = {
  address: '',
  privateKey: '',
  modalIsOpen: false,
}

type TOpenAction = {
  address: string
  privateKey: string
}

export const pastelPaperWalletModalSlice = createSlice({
  name: 'pastelPaperWalletModal',
  initialState,
  reducers: {
    openPastelPaperWalletModal(
      state: IPastelPaperWalletModalState,
      action: PayloadAction<TOpenAction>,
    ) {
      state.modalIsOpen = true
      state.privateKey = action.payload.privateKey
      state.address = action.payload.address
    },
    closePastelPaperWalletModal(state: IPastelPaperWalletModalState) {
      state.modalIsOpen = false
      state.privateKey = ''
      state.address = ''
    },
  },
})

export const pastelPaperWalletModalReducer = pastelPaperWalletModalSlice.reducer

export const {
  openPastelPaperWalletModal,
  closePastelPaperWalletModal,
} = pastelPaperWalletModalSlice.actions
