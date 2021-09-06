import { startWalletNode, stopWalletNode } from './walletNode'
import {
  handleMainTask,
  mainEventPromise,
  onMainEvent,
  sendEventToRenderer,
} from './mainEvents'
import { app, dialog, shell } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import log from 'electron-log'
import sourceMapSupport from 'source-map-support'
import electronDebug from 'electron-debug'
import { redirectDeepLinkingUrl, setupDeepLinking } from '../deepLinking'
import { browserWindow, createWindow } from './window'
import {
  debugLogPath,
  migrationsPath,
  pastelConfigFilePath,
  pastelWalletDirPath,
  sentTxStorePath,
  sqliteFilePath,
} from './paths'
import initServeStatic, { closeServeStatic } from '../serveStatic'
import { setupOptimizeImageHandler } from '../nft/addNFT/imageOptimization/ImageOptimization.main'
import { setupAutoUpdater } from './autoUpdater'
import { readRpcConfig } from '../rpcConfig'
import { ignorePromiseError } from '../../common/utils/promises'
import { TRPCConfig } from '../../api/pastel-rpc'

export const mainSetup = async (): Promise<void> => {
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
  createWindow(onWindowClose)
}

let rpcConfig: TRPCConfig | undefined

onMainEvent('rendererStarted', () => {
  // We have to pass isPackaged and app paths via IPC because electron `remote` api is deprecated
  sendEventToRenderer('setAppInfo', {
    isPackaged: app.isPackaged,
    appVersion: app.getVersion(),
    sentTxStorePath,
    debugLogPath,
    pastelWalletDirPath,
    sqliteFilePath,
    migrationsPath,
  })

  // in case of page reload we already have rpcConfig and no need to launch wallet node again
  if (rpcConfig) {
    sendEventToRenderer('setRpcConfig', {
      rpcConfig,
    })
    return
  }

  initServeStatic()
  retriableAppSetup()
})

export const retriableAppSetup = async (): Promise<void> => {
  try {
    await startWalletNode()
    rpcConfig = await readRpcConfig(pastelConfigFilePath)

    sendEventToRenderer('setRpcConfig', {
      rpcConfig,
    })
    redirectDeepLinkingUrl()
  } catch (error) {
    sendEventToRenderer('appLoadingFailed', { error: error.message })
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

  handleMainTask('showSaveTransactionsAsCSVDialog', async () => {
    return await dialog.showSaveDialog({
      title: 'Save Transactions As CSV',
      defaultPath: 'pastelwallet_transactions.csv',
      filters: [
        {
          name: 'CSV File',
          extensions: ['csv'],
        },
      ],
      properties: ['showOverwriteConfirmation'],
    })
  })
}

let waitingForClose = false
let proceedToClose = false

export const resetWindowCloseFlags = (): void => {
  waitingForClose = proceedToClose = false
}

export const onWindowClose = async (event: Event): Promise<void> => {
  // If we are clear to close, then return and allow everything to close
  if (proceedToClose) {
    console.warn('proceed to close, so closing')
    return
  }

  // If we're already waiting for close, then don't allow another close event to actually close the window
  if (waitingForClose) {
    console.warn('Waiting for close... Timeout in 10s')
    event.preventDefault()
    return
  }

  waitingForClose = true
  event.preventDefault()

  closeServeStatic()

  sendEventToRenderer('prepareToQuit', null)

  // Failsafe, timeout after 10 seconds
  setTimeout(() => {
    waitingForClose = false
    proceedToClose = true
    console.warn('Timeout, quitting')
    app.quit()
  }, 10 * 1000)

  await mainEventPromise('rendererIsReadyForQuit')
  await ignorePromiseError(stopWalletNode())

  waitingForClose = false
  proceedToClose = true
  app.quit()
}
