import fs from 'fs'
import path from 'path'
import progress from 'progress-stream'
import request from 'request'
import tar from 'tar'
import zlib from 'zlib'
import { ipcRenderer } from 'electron'

export const downloadSnapshotFile = async ({
  outputDir,
  url,
  fileName,
  onProgress,
}: {
  outputDir: string
  url: string
  fileName: string
  onProgress: (process: string) => void
}): Promise<void> => {
  const absPath = path.join(outputDir, fileName)
  const writer = fs.createWriteStream(absPath)
  const r = request.get(url)
  r.on('response', resp => {
    if (resp.statusCode !== 200) {
      throw new Error(
        'utils checkHashAndDownloadParams request.get error: can not download file',
      )
    }

    const total = parseInt(resp.headers['content-length'] || '0', 10)
    const str = progress({ time: 100 }, pgrs => {
      const percentage = Math.round((pgrs.transferred * 100) / total)
      onProgress(`Downloading ${percentage}% ...`)
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
          'utils downloadSnapshotFile request.get error: error deleting file',
        )
      }
      reject(`utils downloadSnapshotFile error: ${e.message}`)
    })
  })

  await promise
  onProgress('Extracting...')
  fs.createReadStream(absPath)
    .pipe(zlib.createGunzip())
    .pipe(tar.extract({ cwd: outputDir }))
    .on('error', err => {
      console.error('An error occurred:', err)
      onProgress(`An error occurred: ${err?.message}`)
    })
    .on('end', () => {
      try {
        const pastelConfFile = path.join(outputDir, 'pastel.conf')
        if (fs.existsSync(pastelConfFile)) {
          const config = fs
            .readFileSync(path.join(outputDir, 'pastel.conf'))
            .toString()
          if (config.indexOf('-txindex=1') === -1) {
            const newConfig = config.split('\n')
            newConfig.push('-txindex=1')
            fs.writeFileSync(pastelConfFile, newConfig.join('\n'))
          }
        }
        onProgress('Restarting....')
        // try {
        //   fs.unlinkSync(absPath)
        // } catch (error) {
        //   console.error('unlinkSync downloadSnapshotFile error: ', error)
        // }
        ipcRenderer.send('reset_pastel_app')
      } catch (error) {
        onProgress(`Error: ${error.message}`)
      }
    })
}
