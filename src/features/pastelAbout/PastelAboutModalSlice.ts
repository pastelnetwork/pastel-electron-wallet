import { createSlice } from '@reduxjs/toolkit'

export interface IPastelAboutModalState {
  modalIsOpen: boolean
}

const initialState: IPastelAboutModalState = {
  modalIsOpen: false,
}

export const pastelAboutModalSlice = createSlice({
  name: 'pastelAboutModal',
  initialState,
  reducers: {
    openPastelAboutModal(state: IPastelAboutModalState) {
      state.modalIsOpen = true
    },
    closePastelAboutModal(state: IPastelAboutModalState) {
      state.modalIsOpen = false
    },
  },
})

export const pastelAboutModalReducer = pastelAboutModalSlice.reducer

export const {
  openPastelAboutModal,
  closePastelAboutModal,
} = pastelAboutModalSlice.actions
