import { app } from 'electron'
import process from 'process'
import path from 'path'

const getBasePath = (name: string) =>
  app.isPackaged
    ? process.resourcesPath
    : path.join(app.getAppPath(), 'static', 'bin', name)

export const getBinPath = (
  platform: string,
  name: string,
): string | undefined => {
  const basePath = getBasePath(name)
  return {
    darwin: path.join(basePath, `${name}-mac`),
    linux: path.join(basePath, `${name}-linux`),
    win32: path.join(basePath, `${name}-win.exe`),
  }[platform]
}

export const getRandomFileName = (): string =>
  Math.random().toString(36).substring(2, 15)
