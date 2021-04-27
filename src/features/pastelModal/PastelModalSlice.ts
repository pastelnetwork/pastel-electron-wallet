import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPastelModalState {
  opened: boolean
  title: string
  body: string[]
}

type TOpenAction = {
  title: string
  body: string[]
}

const initialState: IPastelModalState = {
  opened: false,
  title: '',
  body: [],
}

export const pastelModalSlice = createSlice({
  name: 'pastelModal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openPastelModal(
      state: IPastelModalState,
      action: PayloadAction<TOpenAction>,
    ) {
      state.opened = true
      state.title = action.payload.title
      state.body = action.payload.body
    },
    closePastelModal(state: IPastelModalState) {
      state.opened = false
      state.body = []
      state.title = ''
    },
  },
})

export const pastelModalReducer = pastelModalSlice.reducer

export const { openPastelModal, closePastelModal } = pastelModalSlice.actions
