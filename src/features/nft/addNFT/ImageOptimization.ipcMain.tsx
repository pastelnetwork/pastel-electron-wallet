import { app, ipcMain } from 'electron'
import { execFile } from 'child_process'
import path from 'path'
import fileUrl from 'file-url'
import { TImageOptimizationResult } from './ImageOptimization.types'
import { imageTypes } from './AddNft.constants'
import process from 'process'
import os from 'os'

const getBasePath = (name: string) =>
  app.isPackaged
    ? process.resourcesPath
    : path.join(app.getAppPath(), 'static', 'bin', name)

const platform: string = os.platform()

const pngquantBasePath = getBasePath('pngquant')
const pngquantBin = {
  darwin: path.join(pngquantBasePath, 'pngquant-mac'),
  linux: path.join(pngquantBasePath, 'pngquant-linux'),
  win32: path.join(pngquantBasePath, 'pngquant-win.exe'),
}[platform]

const guetzliBasePath = getBasePath('guetzli')
const guetzliBin = {
  darwin: path.join(guetzliBasePath, 'guetzli-mac'),
  linux: path.join(guetzliBasePath, 'guetzli-linux'),
  win32: path.join(guetzliBasePath, 'guetzli-win.exe'),
}[platform]

if (!pngquantBin || !guetzliBin) {
  throw new Error(
    `Image optimization doesn't not support current platform ${platform}`,
  )
}

const getRandomString = () => Math.random().toString(36).substring(2, 15)

const tmpPath = app.getPath('temp')

let currentProcess: ReturnType<typeof execFile> | undefined

const optimize = (command: string, args: string[]) =>
  new Promise<void>((resolve, reject) => {
    if (currentProcess) {
      currentProcess.kill()
    }

    currentProcess = execFile(command, args, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })

ipcMain.handle(
  'optimizeImage',
  async (
    e,
    file: { path: string; type: File['type'] },
    quality: number,
  ): Promise<TImageOptimizationResult> => {
    const outputPath = path.join(tmpPath, getRandomString())

    let command
    let args: string[]
    if (file.type === imageTypes.PNG) {
      command = pngquantBin
      args = ['-fo', outputPath, `--quality=${quality}-100`, '--', file.path]
    } else if (file.type === imageTypes.JPG) {
      command = guetzliBin
      args = ['--quality', String(quality), file.path, outputPath]
    } else {
      throw new Error(`Wrong image type: ${file.type}`)
    }

    try {
      await optimize(command, args)
    } catch (error) {
      if (error.killed) {
        return { status: 'cancelled' }
      }
      throw error
    }

    return { status: 'success', fileUrl: fileUrl(outputPath) }
  },
)
