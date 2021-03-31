import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewPastelID,
  getPastelIDs,
  RPCConfig,
} from "../../api/pastel-rpc";
import type { AppThunk } from "../../redux/store";
import { openErrorModal } from "../errorModal";

export type TPastelID = {
  pastelid: string;
};

interface PastelIDsLoaded {
  pastelids: TPastelID[];
}

// Define a type for the slice state
interface PastelIDState {
  pastelIDs: TPastelID[];
  loading: boolean;
  error: Error;
}

// Define the initial state using that type
const initialState: PastelIDState = {
  pastelIDs: [],
  loading: false,
  error: null,
};

export const pastelIDSlice = createSlice({
  name: "pastelID",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getPastelIDsStart(state: PastelIDState) {
      state.loading = true;
      state.error = null;
    },
    getPastelIDsSuccess(
      state: PastelIDState,
      action: PayloadAction<PastelIDsLoaded>
    ) {
      state.pastelIDs = action.payload.pastelids;
      state.loading = false;
      state.error = null;
    },
    getPastelIDsFailure(state: PastelIDState, action: PayloadAction<Error>) {
      state.loading = true;
      state.error = action.payload;
    },
    createPastelIDStart(state: PastelIDState) {
      (state.loading = true), (state.error = null);
    },
    createPastelIDSuccess(
      state: PastelIDState,
      action: PayloadAction<TPastelID>
    ) {
      state.pastelIDs = [...state.pastelIDs, action.payload];
      state.loading = false;
      state.error = null;
    },
    createPastelIDFailure(state: PastelIDState, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getPastelIDsStart,
  getPastelIDsSuccess,
  getPastelIDsFailure,
  createPastelIDStart,
  createPastelIDSuccess,
  createPastelIDFailure,
} = pastelIDSlice.actions;

export const pastelIDReducer = pastelIDSlice.reducer;

export function fetchPastelIDs(config: RPCConfig): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(getPastelIDsStart());
      const pastelids = await getPastelIDs(config);
      dispatch(getPastelIDsSuccess({ pastelids }));
    } catch (err) {
      dispatch(getPastelIDsFailure(err));
      dispatch(
        openErrorModal({
          title: "Can not fetch Pastel IDs",
          body:
            "We cound't fetch existing Pastel IDs for some reason. Please restart the wallet to try again.",
        })
      );

      // TODO log errors to a central logger so we can address them later.
      console.warn(err);
    }
  };
}

export function createPastelID(
  passphrase: string,
  config: RPCConfig
): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(createPastelIDStart());
      const pastelid = await createNewPastelID(passphrase, config);
      dispatch(createPastelIDSuccess(pastelid));
    } catch (err) {
      dispatch(getPastelIDsFailure(err));
      dispatch(
        openErrorModal({
          title: "Can not create new Pastel ID",
          body:
            "We cound't create a new Pastel ID for some reason. Please restart the wallet and try again.",
        })
      );

      // TODO log errors to a central logger so we can address them later.
      console.warn(err);
    }
  };
}
