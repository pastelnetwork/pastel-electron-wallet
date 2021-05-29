import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { AppDispatch, RootState } from '../../../redux/store'
import coinGeckoClient from '../coingecko'
import {
  fetchPastelPrice,
  pastelPriceReducer,
  setPastelPrice,
} from '../pastelPriceSlice'

jest.mock('../coingecko', () => ({
  simple: {
    price: jest.fn(),
  },
}))

const middlewares = [thunk]
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares)
const store = mockStore()

describe('fetchPastelPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('catches an error if response is invalid', async () => {
    // Arrange
    const coingeckoSpy = jest
      .spyOn(coinGeckoClient.simple, 'price')
      .mockResolvedValue({
        success: false,
        message: 'string',
        code: 500,
        data: {},
      })

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    // Act
    await store.dispatch(fetchPastelPrice())

    // Assert
    expect(coingeckoSpy).toBeCalledTimes(1)
    expect(consoleSpy).toBeCalledTimes(1)
    expect(consoleSpy).toBeCalledWith(
      'pastelPrice fetchPastelPrice error: invalid response',
    )
    expect(store.getActions()).toEqual([])
  })

  test('correctly fetches price', async () => {
    // Arrange
    const coingeckoSpy = jest
      .spyOn(coinGeckoClient.simple, 'price')
      .mockResolvedValue({
        success: true,
        message: 'string',
        code: 200,
        data: {
          pastel: {
            usd: 10,
          },
        },
      })

    const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(100)

    // Act
    await store.dispatch(fetchPastelPrice())

    // Assert
    expect(coingeckoSpy).toBeCalledTimes(1)
    expect(dateSpy).toBeCalledTimes(1)
    expect(store.getActions()).toEqual([
      {
        payload: {
          lastFetched: 100,
          price: 10,
        },
        type: 'pastelPrice/setPastelPrice',
      },
    ])
  })
})

describe('pastelPrice reducer', () => {
  test('returns correct default state', () => {
    // Act
    const s = pastelPriceReducer(undefined, { type: 'test' })

    // Assert
    expect(s).toEqual({
      price: 0,
      lastFetched: undefined,
    })
  })

  test('updates state correctly', () => {
    // Act
    const s = pastelPriceReducer(
      undefined,
      setPastelPrice({
        lastFetched: 100,
        price: 10,
      }),
    )

    // Assert
    expect(s).toEqual({
      price: 10,
      lastFetched: 100,
    })
  })
})

export {}
