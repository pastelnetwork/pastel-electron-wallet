import coinGeckoClient from '../coingecko'
import { mockedStore } from '../../../common/utils/mockStore'
import {
  fetchPastelPrice,
  pastelPriceReducer,
  setPastelPrice,
} from '../pastelPriceSlice'
import log from 'electron-log'

jest.mock('../coingecko', () => ({
  simple: {
    price: jest.fn(),
  },
}))

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

    const logSpy = jest.spyOn(log, 'error').mockImplementation()

    // Act
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await fetchPastelPrice()

    // Assert
    expect(coingeckoSpy).toBeCalledTimes(1)
    expect(logSpy).toBeCalledTimes(1)
    expect(logSpy).toBeCalledWith(
      'pastelPrice fetchPastelPrice error: invalid response',
    )
    expect(mockedStore.getActions()).toEqual([])
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await fetchPastelPrice()

    // Assert
    expect(coingeckoSpy).toBeCalledTimes(1)
    expect(dateSpy).toBeCalledTimes(1)
    expect(mockedStore.getActions()).toEqual([
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
