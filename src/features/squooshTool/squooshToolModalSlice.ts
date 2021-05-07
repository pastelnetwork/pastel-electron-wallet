import { createSlice } from '@reduxjs/toolkit'

export interface ISquooshToolModalState {
  modalIsOpen: boolean
}

const initialState: ISquooshToolModalState = {
  modalIsOpen: false,
}

export const squooshToolModalSlice = createSlice({
  name: 'squooshToolModal',
  initialState,
  reducers: {
    openSquooshToolModal(state: ISquooshToolModalState) {
      state.modalIsOpen = true
    },
    closeSquooshToolModal(state: ISquooshToolModalState) {
      state.modalIsOpen = false
    },
  },
})

export const squooshToolModalReducer = squooshToolModalSlice.reducer

export const {
  openSquooshToolModal,
  closeSquooshToolModal,
} = squooshToolModalSlice.actions
