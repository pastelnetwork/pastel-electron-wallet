import fs from 'fs'
import path from 'path'
import progress from 'progress-stream'
import request from 'request'
import sha256File from 'sha256-file'
import { promisify } from 'util'

export interface IDownloadItem {
  name: string
  url: string
  sha256: string
}
export interface ICheckHashAndDownloadParams {
  params: IDownloadItem[]
  outputDir: string
  onProgress: (msg: string) => void
}

export const checkHashAndDownloadParams = async ({
  params,
  outputDir,
  onProgress,
}: ICheckHashAndDownloadParams): Promise<void> => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  for (let i = 0; i < params.length; i++) {
    const p = params[i]

    onProgress(`Checking ${p.name}...`)
    const absPath = path.join(outputDir, p.name)
    let exists = await new Promise(resolve => fs.exists(absPath, resolve))
    const sha256 = exists && (await promisify(sha256File)(absPath))
    if (exists && sha256 !== p.sha256) {
      // Remove corrupted file to re-download
      fs.unlinkSync(absPath)
      exists = false
    }
    if (exists) {
      continue
    }

    onProgress(`Downloading ${p.name}...`)

    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(absPath)
      const req = request.get(p.url)
      req.on('response', res => {
        if (res.statusCode !== 200) {
          const err = `Response status was ${res.statusCode}`
          reject(err)
          return
        }
        const contentLength = parseInt(res.headers['content-length'] || '0', 10)
        const total = (contentLength / 1024 / 1024).toFixed(0)
        const str = progress({ time: 1000 }, pgrs => {
          const trans = (pgrs.transferred / 1024 / 1024).toFixed(0)
          onProgress(`Downloading ${p.name}... (${trans} MB / ${total} MB)`)
        })
        req.pipe(str).pipe(file)
      })
      file.on('finish', () => {
        file.close()
        resolve(undefined)
      })
      req.on('error', err => {
        reject(err.message)
        file.close()
        fs.unlinkSync(absPath)
      })
      file.on('error', err => {
        reject(err.message)
        file.close()
        fs.unlinkSync(absPath)
      })
    })
  }
}
