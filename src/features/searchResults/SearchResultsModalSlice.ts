import { createSlice } from '@reduxjs/toolkit'

export interface ISearchResultsModalState {
  modalIsOpen: boolean
}

const initialState: ISearchResultsModalState = {
  modalIsOpen: false,
}

export const searchResultsModalSlice = createSlice({
  name: 'SearchResults',
  initialState,
  reducers: {
    openSearchResultsModal(state: ISearchResultsModalState) {
      state.modalIsOpen = true
      console.log('set state search')
    },
    closeSearchResultsModal(state: ISearchResultsModalState) {
      state.modalIsOpen = false
    },
  },
})

export const searchResultsModalReducer = searchResultsModalSlice.reducer

export const {
  openSearchResultsModal,
  closeSearchResultsModal,
} = searchResultsModalSlice.actions
