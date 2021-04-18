import axios from 'axios'
import fs from 'fs'
import path from 'path'
import sha256File from 'sha256-file'

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

type TProgressEvent = {
  loaded: number
  total: number
}

async function exists(path: string): Promise<boolean> {
  try {
    await fs.promises.stat(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return Promise.resolve(false)
    } else {
      throw new Error(`utils exists error: ${err.message}`)
    }
  }
  return Promise.resolve(true)
}

export const checkHashAndDownloadParams = async ({
  params,
  outputDir,
  onProgress,
}: ICheckHashAndDownloadParams): Promise<void> => {
  const dirExists = await exists(outputDir)
  if (!dirExists) {
    await fs.promises.mkdir(outputDir)
  }

  for (let i = 0; i < params.length; i++) {
    const p = params[i]

    onProgress(`Checking ${p.name}...`)
    const absPath = path.join(outputDir, p.name)

    const fileExists = await exists(absPath)
    const sha256 = sha256File(absPath)

    // console.log(fileExists, sha256)

    if (fileExists && sha256 == p.sha256) {
      continue
    } else {
      await fs.promises.unlink(absPath)
    }

    onProgress(`Downloading ${p.name}...`)

    const resp = await axios({
      url: p.url,
      method: 'GET',
      responseType: 'stream',
      onDownloadProgress: (e: TProgressEvent) => {
        const percentage = Math.round((e.loaded * 100) / e.total)
        onProgress(`Downloading ${p.name}: ${percentage}%`)
      },
    })

    if (resp.status !== 200) {
      throw new Error(
        'utils checkHashAndDownloadParams axios.get error: can not download file',
      )
    }

    const writer = fs.createWriteStream(absPath)

    resp.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        writer.close()
        resolve()
      })
      writer.on('error', e => {
        writer.close()
        fs.promises.unlink(absPath)
        reject(e)
      })
    })
  }
}
