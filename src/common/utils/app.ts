import path from 'path'
import os from 'os'
import { app, remote } from 'electron'

const anyApp = app || remote.app
const platform = os.platform()

const pastelConfigPath =
  platform === 'linux'
    ? path.join(anyApp.getPath('home'), '.pastel')
    : path.join(anyApp.getPath('appData'), 'Pastel')

export const getPastelConfigPath = (filePath?: string): string => {
  return filePath ? path.join(pastelConfigPath, filePath) : pastelConfigPath
}

export const pastelConfigFilePath = getPastelConfigPath('pastel.conf')

export const debugLogPath = getPastelConfigPath('debug.log')
