import { app } from 'electron'
import { execFile } from 'child_process'
import path from 'path'
import fileUrl from 'file-url'
import {
  ImageProcessor,
  TImageOptimizationResult,
  TOptimizedFile,
} from './ImageOptimization.types'
import {
  ImageType,
  maxQuality,
  minQuality,
  qualityStep,
  TImageType,
} from '../AddNft.constants'
import fs from 'fs'
import { handleMainTask } from '../../../app/mainEvents'
import { mozjpegBinPath, pngquantBinPath } from '../../../app/paths'

export const getRandomFileName = (): string =>
  Math.random().toString(36).substring(2, 15)

const tmpPath = app.getPath('temp')

type TGetArgs = (outputPath: string, quality: number) => string[]
type TTask = {
  process?: ReturnType<typeof execFile> | undefined
  cancelled: boolean
}

let currentTask: TTask

const PngquantQualityRangeErrorCode = 99

export const setupOptimizeImageHandler = (): void => {
  handleMainTask(
    'optimizeImage',
    async (file): Promise<TImageOptimizationResult> => {
      const result: TImageOptimizationResult = { status: 'success', files: [] }

      if (currentTask) {
        currentTask.cancelled = true
        currentTask.process?.kill()
      }

      const task = { cancelled: false }
      currentTask = task

      try {
        const inputPath = await writeArrayBufferToTempFile(file.arrayBuffer)
        if (task.cancelled) {
          throw new Error('Cancelled')
        }

        const [processor, command, getArgs] = getOptimizeArgs(
          file.type,
          inputPath,
        )

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
}

const writeArrayBufferToTempFile = async (arrayBuffer: ArrayBuffer) => {
  const filePath = path.join(tmpPath, getRandomFileName())
  await fs.promises.writeFile(filePath, Buffer.from(arrayBuffer))
  return filePath
}

const getOptimizeArgs = (
  type: TImageType,
  inputPath: string,
): [ImageProcessor, string, TGetArgs] => {
  if (type === ImageType.PNG) {
    return [
      ImageProcessor.pngquant,
      pngquantBinPath,
      (outputPath, quality) => [
        '-fo',
        outputPath,
        `--quality=${quality}-${quality + qualityStep}`,
        '--',
        inputPath,
      ],
    ]
  } else {
    return [
      ImageProcessor.mozjpeg,
      mozjpegBinPath,
      (outputPath, quality) => [
        '-quality',
        String(quality),
        '-outfile',
        outputPath,
        inputPath,
      ],
    ]
  }
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
