import store, { RootState } from '../../redux/store'
import { MockStoreEnhanced } from 'redux-mock-store'
import { DeepPartial } from './types'

jest.mock('../../redux/store', () => {
  const configureMockStore = require('redux-mock-store').default

  return configureMockStore()()
})

export const mockedStore = store as MockStoreEnhanced<
  DeepPartial<RootState>,
  unknown
>
