import { createSlice } from '@reduxjs/toolkit'

export interface IUtilitiesState {
  payURIModalIsOpen: boolean
  exportPrivKeyModalIsOpen: boolean
  importANIPrivKeyModalIsOpen: boolean
  importPrivKeyModalIsOpen: boolean
}

const initialState: IUtilitiesState = {
  payURIModalIsOpen: false,
  exportPrivKeyModalIsOpen: false,
  importANIPrivKeyModalIsOpen: false,
  importPrivKeyModalIsOpen: false,
}

export const utilitiesSlice = createSlice({
  name: 'utilitiesSlice',
  initialState,
  reducers: {
    openPayURIModal(state: IUtilitiesState) {
      state.payURIModalIsOpen = true
    },
    closePayURIModal(state: IUtilitiesState) {
      state.payURIModalIsOpen = false
    },
    openExportPrivKeyModal(state: IUtilitiesState) {
      state.exportPrivKeyModalIsOpen = true
    },
    closeExportPrivKeyModal(state: IUtilitiesState) {
      state.exportPrivKeyModalIsOpen = false
    },
    openImportPrivKeyModal(state: IUtilitiesState) {
      state.importPrivKeyModalIsOpen = true
    },
    closeImportPrivKeyModal(state: IUtilitiesState) {
      state.importPrivKeyModalIsOpen = false
    },
    openImportANIPrivKeyModal(state: IUtilitiesState) {
      state.importANIPrivKeyModalIsOpen = true
    },
    closeImportANIPrivKeyModal(state: IUtilitiesState) {
      state.importANIPrivKeyModalIsOpen = false
    },
  },
})

export const utilitiesReducer = utilitiesSlice.reducer

export const {
  openPayURIModal,
  closePayURIModal,
  openExportPrivKeyModal,
  closeExportPrivKeyModal,
  openImportPrivKeyModal,
  closeImportPrivKeyModal,
  openImportANIPrivKeyModal,
  closeImportANIPrivKeyModal,
} = utilitiesSlice.actions
