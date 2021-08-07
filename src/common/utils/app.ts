import { app, BrowserWindow, remote } from 'electron'
import process from 'process'
import path from 'path'
import os from 'os'

const anyApp = app || remote.app
const platform = os.platform()

export const isPackaged = anyApp.isPackaged

export const getBinPath = (fileNames?: {
  linux: string
  darwin: string
  windows: string
}): string => {
  let binPath: string
  if (anyApp.isPackaged) {
    binPath = process.resourcesPath
  } else {
    binPath = path.join(anyApp.getAppPath(), 'static', 'bin')
  }

  if (fileNames) {
    const fileName = fileNames[platform as keyof typeof fileNames]
    if (!fileName) {
      throw new Error(`Can't find executable for ${platform} platform`)
    }
    binPath = path.join(binPath, fileName)
  }

  return binPath
}

const pastelConfigDirPath =
  platform === 'linux'
    ? path.join(anyApp.getPath('home'), '.pastel')
    : path.join(anyApp.getPath('appData'), 'Pastel')

export const getPastelConfigPath = (filePath?: string): string => {
  return filePath
    ? path.join(pastelConfigDirPath, filePath)
    : pastelConfigDirPath
}

export const pastelConfigFilePath = getPastelConfigPath('pastel.conf')

export const debugLogPath = getPastelConfigPath('debug.log')

export const sentTxStorePath =
  platform === 'linux'
    ? path.join(
        anyApp.getPath('home'),
        '.local',
        'share',
        'psl-qt-wallet-org',
        'psl-qt-wallet',
        'senttxstore.dat',
      )
    : path.join(anyApp.getPath('appData'), 'Pastel', 'senttxstore.dat')

const appPath =
  platform === 'linux' ? anyApp.getPath('home') : anyApp.getPath('appData')

export const getAppPath = (filePath?: string): string => {
  return filePath ? path.join(appPath, filePath) : appPath
}

export const browserWindow: { current?: BrowserWindow } = {}
