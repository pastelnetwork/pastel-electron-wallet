import fs from 'fs'
import path from 'path'
import request from 'request'

import { checkHashAndDownloadParams } from '../utils'

// jest.mock('fs', () => ({
//   existsSync: jest.fn(),
//   mkdirSync: jest.fn(),
//   exists: jest.fn(),
//   unlinkSync: jest.fn(),
//   createWriteStream: jest.fn(),
// }))

jest.mock('path', () => ({
  join: jest.fn(),
}))

jest.mock('request', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('sha256-file', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('fs', () => ({
  __esModule: true,
  default: {
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
    exists: jest.fn(),
    unlinkSync: jest.fn(),
    createWriteStream: jest.fn(),
    statSync: jest.fn(),
  },
}))

jest.mock('request', () => {
  return {
    get: jest.fn().mockReturnValue({
      on: jest.fn(),
    }),
  }
})

describe('loading/utils', () => {
  const params = [
    {
      name: 'abc.txt',
      url: 'http://localhost:8444/abc',
      sha256:
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    },
    {
      name: 'xyz.txt',
      url: 'http://localhost:8444/xyz',
      sha256:
        '3608bca1e44ea6c4d268eb6db02260269892c0b42b86bbf1e77a6fa16c3c9282',
    },
    {
      name: 'tuv.txt',
      url: 'http://localhost:8444/tuv',
      sha256:
        'fadfef49b40bf551a279f820bd863ac96aebcbf39b4431dff4f0d5cb62dd5303',
    },
  ]

  test.only('should download all params correctly', async () => {
    // Arrange
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => 'string')
    ;(jest.spyOn(fs, 'statSync') as jest.Mock).mockImplementation(() => ({
      isFile: jest.fn(),
    }))
    ;(jest.spyOn(fs, 'createWriteStream') as jest.Mock).mockReturnValue({
      on: jest.fn().mockImplementation((e: string, cb) => cb()),
      close: jest.fn(),
    })

    // Act
    await checkHashAndDownloadParams({
      params,
      outputDir: 'a/b',
      onProgress: jest.fn(),
    })

    // Assert
    expect(fs.readFileSync(absPath0, 'utf-8')).toEqual('abc')
    expect(fs.readFileSync(absPath1, 'utf-8')).toEqual('xyz')
    expect(fs.readFileSync(absPath2, 'utf-8')).toEqual('tuv')
  })

  test('should not remove/re-download valid params', async () => {
    const onProgress = jest.fn()
    await checkHashAndDownloadParams({
      params,
      outputDir,
      onProgress,
    })
    // abc.txt is mocked with correct data, so it should not be re-downloaded
    expect(
      onProgress.mock.calls.some(c => c[0] === 'Downloading abc.txt...'),
    ).toEqual(false)
  })

  test('should remove/re-download invalid params', async () => {
    const onProgress = jest.fn()
    await checkHashAndDownloadParams({
      params,
      outputDir,
      onProgress,
    })
    // xyz.txt is mocked with incorrect data, so it should be re-downloaded
    expect(
      onProgress.mock.calls.some(c => c[0] === 'Downloading xyz.txt...'),
    ).toEqual(true)
    // tuv.txt is not existed on each mock, so it should be re-downloaded
    expect(
      onProgress.mock.calls.some(c => c[0] === 'Downloading tuv.txt...'),
    ).toEqual(true)
  })
})
