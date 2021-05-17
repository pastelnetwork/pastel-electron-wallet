import fs from 'fs'

import { readFileBase64 } from '../readFileBase64'

jest.mock('electron', () => ({
  ipcMain: {
    handle: jest.fn(),
  },
}))

describe('readFileBase64', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('readFileBase64 return successful response', async () => {
    // Arrange
    const fsReadFileMock = jest.spyOn(
      fs.promises,
      'readFile',
    ) as jest.SpyInstance
    fsReadFileMock.mockResolvedValue(Buffer.from('base64'))

    // Act
    const resp = await readFileBase64('a/b')

    // Assert
    expect(resp).toEqual('YmFzZTY0')
  })
})
