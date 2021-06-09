import * as pastelStatisticsLib from '../utils/PastelStatisticsLib'
import timezone_mock from 'timezone-mock'

describe('managePastelDatabase', () => {
  const mockTime = 1621525333257
  const mockDifficulties = [
    [1, 3556559, 67782.8577019893, 1621518133277],
    [2, 3556559, 67782.8577019893, 1621518133357],
  ]
  const mockPslPrices = [
    [1, 0.00539335, 1621518133277],
    [2, 0.00539707, 1621518133357],
  ]
  const mockHashrates = [
    [
      1,
      67001,
      0,
      0,
      1.0,
      '',
      -1,
      0,
      2696909,
      2696909,
      0,
      0,
      'main',
      1621518133277,
    ],
    [
      2,
      67002,
      0,
      0,
      1.0,
      '',
      -1,
      0,
      2696909,
      2696909,
      0,
      0,
      'main',
      1621518133357,
    ],
  ]
  const mockNetTotals = [
    [1, 123434, 21296, 1621518133277],
    [2, 147102, 27015, 1621518133357],
  ]
  const mockMempoolInfos = [
    [1, 1, 492, 1344, 1621518133277],
    [2, 3, 816, 1560, 1621518133357],
  ]

  const mockBlockSizes = [
    [1, 1621518133277],
    [2, 1621518133357],
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
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformBlockSizeInfo(mockBlockSizes)

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: ['1', '2'],
      dataY: [1621518133.277, 1621518133.357],
    })
  })
})

export {}
