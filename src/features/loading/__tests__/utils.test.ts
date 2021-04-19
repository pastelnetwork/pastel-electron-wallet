import fs from 'fs'
import request from 'request'
import * as sha256File from 'sha256-file'
import { Readable, Writable } from 'stream'

import { checkHashAndDownloadParams } from '../utils'

jest.mock('request', () => ({
  get: jest.fn(),
}))

jest.mock('sha256-file', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('fs', () => ({
  promises: {
    stat: jest.fn(),
    mkdir: jest.fn(),
    unlink: jest.fn(),
  },
  createWriteStream: jest.fn(),
}))

jest.mock('path', () => ({
  join: jest.fn(),
}))

jest.mock('sha256-file', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('loading/utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  const params = [
    {
      name: 'abc.txt',
      url: 'http://localhost:8444/abc',
      sha256: 'correct sha',
    },
    {
      name: 'xyz.txt',
      url: 'http://localhost:8444/xyz',
      sha256: 'correct sha',
    },
    {
      name: 'tuv.txt',
      url: 'http://localhost:8444/tuv',
      sha256: 'correct sha',
    },
  ]

  test('should download all params correctly', async () => {
    // Arrange
    jest.spyOn(fs.promises, 'stat').mockRejectedValue({
      code: 'ENOENT',
    })

    const readableMock = new Readable()
    const requestSpy = jest.spyOn(request, 'get') as jest.SpyInstance
    requestSpy.mockReturnValue(readableMock)

    const mockWritable = new WritableMock()
    const writerSpy = jest.spyOn(fs, 'createWriteStream') as jest.SpyInstance
    writerSpy.mockReturnValue(mockWritable)

    // Act
    setTimeout(() => {
      mockWritable.emit('finish')
    }, 100)

    await checkHashAndDownloadParams({
      params,
      outputDir: 'a/b',
      onProgress: jest.fn(),
    })

    // Assert
    expect(requestSpy).toBeCalledTimes(params.length)
    expect(writerSpy).toBeCalledTimes(params.length)
  })

  test('should not remove/re-download valid params', async () => {
    // Arrange
    const statSpy = jest.spyOn(fs.promises, 'stat') as jest.SpyInstance
    statSpy.mockResolvedValue(true)

    const unlinkSpy = jest.spyOn(fs.promises, 'unlink')
    jest.spyOn(sha256File, 'default').mockReturnValue('correct sha')

    const readableMock = new Readable()
    const requestSpy = jest.spyOn(request, 'get') as jest.SpyInstance
    requestSpy.mockReturnValue(readableMock)

    // Act
    await checkHashAndDownloadParams({
      params,
      outputDir: 'a/b',
      onProgress: jest.fn(),
    })

    // Assert
    expect(unlinkSpy).toBeCalledTimes(0)
    expect(requestSpy).toBeCalledTimes(0)
  })

  test('should remove/re-download invalid params', async () => {
    // Arrange
    const newParams = [...params]

    newParams[0] = {
      name: 'abc.txt',
      url: 'http://localhost:8444/abc',
      sha256: 'incorrect sha',
    }
    const onProgressSpy = jest.fn()

    const statSpy = jest.spyOn(fs.promises, 'stat') as jest.SpyInstance
    statSpy.mockResolvedValue(true)

    const unlinkSpy = jest.spyOn(fs.promises, 'unlink')
    jest.spyOn(sha256File, 'default').mockReturnValue('correct sha')

    const readableMock = new Readable()
    const requestSpy = jest.spyOn(request, 'get') as jest.SpyInstance
    requestSpy.mockReturnValue(readableMock)

    const mockWritable = new WritableMock()
    const writerSpy = jest.spyOn(fs, 'createWriteStream') as jest.SpyInstance
    writerSpy.mockReturnValue(mockWritable)

    // Act
    setTimeout(() => {
      mockWritable.emit('finish')
    }, 100)

    await checkHashAndDownloadParams({
      params: newParams,
      outputDir: 'a/b',
      onProgress: onProgressSpy,
    })

    expect(unlinkSpy).toBeCalledTimes(1)
    expect(onProgressSpy).toHaveBeenCalledWith('Downloading abc.txt...')
    expect(requestSpy).toBeCalledTimes(1)
  })
})

class WritableMock extends Writable {
  close() {
    return 'mock me'
  }
}
