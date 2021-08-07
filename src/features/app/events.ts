import { browserWindow } from '../../common/utils/app'
import { ipcMain, ipcRenderer } from 'electron'
import { TImageOptimizationResult } from '../nft/addNFT/imageOptimization/ImageOptimization.types'

// keys for channel names, values for payload type, null for no payload
export type MainEvents = {
  startWalletNode: null
  rendererIsReady: null
  rendererIsReadyForQuit: null
  restartApp: null
}

export type RendererEvents = {
  updateAppLoadingStatus:
    | { type: 'failed'; error: string }
    | { type: 'logProgress'; message: string }
  prepareToQuit: null
  pastelPhotopea: null
  pastelSpriteEditorTool: null
  about: null
  squooshTool: null
  glitchImage: null
  updateDownloaded: null
  deepLink: { view: string; param: string }
  pasteld: null
  payuri: string | null
  import: null
  importani: null
  exportalltx: null
  exportall: null
}

// keys for channel names, value is a type of handler function
export type MainTasks = {
  optimizeImage: (payload: {
    path: string
    type: File['type']
  }) => Promise<TImageOptimizationResult>
}

export const sendEventToMain = <Channel extends keyof MainEvents>(
  channel: Channel,
  payload: MainEvents[Channel],
): void => {
  ipcRenderer.send(channel, payload)
}

export const onMainEvent = <Channel extends keyof MainEvents>(
  channel: Channel,
  callback: (payload: MainEvents[Channel]) => void,
): void => {
  ipcMain.on(channel, (event, payload) => callback(payload))
}

export const sendEventToRenderer = <Channel extends keyof RendererEvents>(
  channel: Channel,
  payload: RendererEvents[Channel],
): void => {
  browserWindow.current?.webContents.send(channel, payload)
}

export const onRendererEvent = <Channel extends keyof RendererEvents>(
  channel: Channel,
  callback: (payload: RendererEvents[Channel]) => void,
): void => {
  ipcRenderer.on(channel, (event, payload) => callback(payload))
}

export const invokeMainTask = <Channel extends keyof MainTasks>(
  channel: Channel,
  payload: Parameters<MainTasks[Channel]>[0],
): ReturnType<MainTasks[Channel]> => {
  return ipcRenderer.invoke(channel, payload) as ReturnType<MainTasks[Channel]>
}

export const handleMainTask = <Channel extends keyof MainTasks>(
  channel: Channel,
  handler: MainTasks[Channel],
): void => {
  ipcMain.handle(channel, (event, payload) => handler(payload))
}
