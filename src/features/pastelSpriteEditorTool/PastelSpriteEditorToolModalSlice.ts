import { createSlice } from '@reduxjs/toolkit'

export interface IPastelSpriteEditorToolModalState {
  modalIsOpen: boolean
}

const initialState: IPastelSpriteEditorToolModalState = {
  modalIsOpen: false,
}

export const pastelSpriteEditorToolModalSlice = createSlice({
  name: 'pastelSpriteEditorToolModal',
  initialState,
  reducers: {
    openPastelSpriteEditorToolModal(state: IPastelSpriteEditorToolModalState) {
      state.modalIsOpen = true
    },
    closePastelSpriteEditorToolModal(state: IPastelSpriteEditorToolModalState) {
      state.modalIsOpen = false
    },
  },
})

export const pastelSpriteEditorToolModalReducer =
  pastelSpriteEditorToolModalSlice.reducer

export const {
  openPastelSpriteEditorToolModal,
  closePastelSpriteEditorToolModal,
} = pastelSpriteEditorToolModalSlice.actions
