import { Database } from 'better-sqlite3'

import { selectAllQuery } from '../constants'

import * as pastelDBLib from '../pastelDBLib'

import { insertListTransaction } from '../wallet/listTransaction.repo'
import dayjs from 'dayjs'
import { statisticInfoFactory } from '../statistic/statisticInfo.factory'
import { useTestDb } from '../../../common/utils/test-utils'
import { networkInfoFactory } from '../network/networkInfo.factory'
import { netTotalsFactory } from '../network/netTotals.factory'
import { memPoolInfoFactory } from '../blockchain/memPoolInfo.factory'
import { rawMemPoolFactory } from '../blockchain/rawMemPool.factory'
import { miningInfoFactory } from '../mining/miningInfo.factory'
import { blockChainInfoFactory } from '../blockchain/blockChainInfo.factory'
import { blockInfoFactory } from '../blockchain/blockInfo.factory'
import { transactionTblFactory } from '../wallet/transactionTbl.factory'
import { txOutSetInfoFactory } from '../blockchain/txOutSetInfo.factory'
import { chainTipsFactory } from '../blockchain/chainTips.factory'
import { blockSubsidyFactory } from '../mining/blockSubsidy.factory'
import { walletInfoFactory } from '../wallet/walletInfo.factory'
import { listTransactionFactory } from '../wallet/listTransaction.factory'
import { listUnspentFactory } from '../wallet/listUnspent.factory'
import { totalBalanceFactory } from '../wallet/totalBalance.factory'
import { listAddressFactory } from '../wallet/listAddress.factory'
import { priceInfoFactory } from '../price/priceInfo.factory'
import { insertStatisticInfo } from '../statistic/statisticInfo.repo'
import { insertNetworkInfo } from '../network/networkInfo.repo'
import { insertNetTotals } from '../network/netTotals.repo'
import { insertMemPoolInfo } from '../blockchain/memPoolInfo.repo'
import { insertRawMemPoolInfo } from '../blockchain/rawMemPoolInfo.repo'
import { insertMiningInfo } from '../mining/miningInfo.repo'
import { insertBlockInfo } from '../blockchain/blockInfo.repo'
import { rawTransactionFactory } from '../rawTransaction/rawTransaction.factory'
import { insertRawTransaction } from '../rawTransaction/rawTransaction.repo'
import { insertTransactionTbl } from '../wallet/transactionTbl.repo'
import { insertTxOutSentInfo } from '../blockchain/txOutSetInfo.repo'
import { insertChainTips } from '../blockchain/chainTips.repo'
import { insertWalletInfo } from '../wallet/walletInfo.repo'
import { insertBlockSubsidy } from '../mining/blockSubsidy.repo'
import { insertListUnspent } from '../wallet/listUnspent.repo'
import { insertTotalBalance } from '../wallet/totalBalance.repo'
import { insertListAddress } from '../wallet/listAddress.repo'

describe('managePastelDatabase', () => {
  let db: Database
  useTestDb(value => (db = value))

  const getDataFromDB = jest.fn((tableName: string) =>
    db.prepare(selectAllQuery + tableName).all(),
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('the data should be added correctly to staticinfo table', async () => {
    const values = statisticInfoFactory.build()
    insertStatisticInfo(db, values)

    const result = getDataFromDB('statisticInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to networkinfo table', async () => {
    const values = networkInfoFactory.build()
    insertNetworkInfo(db, values)

    const result = getDataFromDB('networkInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to nettotals table', async () => {
    const values = netTotalsFactory.build()
    insertNetTotals(db, values)

    const result = getDataFromDB('netTotals')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to mempoolinfo table', async () => {
    const values = memPoolInfoFactory.build()
    insertMemPoolInfo(db, values)

    const result = getDataFromDB('memPoolInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to rawmempoolinfo table', async () => {
    const values = rawMemPoolFactory.build()
    insertRawMemPoolInfo(db, values)

    const result = getDataFromDB('rawMempoolInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to mininginfo table', async () => {
    const values = miningInfoFactory.build()
    insertMiningInfo(db, values)

    const result = getDataFromDB('miningInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to blockinfo table', async () => {
    const values = blockInfoFactory.build()
    insertBlockInfo(db, values)

    const result = getDataFromDB('blockInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to rawtransaction table', async () => {
    const values = rawTransactionFactory.build()
    insertRawTransaction(db, values)

    const result = getDataFromDB('rawTransaction')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to transaction table', async () => {
    const values = transactionTblFactory.build()
    insertTransactionTbl(db, values)

    const result = getDataFromDB('transactionTbl')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to txoutsetinfo table', async () => {
    const values = txOutSetInfoFactory.build()
    insertTxOutSentInfo(db, values)

    const result = getDataFromDB('txOutSetInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to chaintips table', async () => {
    const values = chainTipsFactory.build()
    insertChainTips(db, values)

    const result = getDataFromDB('chainTips')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to blocksubsidy table', async () => {
    const values = blockSubsidyFactory.build()
    insertBlockSubsidy(db, values)

    const result = getDataFromDB('blockSubsidy')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to walletinfo table', async () => {
    const values = walletInfoFactory.build()
    insertWalletInfo(db, values)

    const result = getDataFromDB('walletInfo')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to listtransactions table', async () => {
    const values = listTransactionFactory.build()
    insertListTransaction(db, {
      ...values,
      walletconflicts: [],
      vjoinsplit: [],
    })

    const result = getDataFromDB('listTransactions')

    expect(result).toEqual([
      {
        ...values,
        id: 1,
        walletconflicts: '[]',
        vjoinsplit: '[]',
        createdAt: expect.any(Number),
      },
    ])
  })

  test('the data should be added correctly to listunspent table', async () => {
    const values = listUnspentFactory.build()
    insertListUnspent(db, values)

    const result = getDataFromDB('listUnspent')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to totalbalance table', async () => {
    const values = totalBalanceFactory.build()
    insertTotalBalance(db, values)

    const result = getDataFromDB('totalBalance')

    expect(result).toEqual([{ ...values }])
  })

  test('the data should be added correctly to listaddresses table', async () => {
    const values = listAddressFactory.build()
    insertListAddress(db, values)

    const result = getDataFromDB('listAddresses')

    expect(result).toEqual([{ ...values }])
  })

  test('validateDuplicatedRawmempoolInfo should work correctly', async () => {
    const existing = {
      transactionid: '123456789',
      time: 1621518133277,
    }

    await rawMemPoolFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedRawmempoolInfo(
      db,
      'rawMempoolInfo',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedRawmempoolInfo(
      db,
      'rawMempoolInfo',
      {
        transactionid: '12345',
        time: 0,
      },
    )
    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedRawmempoolInfo(db, 'rawmempoolinfoerror', {
        transactionid: '12345',
        time: 0,
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB validateDuplicatedRawmempoolInfo error: rawmempoolinfoerror is invalid table name',
      )
    }
  })

  test('validateDuplicatedBlockchainInfo should works correctly', async () => {
    const existing = {
      bestblockhash: 'abcd12345',
    }

    await blockChainInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedBlockchainInfo(
      db,
      'blockChainInfo',
      existing,
    )
    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedBlockchainInfo(
      db,
      'blockChainInfo',
      {
        bestblockhash: 'best',
      },
    )
    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedBlockchainInfo(db, 'blockchaininfoError', {
        bestblockhash: 'best',
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: blockchaininfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedBlockInfo should works correctly', async () => {
    const existing = {
      hash: 'abcd12345',
    }

    await blockInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedBlockInfo(db, 'blockInfo', {
      hash: 'new',
    })

    expect(result).toEqual(true)

    const result1 = pastelDBLib.validateDuplicatedBlockInfo(db, 'blockInfo', {
      hash: 'abcd12345',
    })

    expect(result1).toEqual(false)

    try {
      pastelDBLib.validateDuplicatedBlockInfo(db, 'blockinfoError', {
        hash: 'abcd12345',
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: blockinfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedBlocksubsidy should works correctly', async () => {
    const existing = {
      miner: 12345,
      masternode: 11111,
    }

    await blockSubsidyFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedBlocksubsidy(
      db,
      'blockSubsidy',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedBlocksubsidy(
      db,
      'blockSubsidy',
      {
        miner: 42,
        masternode: 42,
      },
    )

    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedBlocksubsidy(db, 'blocksubsidyError', {
        miner: 12345,
        masternode: 11111,
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: blocksubsidyError is invalid table name',
      )
    }
  })

  test('validateDuplicatedPriceInfo should works correctly', async () => {
    const existing = {
      priceUsd: 42,
    }

    await priceInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedPriceInfo(db, 'priceInfo', {
      priceUsd: 12345,
    })

    expect(result).toEqual(true)

    const result1 = pastelDBLib.validateDuplicatedPriceInfo(db, 'priceInfo', {
      priceUsd: 42,
    })

    expect(result1).toEqual(false)

    try {
      pastelDBLib.validateDuplicatedPriceInfo(db, 'pslpriceError', {
        priceUsd: 12345,
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: pslpriceError is invalid table name',
      )
    }
  })

  test('validateDuplicatedMempoolInfo should works correctly', async () => {
    const existing = {
      size: 123,
      bytes: 456,
      usage: 789,
    }

    await memPoolInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedMempoolInfo(
      db,
      'memPoolInfo',
      {
        size: 42,
        bytes: 456,
        usage: 789,
      },
    )

    expect(result).toEqual(true)

    const result1 = pastelDBLib.validateDuplicatedMempoolInfo(
      db,
      'memPoolInfo',
      existing,
    )

    expect(result1).toEqual(false)

    try {
      pastelDBLib.validateDuplicatedMempoolInfo(
        db,
        'mempoolinfoError',
        existing,
      )
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: mempoolinfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedMiningInfo should works correctly', async () => {
    const existing = {
      blocks: 123,
    }

    await miningInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedMiningInfo(db, 'miningInfo', {
      blocks: 42,
    })

    expect(result).toEqual(true)

    const result1 = pastelDBLib.validateDuplicatedMiningInfo(
      db,
      'miningInfo',
      existing,
    )

    expect(result1).toEqual(false)

    try {
      pastelDBLib.validateDuplicatedMiningInfo(db, 'mininginfoError', existing)
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: mininginfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedStatisticInfo should works correctly', async () => {
    const existing = {
      solutions: 1,
      difficulty: 99.265,
    }

    await statisticInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedStatisticInfo(
      db,
      'statisticInfo',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedStatisticInfo(
      db,
      'statisticInfo',
      {
        solutions: 1,
        difficulty: 99,
      },
    )

    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedStatisticInfo(db, 'statisticinfoError', {
        solutions: 1,
        difficulty: 99,
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: statisticinfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedTotalbalance should works correctly', async () => {
    const existing = {
      transparent: 'transparent',
      total: 'total',
    }

    await totalBalanceFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedTotalbalance(
      db,
      'totalBalance',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedTotalbalance(
      db,
      'totalBalance',
      {
        transparent: 'trans',
        total: 'to',
      },
    )

    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedTotalbalance(db, 'totalbalanceError', {
        transparent: 'trans',
        total: 'to',
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: totalbalanceError is invalid table name',
      )
    }
  })

  test('validateDuplicatedTxoutsetInfo should works correctly', async () => {
    const existing = {
      height: 496,
      bestblock: 'bestblock',
    }

    await txOutSetInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedTxoutsetInfo(
      db,
      'txOutSetInfo',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedTxoutsetInfo(
      db,
      'txOutSetInfo',
      {
        height: 497,
        bestblock: 'best',
      },
    )

    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedTxoutsetInfo(db, 'txoutsetinfoError', {
        height: 497,
        bestblock: 'best',
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: txoutsetinfoError is invalid table name',
      )
    }
  })

  test('validateDuplicatedWalletInfo should works correctly', async () => {
    const existing = {
      walletversion: 123,
      balance: 456,
      keypoololdest: 789,
      seedfp: 'seedfp',
    }

    await walletInfoFactory.create(existing)

    const result = pastelDBLib.validateDuplicatedWalletInfo(
      db,
      'walletInfo',
      existing,
    )

    expect(result).toEqual(false)

    const result1 = pastelDBLib.validateDuplicatedWalletInfo(db, 'walletInfo', {
      walletversion: 12,
      balance: 34,
      keypoololdest: 56,
      seedfp: 'seedfp',
    })

    expect(result1).toEqual(true)

    try {
      pastelDBLib.validateDuplicatedWalletInfo(db, 'walletinfoError', {
        walletversion: 12,
        balance: 34,
        keypoololdest: 56,
        seedfp: 'seedfp',
      })
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getLastDataFromDB error: walletinfoError is invalid table name',
      )
    }
  })

  test('getFilteredDataFromDBByPeriod should work correctly', async () => {
    const blockInfo = await blockInfoFactory.create()

    const result = pastelDBLib.getFilteredDataFromDBByPeriod(
      db,
      'blockInfo',
      '1d',
      'all',
    )

    expect(result).toEqual([
      {
        averageSize: blockInfo.size,
        date: dayjs(blockInfo.createdAt).format('MM/DD/YYYY'),
      },
    ])

    try {
      pastelDBLib.getFilteredDataFromDBByPeriod(
        db,
        'blockinfoError',
        '1d',
        'all',
      )
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getFilteredDataFromDBByPeriod error: blockinfoError is invalid table name',
      )
    }
  })

  test('getTransactionsDataFromDBByPeriod should work correctly', async () => {
    const date = new Date()
    const now = date.getTime()

    db.exec('DELETE FROM rawTransaction')

    await rawTransactionFactory.createList(2, {
      createdAt: now,
    })

    const result = pastelDBLib.getTransactionsDataFromDBByPeriod(
      db,
      'rawTransaction',
      'all',
    )

    expect(result).toEqual([
      {
        count: 2,
        date: dayjs().format('MM/DD/YYYY'),
      },
    ])
  })

  test('getTransactionsDataFromDBByPeriod should return error when table is invalid', async () => {
    try {
      pastelDBLib.getTransactionsDataFromDBByPeriod(
        db,
        'rawtransactionError',
        'all',
      )
    } catch (e) {
      expect(e.message).toEqual(
        'pastelDB getTransactionsDataFromDBByPeriod error: rawtransactionError is invalid table name',
      )
    }
  })
})
