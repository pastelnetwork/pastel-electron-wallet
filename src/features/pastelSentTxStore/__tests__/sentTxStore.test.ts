import fs from 'fs'

import { loadSentTxns } from '../sent-tx-store'

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

jest.mock('electron', () => ({
  remote: {
    app: {
      getPath: jest.fn(),
    },
  },
}))

const mockTransactions = [
  {
    account: '',
    address: undefined,
    category: '',
    amount: 0,
    vout: 0,
    confirmations: 0,
    blockhash: 0,
    blockindex: 0,
    blocktime: 0,
    expiryheight: 0,
    txid: '',
    walletconflicts: [],
    time: undefined,
    timereceived: 0,
    vjoinsplit: [],
    size: 0,
    lastblock: '',
    type: '',
    detailedTxns: [
      {
        address: undefined,
        amount: 0,
        memo: undefined,
      },
    ],
  },
]

describe('api/pastel-rpc/sentTxStore', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('read senttxstore.dat file', async () => {
    const readFileSpy = jest.spyOn(fs.promises, 'readFile')
    await loadSentTxns()

    expect(readFileSpy).toBeCalledTimes(1)
  })

  test('load data from senttxstore.dat', async () => {
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValueOnce(JSON.stringify(mockTransactions))

    const result = await loadSentTxns()
    expect(result).toMatchObject(mockTransactions)
  })

  test('error when loading data from senttxstore.dat', async () => {
    const result = await loadSentTxns()
    expect(result).toMatchObject([])
  })
})
