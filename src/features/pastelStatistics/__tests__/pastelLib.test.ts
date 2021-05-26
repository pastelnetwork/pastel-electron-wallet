import * as pastelStatisticsLib from '../utils/PastelStatisticsLib'
import timezone_mock from 'timezone-mock'

describe('managePastelDatabase', () => {
  const mockTime = 1621525333257
  const mockDifficulties = [
    [1, 3556559, 67782.8577019893, 1621518133277],
    [2, 3556559, 67782.8577019893, 1621518133357],
  ]
  const mockTransactions = [
    [
      1,
      67001,
      '111',
      30397,
      41921,
      2186216,
      '',
      9823582306.34789,
      1621518133277,
    ],
    [
      2,
      67002,
      '222',
      30399,
      41924,
      2186363,
      '',
      9823588556.34789,
      1621518133357,
    ],
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

  test('transformTransactionInfo function works correctly', async () => {
    // Arrange
    timezone_mock.register('US/Pacific')
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformTransactionInfo(
      mockTransactions,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: [
        '2021-05-20T13:42:13.277Z UTC (MockDate: GMT-0700)',
        '2021-05-20T13:42:13.357Z UTC (MockDate: GMT-0700)',
      ],
      dataY: [30397, 30399],
    })
  })
})

export {}
