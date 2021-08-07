import { mainEventPromise, onMainEvent, sendEventToRenderer } from './events'
import { app, shell } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import log from 'electron-log'
import sourceMapSupport from 'source-map-support'
import electronDebug from 'electron-debug'
import { redirectDeepLinkingUrl, setupDeepLinking } from '../deepLinking'
import { createWindow } from './createWindow'
import { browserWindow } from '../../common/utils/app'
import initServeStatic from '../serveStatic'
import { setupOptimizeImageHandler } from '../nft/addNFT/imageOptimization/ImageOptimization.main'
import { setupAutoUpdater } from './autoUpdater'
import { readRpcConfig } from '../rpcConfig'

export const appSetup = async (): Promise<void> => {
  setupDeepLinking()
  enableDevTools()
  enableSourceMapSupport()
  enableElectronDebug()
  setupEventListeners()
  setupAutoUpdater()
  setupOptimizeImageHandler()
  setupLogs()

  app.whenReady().then(setupWindow)
}

const setupWindow = async () => {
  createWindow()

  await mainEventPromise('rendererStarted')

  initServeStatic()
  retriableAppSetup()
}

const retriableAppSetup = async () => {
  try {
    const rpcConfig = await readRpcConfig()
    sendEventToRenderer('setupIsReady', { rpcConfig })
    redirectDeepLinkingUrl()
  } catch (error) {
    sendEventToRenderer('updateAppLoadingStatus', {
      type: 'failed',
      error: error.message,
    })
    log.error(error)
  }
}

onMainEvent('retryInitializingApp', retriableAppSetup)

const setupLogs = () => {
  if (app.isPackaged) {
    log.transports.file.level = 'info'
    log.transports.console.level = false
  }
}

const enableDevTools = () => {
  // Enable dev tools
  if (!app.isPackaged) {
    app.whenReady().then(() => {
      installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name: string) => console.warn(`Added Extension:  ${name}`))
        .catch((err: Error) => console.warn('An error occurred: ', err))
    })
  }
}

const enableSourceMapSupport = () => {
  if (process.env.NODE_ENV === 'production') {
    sourceMapSupport.install()
  }
}

const enableElectronDebug = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    electronDebug()
  }
}

const setupEventListeners = () => {
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!browserWindow.current) {
      setupWindow()
    }
  })

  app.on('window-all-closed', () => app.quit())

  app.on('web-contents-created', (event, webContents) => {
    webContents.on('new-window', async (eventInner, navigationUrl) => {
      eventInner.preventDefault()
      await shell.openExternal(navigationUrl)
    })
  })
}
