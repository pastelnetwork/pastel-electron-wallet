import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPastelIDs, RPCConfig } from "../../api/pastel-rpc";
import type { AppThunk } from "../../redux/store";

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

export const counterSlice = createSlice({
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
  },
});

export const {
  getPastelIDsStart,
  getPastelIDsSuccess,
  getPastelIDsFailure,
} = counterSlice.actions;

export const pastelIDReducer = counterSlice.reducer;

export const fetchPastelIDs = (config: RPCConfig): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getPastelIDsStart());
    const pastelids = await getPastelIDs(config);
    dispatch(getPastelIDsSuccess({ pastelids }));
  } catch (err) {
    dispatch(getPastelIDsFailure(err));
  }
};
