import * as pastelStatisticsLib from '../utils'

describe('managePastelDatabase', () => {
  const mockTime = 1621525333257
  const mockHashrates = [
    [1, 3556559, 0, 67782.8577019893, 1621518133277],
    [2, 3556559, 0, 67782.8577019893, 1621518133357],
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
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime)

    // Act
    const result = pastelStatisticsLib.transformDifficultyInfo(
      mockHashrates,
      '2h',
    )

    //Assert
    expect(dateSpy).toHaveBeenCalled()
    expect(result).toEqual({
      dataX: ['5/20/2021, 6:42:13 AM', '5/20/2021, 6:42:13 AM'],
      dataY: [67782.8577019893, 67782.8577019893],
    })
  })
})

export {}
