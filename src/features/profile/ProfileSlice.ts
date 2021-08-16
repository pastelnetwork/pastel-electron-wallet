import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppThunk } from '../../redux/store'

export type TLocation = {
  label: string
  value: string
}

export type TProfileState = {
  locations: TLocation[]
  loading: boolean
}

const initialState: TProfileState = {
  locations: [],
  loading: false,
}

export const pastelProfileSlice = createSlice({
  name: 'pastelProfile',
  initialState,
  reducers: {
    getLocations(state: TProfileState, action: PayloadAction<TProfileState>) {
      state.locations = action.payload.locations
      state.loading = true
    },
    getLocationsFailure(state: TProfileState) {
      state.loading = false
    },
  },
})

const { getLocations, getLocationsFailure } = pastelProfileSlice.actions

export const pastelProfileReducer = pastelProfileSlice.reducer

export function fetchLocations(suggested: string): AppThunk {
  return async dispatch => {
    try {
      console.log(suggested)
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${suggested}&format=json`,
      )
      console.log(res)
      const temp = []
      for (const location of res.data) {
        temp.push({
          label: location.display_name,
          value: location.display_name,
        })
      }
      console.log(temp)
      dispatch(getLocations({ locations: temp, loading: true }))
    } catch (err) {
      dispatch(getLocationsFailure())
    }
  }
}
