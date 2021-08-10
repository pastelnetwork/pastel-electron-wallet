import { mockedStore } from '../../../common/utils/mockStore'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TTransaction } from 'types/rpc'
import { fetchTandZTransactions } from '../transactions'
import { setRpcConfig } from '../../rpcConfig'

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(true),
  },
}))

jest.mock('path', () => ({
  join: jest.fn(),
}))

jest.mock('os', () => ({
  platform: jest.fn(),
}))

const config = {
  username: '',
  password: '',
  url: 'http://localhost::8444',
}

const mockListTransactions = [
  {
    account: '',
    address: 'PtmHPHFpBz9ALNDs5AUUu6nyx7W5bonSjhv',
    amount: 10,
    blockhash:
      '000000056e6333aa322831f3fe220c26de5389871a5bf72781ad6ae5e962d339',
    blockindex: 3,
    blocktime: 1620276129,
    category: 'receive',
    confirmations: 329,
    expiryheight: 55811,
    size: 1459,
    time: 1620276011,
    timereceived: 1620276011,
    txid: 'f8e9b6e3cad889e02c32a86429234077b572544e74102873c39eaf5c7114f91c',
    vjoinsplit: [],
    vout: 0,
    walletconflicts: [],
  },
]

describe('api/pastel-rpc/transactions', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    setRpcConfig(config)

    mockedStore.getState = jest.fn(() => ({
      appInfo: {
        sentTxStorePath: 'path',
      },
    }))
  })

  test('can get the transaction', async () => {
    const mock = new MockAdapter(axios)
    const data = { result: mockListTransactions }
    mock.onPost(config.url).reply(200, data)

    function callback(alltxlist: TTransaction[]): void {
      expect(alltxlist).not.toBeNull()
    }

    await fetchTandZTransactions(callback)

    mock.reset()
  })

  test('can’t get the transaction', async () => {
    expect.hasAssertions()

    function callback(alltxlist: TTransaction[]): void {
      expect(alltxlist).toBeNaN()
    }

    const mock = new MockAdapter(axios)
    mock.onPost(config.url).reply(500)

    try {
      await fetchTandZTransactions(callback)
    } catch ({ message }) {
      expect(message).toEqual(
        'api/pastel-rpc server error: Request failed with status code 500',
      )
    }
  })
})
