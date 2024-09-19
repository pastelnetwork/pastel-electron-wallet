import fs from 'fs'
import path from 'path'
import progress from 'progress-stream'
import request from 'request'
import sha256File from 'sha256-file'
import { spawn } from 'child_process'
import readline from 'readline'

export interface IDownloadItem {
  name: string
  url: string
  sha256: string
  originalName?: string
}

export interface ICheckHashAndDownloadParams {
  params: IDownloadItem[]
  outputDir: string
  onProgress: (msg: string) => void
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
    if (fileExists) {
      const sha256 = sha256File(absPath)
      if (sha256 == p.sha256) {
        continue
      }
      try {
        await fs.promises.unlink(absPath)
      } catch (error) {
        throw new Error(
          `utils checkHashAndDownloadParams error: ${error.message}`,
        )
      }
    }
    const writer = fs.createWriteStream(absPath)
    onProgress(`Downloading ${p.name}...`)

    const r = request.get(p.url)

    r.on('response', resp => {
      if (resp.statusCode !== 200) {
        throw new Error(
          'utils checkHashAndDownloadParams request.get error: can not download file',
        )
      }

      const total = parseInt(resp.headers['content-length'] || '0', 10)
      const str = progress({ time: 100 }, pgrs => {
        const percentage = Math.round((pgrs.transferred * 100) / total)
        onProgress(`Downloading ${p.name}... ${percentage}%`)
      })

      resp.pipe(str).pipe(writer)
    })
    const promise = new Promise<void>((resolve, reject) => {
      writer.on('finish', async () => {
        writer.close()
        resolve()
      })

      writer.on('error', async e => {
        writer.close()
        try {
          await fs.promises.unlink(absPath)
        } catch (error) {
          throw new Error(
            'utils checkHashAndDownloadParams request.get error: error deleting file',
          )
        }
        reject(`utils wricheckHashAndDownloadParamster error: ${e.message}`)
      })
    })

    await promise
  }
}

export const filterLogKeywords = [
  'Installing',
  'Downloading',
  'Starting',
  'Checking',
  'Waiting',
  'successfully',
  'Finished',
]

export const spawnProcess = (
  binPath: string,
  args: string[],
  { onStdoutLine }: { onStdoutLine?(line: string): void } = {},
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(binPath, args)

    if (onStdoutLine) {
      const lineReader = readline.createInterface({
        input: process.stdout,
        crlfDelay: Infinity,
      })

      lineReader.on('line', (line: string) => {
        onStdoutLine(line)
        if (line.includes('Y/N')) {
          process.stdin.write('Y')
          process.stdin.end()
        }
      })
    }

    const errorChunks: Buffer[] = []
    process.stderr.on('data', data => {
      errorChunks.push(data)
    })

    process.on('close', () => {
      if (errorChunks.length === 0) {
        resolve()
      } else {
        reject(new Error(Buffer.concat(errorChunks).toString()))
      }
    })
  })
}

export const startProcess = async (pastelUtilityBinPath: string, handleProcessLogging: (line: string) => void) => {
  const args = ['start', 'walletnode']
  return spawnProcess(pastelUtilityBinPath, args, {
    onStdoutLine: handleProcessLogging,
  },)
}
export const stopWalletNode = async (pastelUtilityBinPath: string, handleProcessLogging: (line: string) => void) => {
  await spawnProcess(pastelUtilityBinPath, ['stop', 'walletnode'], {
    onStdoutLine: handleProcessLogging,
  },)
}
export const installProcess = async (pastelUtilityBinPath: string, handleProcessLogging: (line: string) => void) => {
  await spawnProcess(
    pastelUtilityBinPath,
    ['install', 'walletnode', '--network', 'mainnet', '--force', '--use-snapshot', 'true', '--snapshot-name', 'snapshot-latest-mainnet.tar.gz'],
    {
      onStdoutLine: handleProcessLogging,
    },
  )
}

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
