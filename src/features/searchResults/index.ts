import SearchResults from './SearchResultsModal'

export type { ISearchResultsModalState } from './SearchResultsModalSlice'
export {
  searchResultsModalReducer,
  closeSearchResultsModal,
  openSearchResultsModal,
} from './SearchResultsModalSlice'

export default SearchResults
