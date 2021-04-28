import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  createNewPastelID,
  getPastelIDs,
  TRPCConfig,
} from '../../api/pastel-rpc'
import type { AppThunk } from '../../redux/store'
import { openPastelModal } from '../pastelModal'

export type TRegisterPastelID = {
  pastelid: string
  txid: string
}

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
      action: PayloadAction<TRegisterPastelID>,
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
        openPastelModal({
          title: 'Can not fetch PastelIDs',
          body: [
            "We cound't fetch existing PastelIDs for some reason. Please restart the wallet to try again.",
          ],
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(err)
    }
  }
}

export function createPastelID(
  passphrase: string,
  address: string,
  config: TRPCConfig,
): AppThunk {
  return async dispatch => {
    try {
      dispatch(createPastelIDStart())
      const res = await createNewPastelID(passphrase, address, config)
      dispatch(
        createPastelIDSuccess({
          pastelid: res.pastelid,
          txid: res.txid,
        }),
      )
      dispatch(
        openPastelModal({
          title: 'PastelID has been created!',
          body: [`PastelID: ${res.pastelid}`, `TXID: ${res.txid}`],
        }),
      )
    } catch (err) {
      dispatch(createPastelIDFailure())
      dispatch(
        openPastelModal({
          title: 'Cannot create a new PastelID!',
          body: [
            "We couldn't create a new PastelID for some reason. Please restart the wallet and try again.",
          ],
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(err)
    }
  }
}
