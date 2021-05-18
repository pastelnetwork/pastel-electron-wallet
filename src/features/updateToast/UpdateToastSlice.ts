import { createSlice } from '@reduxjs/toolkit'

export interface IUpdateToastState {
  opened: boolean
}

const initialState: IUpdateToastState = {
  opened: false,
}

export const updateToastSlice = createSlice({
  name: 'updateToast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openUpdateToast(state: IUpdateToastState) {
      state.opened = true
    },
    closeUpdateToast(state: IUpdateToastState) {
      state.opened = false
    },
  },
})

export const updateToastReducer = updateToastSlice.reducer

export const { openUpdateToast, closeUpdateToast } = updateToastSlice.actions
