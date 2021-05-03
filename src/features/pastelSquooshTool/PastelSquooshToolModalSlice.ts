import { createSlice } from '@reduxjs/toolkit'

export interface IPastelSquooshToolModalState {
  modalIsOpen: boolean
}

const initialState: IPastelSquooshToolModalState = {
  modalIsOpen: false,
}

export const pastelSquooshToolModalSlice = createSlice({
  name: 'pastelSquooshToolModal',
  initialState,
  reducers: {
    openPastelSquooshToolModal(state: IPastelSquooshToolModalState) {
      state.modalIsOpen = true
    },
    closePastelSquooshToolModal(state: IPastelSquooshToolModalState) {
      state.modalIsOpen = false
    },
  },
})

export const pastelSquooshToolModalReducer = pastelSquooshToolModalSlice.reducer

export const {
  openPastelSquooshToolModal,
  closePastelSquooshToolModal,
} = pastelSquooshToolModalSlice.actions
