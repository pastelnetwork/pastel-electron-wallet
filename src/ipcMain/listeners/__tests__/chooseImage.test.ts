import { dialog } from 'electron'
import fs from 'fs'

import { chooseImage } from '../chooseImage'

describe('chooseImage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('chooseImage returns successful response', async () => {
    // Arrange
    const dialogMock = jest.spyOn(dialog, 'showOpenDialog') as jest.SpyInstance
    dialogMock.mockResolvedValue({
      filePaths: ['a/b'],
    })

    const fsStatMock = jest.spyOn(fs.promises, 'stat') as jest.SpyInstance
    fsStatMock.mockResolvedValue({
      size: 10,
    })

    const fsReadFileMock = jest.spyOn(
      fs.promises,
      'readFile',
    ) as jest.SpyInstance
    fsReadFileMock.mockResolvedValue(Buffer.from('base64'))

    // Act
    const resp = await chooseImage()

    // Assert
    expect(resp).toEqual({
      status: 'Success',
      payload: {
        base64: 'YmFzZTY0',
        size: 10,
        path: 'a/b',
      },
    })
  })

  test('chooseImage returns error response', async () => {
    // Arrange
    expect.hasAssertions()

    const dialogMock = jest.spyOn(dialog, 'showOpenDialog') as jest.SpyInstance
    dialogMock.mockResolvedValue({
      filePaths: ['a/b'],
    })

    const fsStatMock = jest.spyOn(fs.promises, 'stat') as jest.SpyInstance
    fsStatMock.mockRejectedValue(new Error('expected error'))

    // Act
    const resp = await chooseImage()

    // Assert
    expect(resp).toEqual({
      status: 'Failure',
      error: 'ipcMain chooseImage error: expected error',
    })
  })
})
