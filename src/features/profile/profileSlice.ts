import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IProfileState {
  isPackaged: boolean
}

const initialState: IProfileState = {
  isPackaged: false,
}

type TSetPackaged = {
  isPackaged: boolean
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsPackaged(state: IProfileState, action: PayloadAction<TSetPackaged>) {
      state.isPackaged = action.payload.isPackaged
    },
  },
})

export const profileReducer = profileSlice.reducer

export const { setIsPackaged } = profileSlice.actions
