import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TGetResponse } from 'api/walletNode/userData'

export interface IProfileState {
  user: TGetResponse
}

const initialState: IProfileState = {
  user: {
    artist_pastelid: '',
    artist_pastelid_passphrase: '',
    categories: [],
  },
}

type TProfileAction = {
  user: TGetResponse
}

export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(
      state: IProfileState,
      action: PayloadAction<TProfileAction>,
    ) {
      state.user = action.payload.user
    },
  },
})

export const profileReducer = profileSlice.reducer

export const { setUserProfile } = profileSlice.actions
