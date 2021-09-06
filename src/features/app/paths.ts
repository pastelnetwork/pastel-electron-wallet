import { app } from 'electron'
import process from 'process'
import path from 'path'
import os from 'os'

let platform = os.platform() as string
if (platform === 'win32') {
  platform = 'windows'
}

const getBinPath = (fileNames: {
  linux: string
  darwin: string
  windows: string
}): string => {
  let binPath: string
  if (app.isPackaged) {
    binPath = process.resourcesPath
  } else {
    binPath = path.join(app.getAppPath(), 'static', 'bin')
  }

  const fileName = fileNames[platform as keyof typeof fileNames]
  if (!fileName) {
    throw new Error(`Can't find executable for ${platform} platform`)
  }
  binPath = path.join(binPath, fileName)

  return binPath
}

const configDirPath =
  platform === 'linux'
    ? path.join(app.getPath('home'), '.pastel')
    : path.join(app.getPath('appData'), 'Pastel')

const getConfigPath = (filePath: string): string => {
  return path.join(configDirPath, filePath)
}

export const pastelConfigFilePath = getConfigPath('pastel.conf')

export const debugLogPath = getConfigPath('debug.log')

export const sentTxStorePath =
  platform === 'linux'
    ? path.join(
        app.getPath('home'),
        '.local',
        'share',
        'psl-qt-wallet-org',
        'psl-qt-wallet',
        'senttxstore.dat',
      )
    : path.join(app.getPath('appData'), 'Pastel', 'senttxstore.dat')

// used by Addressbook
export const pastelWalletDirPath = getConfigPath('pastelwallet')

export const sqliteFilePath = getConfigPath('pasteldb.sqlite')

export const migrationsPath = app.isPackaged
  ? path.join(process.resourcesPath, 'migrations')
  : path.join(app.getAppPath(), 'src', 'features', 'pastelDB', 'migrations')

export const pngquantBinPath = getBinPath({
  darwin: 'pngquant-mac',
  linux: 'pngquant-linux',
  windows: 'pngquant-win.exe',
})

export const mozjpegBinPath = getBinPath({
  darwin: 'mozjpeg-mac',
  linux: 'mozjpeg-linux',
  windows: 'mozjpeg-win.exe',
})

export const pastelUtilityBinPath = getBinPath({
  linux: 'pastel-utility-linux-amd64',
  darwin: 'pastel-utility-darwin-amd64',
  windows: 'pastel-utility-windows-amd64.exe',
})
