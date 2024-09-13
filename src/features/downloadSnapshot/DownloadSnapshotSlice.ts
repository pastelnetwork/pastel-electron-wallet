import { createSlice } from '@reduxjs/toolkit'

export interface IDownloadSnapshotState {
  opened: boolean
  isDownloadSnapshot: boolean
  isConnected: boolean
  isClose: boolean
}

const initialState: IDownloadSnapshotState = {
  opened: false,
  isDownloadSnapshot: false,
  isConnected: false,
  isClose: false,
}

export const downloadSnapshotSlice = createSlice({
  name: 'downloadSnapshot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openDownloadSnapshot(state: IDownloadSnapshotState) {
      state.opened = true
    },
    setDownloadSnapshot(state: IDownloadSnapshotState) {
      state.isDownloadSnapshot = true
    },
    closeDownloadSnapshot(state: IDownloadSnapshotState) {
      state.opened = false
      state.isClose = true
    },
    setConnected(state: IDownloadSnapshotState) {
      state.isConnected = true
    },
  },
})

export const downloadSnapshotReducer = downloadSnapshotSlice.reducer

export const {
  openDownloadSnapshot,
  closeDownloadSnapshot,
  setDownloadSnapshot,
  setConnected,
} = downloadSnapshotSlice.actions
