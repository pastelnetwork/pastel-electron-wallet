import { TImageOptimizationResult } from '../nft/addNFT/imageOptimization/ImageOptimization.types'
import { ipcMain } from 'electron'
import { TRendererEvents } from './rendererEvents'
import { browserWindow } from './window'
import { TImageType } from '../nft/addNFT/AddNft.constants'

export type TMainEvents = {
  retryInitializingApp: null
  rendererStarted: null
  rendererIsReadyForQuit: null
  restartApp: null
}

export type TMainTasks = {
  optimizeImage(payload: {
    arrayBuffer: ArrayBuffer
    type: TImageType
  }): Promise<TImageOptimizationResult>

  showSaveTransactionsAsCSVDialog(): Promise<{ filePath?: string }>
}

export const onMainEvent = <Channel extends keyof TMainEvents>(
  channel: Channel,
  callback: (payload: TMainEvents[Channel]) => void,
): void => {
  ipcMain.on(channel, (event, payload) => callback(payload))
}

export const mainEventPromise = <Channel extends keyof TMainEvents>(
  channel: Channel,
): Promise<TMainEvents[Channel]> => {
  return new Promise(resolve =>
    ipcMain.once(channel, (event, payload) => resolve(payload)),
  )
}
export const sendEventToRenderer = <Channel extends keyof TRendererEvents>(
  channel: Channel,
  payload: TRendererEvents[Channel],
): void => {
  browserWindow.current?.webContents.send(channel, payload)
}

export const handleMainTask = <Channel extends keyof TMainTasks>(
  channel: Channel,
  handler: TMainTasks[Channel],
): void => {
  ipcMain.handle(channel, (event, payload) => handler(payload))
}
