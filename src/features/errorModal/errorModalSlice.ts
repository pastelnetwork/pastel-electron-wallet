import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IErrorModalState {
  opened: boolean
  title: string
  body: string
}

type TOpenAction = {
  title: string
  body: string
}

const initialState: IErrorModalState = {
  opened: false,
  title: '',
  body: '',
}

export const errorModalSlice = createSlice({
  name: 'errorModal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openErrorModal(
      state: IErrorModalState,
      action: PayloadAction<TOpenAction>,
    ) {
      state.opened = true
      state.title = action.payload.title
      state.body = action.payload.body
    },
    closeErrorModal(state: IErrorModalState) {
      state.opened = false
      state.body = ''
      state.title = ''
    },
  },
})

export const errorModalReducer = errorModalSlice.reducer

export const { openErrorModal, closeErrorModal } = errorModalSlice.actions
