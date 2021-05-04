import { createSlice } from '@reduxjs/toolkit'

export interface IAboutModalState {
  modalIsOpen: boolean
}

const initialState: IAboutModalState = {
  modalIsOpen: false,
}

export const aboutModalSlice = createSlice({
  name: 'aboutModal',
  initialState,
  reducers: {
    openAboutModal(state: IAboutModalState) {
      state.modalIsOpen = true
    },
    closeAboutModal(state: IAboutModalState) {
      state.modalIsOpen = false
    },
  },
})

export const aboutModalReducer = aboutModalSlice.reducer

export const { openAboutModal, closeAboutModal } = aboutModalSlice.actions
