import fs from 'fs'
import http, { Server } from 'http'
import path from 'path'

import { checkHashAndDownloadParams } from '../utils'

describe('loading/utils', () => {
  // Build the mock server for downloading
  let server: Server | null = null
  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      server = http.createServer((req, res) => {
        // send the pathname to the response
        res.end(req.url?.substr(1) || '')
      })
      server.listen(8444).once('listening', resolve).once('error', reject)
    })
  })
  afterAll(async () => {
    await new Promise((resolve, reject) => {
      if (!server) {
        resolve(undefined)
        return
      }
      server.close(err => (err ? reject(err) : resolve(undefined)))
    })
  })

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
  const outputDir = __dirname

  // Prepare existing mock files
  beforeEach(() => {
    const absPath0 = path.join(outputDir, params[0].name)
    // abc.txt should not be replaced because of correct content
    fs.writeFileSync(absPath0, 'abc')

    const absPath1 = path.join(outputDir, params[1].name)
    // xyz.txt should be removed and replaced because of incorrect content
    fs.writeFileSync(absPath1, 'xyz1')

    // tuv.txt will be created
  })

  // Remove mock files
  afterEach(() => {
    params.forEach(p => {
      const absPath = path.join(outputDir, p.name)
      if (fs.existsSync(absPath)) {
        fs.unlinkSync(absPath)
      }
    })
  })

  test('should download all params correctly', async () => {
    const onProgress = jest.fn()
    await checkHashAndDownloadParams({
      params,
      outputDir,
      onProgress,
    })
    const absPath0 = path.join(outputDir, 'abc.txt')
    expect(fs.readFileSync(absPath0, 'utf-8')).toEqual('abc')
    const absPath1 = path.join(outputDir, 'xyz.txt')
    expect(fs.readFileSync(absPath1, 'utf-8')).toEqual('xyz')
    const absPath2 = path.join(outputDir, 'tuv.txt')
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
