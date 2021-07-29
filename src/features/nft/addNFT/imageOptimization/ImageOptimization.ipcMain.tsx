import { app, ipcMain } from 'electron'
import { execFile } from 'child_process'
import path from 'path'
import fileUrl from 'file-url'
import {
  ImageProcessor,
  TImageOptimizationResult,
  TOptimizedFile,
} from './ImageOptimization.types'
import {
  imageTypes,
  maxQuality,
  minQuality,
  qualityStep,
} from '../AddNft.constants'
import fs from 'fs'
import os from 'os'
import { getBinPath, getRandomFileName } from './ImageOptimization.utils'

const platform: string = os.platform()
const pngquantBin = getBinPath(platform, 'pngquant')
const mozjpegBin = getBinPath(platform, 'mozjpeg')

if (!pngquantBin || !mozjpegBin) {
  throw new Error(
    `Image optimization doesn't not support current platform ${platform}`,
  )
}

const tmpPath = app.getPath('temp')

type TFile = { path: string; type: File['type'] }
type TGetArgs = (outputPath: string, quality: number) => string[]
type TTask = {
  process?: ReturnType<typeof execFile> | undefined
  cancelled: boolean
}

let currentTask: TTask

const PngquantQualityRangeErrorCode = 99

ipcMain.handle(
  'optimizeImage',
  async (e, file: TFile): Promise<TImageOptimizationResult> => {
    const result: TImageOptimizationResult = { status: 'success', files: [] }

    if (currentTask) {
      currentTask.cancelled = true
      currentTask.process?.kill()
    }

    const task = { cancelled: false }
    currentTask = task

    const [processor, command, getArgs] = getOptimizeArgs(file)

    try {
      for (
        let quality = minQuality;
        quality <= maxQuality;
        quality += qualityStep
      ) {
        try {
          const file = await optimize(task, command, getArgs, quality)
          result.files.push(file)
        } catch (error) {
          if (isCriticalError(processor, error)) {
            throw error
          }
        }
      }
    } catch (error) {
      if (task.cancelled) {
        return { status: 'cancelled' }
      }
      throw error
    }

    return result
  },
)

const getOptimizeArgs = (file: TFile): [ImageProcessor, string, TGetArgs] => {
  if (file.type === imageTypes.PNG) {
    return [
      ImageProcessor.pngquant,
      pngquantBin,
      (outputPath, quality) => [
        '-fo',
        outputPath,
        `--quality=${quality}-${quality + qualityStep}`,
        '--',
        file.path,
      ],
    ]
  } else if (file.type === imageTypes.JPG) {
    return [
      ImageProcessor.mozjpeg,
      mozjpegBin,
      (outputPath, quality) => [
        '-quality',
        String(quality),
        '-outfile',
        outputPath,
        file.path,
      ],
    ]
  }

  throw new Error(`Wrong image type: ${file.type}`)
}

const isCriticalError = (
  processor: ImageProcessor,
  error: { code: number },
) => {
  return (
    processor !== ImageProcessor.pngquant ||
    error.code !== PngquantQualityRangeErrorCode
  )
}

const optimize = (
  task: TTask,
  command: string,
  getArgs: (outputPath: string, quality: number) => string[],
  quality: number,
): Promise<TOptimizedFile> =>
  new Promise<TOptimizedFile>((resolve, reject) => {
    const outputPath = path.join(tmpPath, getRandomFileName())
    task.process = execFile(
      command,
      getArgs(outputPath, quality),
      async err => {
        task.process = undefined

        if (err) {
          return reject(err)
        }

        const { size } = await fs.promises.stat(outputPath)

        if (task.cancelled) {
          reject(new Error('Cancelled'))
        }

        resolve({
          fileUrl: fileUrl(outputPath),
          size: size,
          quality,
        })
      },
    )
  })
