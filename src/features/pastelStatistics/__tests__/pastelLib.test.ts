import * as pastelStatisticsLib from '../utils/PastelStatisticsLib'
import timezone_mock from 'timezone-mock'
import { statisticInfoFactory } from '../../pastelDB/statistic/statisticInfo.factory'
import { priceInfoFactory } from '../../pastelDB/price/priceInfo.factory'
import { miningInfoFactory } from '../../pastelDB/mining/miningInfo.factory'
import { netTotalsFactory } from '../../pastelDB/network/netTotals.factory'
import { memPoolInfoFactory } from '../../pastelDB/blockchain/memPoolInfo.factory'
import { blockInfoFactory } from '../../pastelDB/blockchain/blockInfo.factory'
import { rawMemPoolFactory } from '../../pastelDB/blockchain/rawMemPool.factory'

describe('managePastelDatabase', () => {
  const mockTime = 1621525333257

  const mockDifficulties = [
    statisticInfoFactory.build({
      difficulty: 67782.8577019893,
      createdAt: 1621518133277,
    }),
    statisticInfoFactory.build({
      difficulty: 67782.8577019893,
      createdAt: 1621518133357,
    }),
  ]

  const mockPslPrices = [
    priceInfoFactory.build({
      priceUsd: 0.00539335,
      createdAt: 1621518133277,
    }),
    priceInfoFactory.build({
      priceUsd: 0.00539707,
      createdAt: 1621518133357,
    }),
  ]

  const mockHashrates = [
    miningInfoFactory.build({
      networkhashps: 2696909,
      createdAt: 1621518133277,
    }),
    miningInfoFactory.build({
      networkhashps: 2696909,
      createdAt: 1621518133357,
    }),
  ]

  const mockNetTotals = [
    netTotalsFactory.build({
      totalbytesrecv: 123434,
      totalbytessent: 21296,
      timemillis: 1621518133277,
    }),
    netTotalsFactory.build({
      totalbytesrecv: 147102,
      totalbytessent: 27015,
      timemillis: 1621518133357,
    }),
  ]

  const mockMempoolInfos = [
    memPoolInfoFactory.build({
      usage: 1344,
      createdAt: 1621518133277,
    }),
    memPoolInfoFactory.build({
      usage: 1560,
      createdAt: 1621518133357,
    }),
  ]

  const mockBlockSizes = [
    { date: '1', averageSize: 1621518133277 },
    { date: '2', averageSize: 1621518133357 },
  ]

  const mockTransactionFees = [
    rawMemPoolFactory.build({
      fee: 0.0539,
      createdAt: 1621518133277,
    }),
    rawMemPoolFactory.build({
      fee: 0.0705,
      createdAt: 1621518133357,
    }),
  ]

  const mockTransactionsInBlock = [
    blockInfoFactory.build({
      createdAt: mockTime,
    }),
    blockInfoFactory.build({
      createdAt: mockTime,
    }),
  ]

  test('getStartPoint function works correctly', async () => {
    // Arrange
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const time = pastelStatisticsLib.getStartPoint('2h')

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(time).toEqual(1621518133257)
  })

  test('transformDifficultyInfo function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformDifficultyInfo(
      mockDifficulties,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY: [67782.8577019893, 67782.8577019893],
    })
  })

  test('transformPriceInfo function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformPriceInfo(mockPslPrices, '2h')

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY1: [0.00539335, 0.00539707],
      dataY2: [1.0867169325138508e-7, 1.0874664827913134e-7],
    })
  })

  test('transformHashrateInfo function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformHashrateInfo(
      mockHashrates,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY: [2.696909, 2.696909],
    })
  })

  test('transformNetTotals function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformNetTotals(mockNetTotals, '2h')

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY1: [123434, 147102],
      dataY2: [21296, 27015],
    })
  })

  test('transformMempoolInfo function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformMempoolInfo(
      mockMempoolInfos,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY: [1.344, 1.56],
    })
  })

  test('transformBlockSizeInfo function works correctly', async () => {
    const result = pastelStatisticsLib.transformBlockSizeInfo(mockBlockSizes)

    expect(result).toEqual({
      dataX: ['1', '2'],
      dataY: [1621518133.277, 1621518133.357],
    })
  })

  test('transformTransactionInBlock function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')

    // Act
    const result = pastelStatisticsLib.transformTransactionInBlock(
      mockTransactionsInBlock,
      'all',
    )

    //Assert
    expect(result).toEqual({
      data: [
        [1, 0],
        [1, 0],
      ],
      dataX: [
        '2021-05-20T15:42:13.257Z UTC (MockDate: GMT-0700)',
        '2021-05-20T15:42:13.257Z UTC (MockDate: GMT-0700)',
      ],
    })
  })

  test('transformTransactionFee function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformTransactionFee(
      mockTransactionFees,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY: [0.0539, 0.0705],
    })
  })
})
