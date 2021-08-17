import { ipcRenderer, IpcRendererEvent } from 'electron'
import { TRPCConfig } from '../../api/pastel-rpc'
import { useEffect } from 'react'
import type { TMainEvents, TMainTasks } from './mainEvents'

export type TRendererEvents = {
  appLoadingFailed: { error: string }
  appLoadingLogProgress: { message: string }
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
  setAppInfo: {
    isPackaged: boolean
    appVersion: string
    sentTxStorePath: string
    debugLogPath: string
    pastelWalletDirPath: string
    sqliteFilePath: string
  }
  setRpcConfig: {
    rpcConfig: TRPCConfig
  }
}

export const sendEventToMain = <Channel extends keyof TMainEvents>(
  channel: Channel,
  payload: TMainEvents[Channel],
): void => {
  ipcRenderer.send(channel, payload)
}

export const onRendererEvent = <Channel extends keyof TRendererEvents>(
  channel: Channel,
  callback: (payload: TRendererEvents[Channel]) => void,
): void => {
  ipcRenderer.on(channel, (event, payload) => callback(payload))
}

export const useRendererEvent = <Channel extends keyof TRendererEvents>(
  channel: Channel,
  callback: (payload: TRendererEvents[Channel]) => void,
): void => {
  useEffect(() => {
    const listener = (
      event: IpcRendererEvent,
      payload: TRendererEvents[Channel],
    ) => callback(payload)

    ipcRenderer.on(channel, listener)
    return () => {
      ipcRenderer.removeListener(channel, listener)
    }
  }, [])
}

export const invokeMainTask = <Channel extends keyof TMainTasks>(
  channel: Channel,
  payload: Parameters<TMainTasks[Channel]>[0],
): ReturnType<TMainTasks[Channel]> => {
  return ipcRenderer.invoke(channel, payload) as ReturnType<TMainTasks[Channel]>
}
