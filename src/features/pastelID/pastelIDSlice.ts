import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  createNewPastelID,
  getPastelIDs,
  TRPCConfig,
} from '../../api/pastel-rpc'
import type { AppThunk } from '../../redux/store'
import { openErrorModal } from '../errorModal'

export type TPastelID = {
  pastelid: string
}

interface PastelIDsLoaded {
  pastelids: TPastelID[]
}

// Define a type for the slice state
export interface IPastelIDState {
  pastelIDs: TPastelID[]
  loading: boolean
}

// Define the initial state using that type
const initialState: IPastelIDState = {
  pastelIDs: [],
  loading: false,
}

export const pastelIDSlice = createSlice({
  name: 'pastelID',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getPastelIDsStart(state: IPastelIDState) {
      state.loading = true
    },
    getPastelIDsSuccess(
      state: IPastelIDState,
      action: PayloadAction<PastelIDsLoaded>,
    ) {
      state.pastelIDs = action.payload.pastelids
      state.loading = false
    },
    getPastelIDsFailure(state: IPastelIDState) {
      state.loading = true
    },
    createPastelIDStart(state: IPastelIDState) {
      state.loading = true
    },
    createPastelIDSuccess(
      state: IPastelIDState,
      action: PayloadAction<TPastelID>,
    ) {
      state.pastelIDs = [...state.pastelIDs, action.payload]
      state.loading = false
    },
    createPastelIDFailure(state: IPastelIDState) {
      state.loading = false
    },
  },
})

const {
  getPastelIDsStart,
  getPastelIDsSuccess,
  getPastelIDsFailure,
  createPastelIDStart,
  createPastelIDSuccess,
  createPastelIDFailure,
} = pastelIDSlice.actions

export const pastelIDReducer = pastelIDSlice.reducer

export function fetchPastelIDs(config: TRPCConfig): AppThunk {
  return async dispatch => {
    try {
      dispatch(getPastelIDsStart())
      const pastelids = await getPastelIDs(config)
      dispatch(getPastelIDsSuccess({ pastelids }))
    } catch (err) {
      dispatch(getPastelIDsFailure())
      dispatch(
        openErrorModal({
          title: 'Can not fetch Pastel IDs',
          body:
            "We cound't fetch existing Pastel IDs for some reason. Please restart the wallet to try again.",
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(err)
    }
  }
}

export function createPastelID(
  passphrase: string,
  config: TRPCConfig,
): AppThunk {
  return async dispatch => {
    try {
      dispatch(createPastelIDStart())
      const pastelid = await createNewPastelID(passphrase, config)
      dispatch(createPastelIDSuccess(pastelid))
    } catch (err) {
      dispatch(createPastelIDFailure())
      dispatch(
        openErrorModal({
          title: 'Can not create new Pastel ID',
          body:
            "We cound't create a new Pastel ID for some reason. Please restart the wallet and try again.",
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(err)
    }
  }
}
