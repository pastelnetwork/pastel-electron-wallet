import store from '../../redux/store'
import { MockStoreEnhanced } from 'redux-mock-store'

jest.mock('../../redux/store', () => {
  const configureMockStore = require('redux-mock-store').default

  return configureMockStore()()
})

export const mockedStore = store as MockStoreEnhanced<unknown, unknown>
