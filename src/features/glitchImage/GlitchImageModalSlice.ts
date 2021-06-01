import { createSlice } from '@reduxjs/toolkit'

export interface IGlitchImageModalState {
  modalIsOpen: boolean
}

const initialState: IGlitchImageModalState = {
  modalIsOpen: false,
}

export const glitchImageModalSlice = createSlice({
  name: 'glitchImageModal',
  initialState,
  reducers: {
    openGlitchImageModal(state: IGlitchImageModalState) {
      state.modalIsOpen = true
    },
    closeGlitchImageModal(state: IGlitchImageModalState) {
      state.modalIsOpen = false
    },
  },
})

export const glitchImageModalReducer = glitchImageModalSlice.reducer

export const {
  openGlitchImageModal,
  closeGlitchImageModal,
} = glitchImageModalSlice.actions
