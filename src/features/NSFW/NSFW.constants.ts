import fileUrl from 'file-url'
import path from 'path'
import { remote } from 'electron'
import process from 'process'

const basePath = remote.app.isPackaged
  ? process.resourcesPath
  : path.join(remote.app.getAppPath(), 'static')

export const MODEL_PATH = fileUrl(path.join(basePath, 'nsfwjs-model')) + '/'

export const NSWFProbabilityThreshold = 0.85
