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
  const args = ['start', 'node']
  return spawnProcess(pastelUtilityBinPath, args, {
    onStdoutLine: handleProcessLogging,
  },)
}
export const stopWalletNode = async (pastelUtilityBinPath: string, handleProcessLogging: (line: string) => void) => {
  await spawnProcess(
    pastelUtilityBinPath, ['stop', 'node'],
    {
      onStdoutLine: handleProcessLogging,
    },
  )
}

const nodes =
`137.184.118.147
143.198.58.140
146.190.175.119
154.12.230.224
154.12.240.59
154.12.241.117
154.12.241.128
154.12.244.163
154.12.253.219
154.12.253.220
154.12.253.225
154.12.254.248
154.12.254.251
154.12.255.11
154.12.255.24
154.12.255.9
154.38.162.90
154.38.166.116
154.38.166.118
154.38.166.119
154.38.166.120
154.38.177.234
154.53.32.125
154.53.32.126
154.53.32.146
154.53.32.48
154.53.60.47
154.53.61.221
154.53.61.222
154.53.63.109
154.53.63.115
157.173.193.198
157.173.193.199
157.173.193.200
157.173.193.201
157.173.193.202
157.230.115.155
159.65.114.136
159.65.149.140
159.89.164.214
165.227.130.203
165.227.161.206
165.227.169.213
167.86.100.60
167.86.107.194
167.86.107.225
167.86.108.177
167.86.109.139
167.86.110.108
167.86.113.250
167.86.66.254
167.86.67.143
167.86.68.124
167.86.68.179
167.86.69.188
167.86.77.216
18.116.179.95
18.218.28.57
18.220.120.83
188.166.160.37
207.180.250.195
207.180.250.197
207.180.250.245
207.180.252.205
207.180.253.124
207.180.253.218
207.180.255.57
207.244.235.138
3.12.66.189
3.128.23.169
3.132.60.47
3.135.47.3
3.136.75.28
3.141.226.93
3.18.200.136
31.220.99.58
31.220.99.59
31.220.99.60
31.220.99.61
31.220.99.62
38.242.137.199
38.242.137.201
38.242.158.208
38.242.159.6
38.242.159.85
38.242.159.95
45.137.194.13
45.137.194.19
45.137.194.22
52.14.134.207
64.227.110.96
66.94.114.198
66.94.115.17
66.94.125.53
75.119.152.80
84.54.23.106
84.54.23.108
84.54.23.113
84.54.23.121
84.54.23.129
84.54.23.133
84.54.23.136
84.54.23.143
86.48.1.252
86.48.3.8
89.117.78.88
89.117.78.89
89.117.78.90
89.117.78.91
89.117.78.92
89.117.79.22
89.117.79.23
89.117.79.24
89.117.79.25
89.117.79.2`;
export const installProcess = async (pastelUtilityBinPath: string, handleProcessLogging: (line: string) => void) => {
  await spawnProcess(
    pastelUtilityBinPath,
    ['install', 'node', '--network', 'mainnet', '--force', '--use-snapshot', '--snapshot-name', 'snapshot-latest-mainnet-txind.tar.zst', '--extra-flags', 'txindex=1', '-p', nodes.replace(/\n/g, ',')],
    {
      onStdoutLine: handleProcessLogging,
    },
  )
}
