import { createSlice } from '@reduxjs/toolkit'

export interface IPastelPhotopeaModalState {
  modalIsOpen: boolean
}

const initialState: IPastelPhotopeaModalState = {
  modalIsOpen: false,
}

export const pastelPhotopeaModalSlice = createSlice({
  name: 'pastelPhotopeaModal',
  initialState,
  reducers: {
    openPastelPhotopeaModal(state: IPastelPhotopeaModalState) {
      state.modalIsOpen = true
    },
    closePastelPhotopeaModal(state: IPastelPhotopeaModalState) {
      state.modalIsOpen = false
    },
  },
})

export const pastelPhotopeaModalReducer = pastelPhotopeaModalSlice.reducer

export const {
  openPastelPhotopeaModal,
  closePastelPhotopeaModal,
} = pastelPhotopeaModalSlice.actions
