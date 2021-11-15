import store from '../../redux/store'

jest.mock('../../redux/store', () => {
  const configureMockStore = require('redux-mock-store').default

  return configureMockStore()()
})

export const mockedStore = store
