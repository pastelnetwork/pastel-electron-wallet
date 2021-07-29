import 'core-js/stable'
import 'regenerator-runtime/runtime'
// install shortcuts on windows
import 'electron-squirrel-startup'

import { app, autoUpdater, BrowserWindow, ipcMain, shell } from 'electron'

import electronDebug from 'electron-debug'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import log from 'electron-log'
import sourceMapSupport from 'source-map-support'
import os from 'os'
import path from 'path'

import pkg from '../package.json'
import {
  forceSingleInstanceApplication,
  redirectDeepLinkingUrl,
  registerCustomProtocol,
  registerFileProtocol,
} from './features/deepLinking'
import initServeStatic, { closeServeStatic } from './features/serveStatic'
import MenuBuilder from './menu'
import './features/nft/addNFT/imageOptimization/ImageOptimization.ipcMain'

// Deep linked url
let deepLinkingUrl: string[] | string
let mainWindow: BrowserWindow | null = null

const gotTheLock = app.requestSingleInstanceLock()
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    forceSingleInstanceApplication(mainWindow, deepLinkingUrl, argv)
  })
} else {
  app.quit()
}

// Enable dev tools
if (!app.isPackaged) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name: string) => console.warn(`Added Extension:  ${name}`))
      .catch((err: Error) => console.warn('An error occurred: ', err))
  })
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    log.transports.console.level = false
  }
}

if (process.env.NODE_ENV === 'production') {
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  electronDebug()
}

let waitingForClose = false
let proceedToClose = false

const createWindow = async () => {
  const w = new BrowserWindow({
    show: false,
    width: 1440,
    height: 728,
    minHeight: 500,
    minWidth: 900,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // Allow node integration because we're only loading local content here.
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  })
  mainWindow = w

  w.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  w.webContents.on('did-frame-finish-load', () => {
    // Open the DevTools.
    if (!app.isPackaged) {
      w.webContents.openDevTools()
    }
  })

  // Protocol handler for win32
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deepLinkingUrl = process.argv.slice(1)
  }

  app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', async (eventInner, navigationUrl) => {
      eventInner.preventDefault()
      await shell.openExternal(navigationUrl)
    })

    w.webContents.send('app-info', {
      isPackaged: app.isPackaged,
      locatePastelConfDir: getLocatePastelConfDir(),
    })
  })
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  w.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    if (process.env.START_MINIMIZED) {
      w.minimize()
    } else {
      w.show()
      w.focus()
    }
  })
  w.on('close', (event: Event) => {
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

    // to load expert console terminal
    ipcMain.on('terminaldone', () => {
      waitingForClose = false
      proceedToClose = true
      app.quit()
    })

    ipcMain.on('appquitdone', () => {
      waitingForClose = false
      proceedToClose = true
      app.quit()
    })

    closeServeStatic()

    // $FlowFixMe
    w.webContents.send('appquitting')
    // Failsafe, timeout after 10 seconds
    setTimeout(() => {
      waitingForClose = false
      proceedToClose = true
      console.warn('Timeout, quitting')
      app.quit()
    }, 10 * 1000)
  })
  w.on('closed', () => {
    mainWindow = null
  })
  const menuBuilder = new MenuBuilder(w)
  menuBuilder.buildMenu()
  // Remove this if your app does not use auto updates
  new AppUpdater()
}

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  app.quit()
})
app.on('ready', () => {
  createWindow()
  registerFileProtocol()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

registerCustomProtocol()

app.on('will-finish-launching', function () {
  // Protocol handler for osx
  app.on('open-url', function (event, url) {
    event.preventDefault()
    deepLinkingUrl = url
    redirectDeepLinkingUrl(deepLinkingUrl, mainWindow)
  })
})

ipcMain.on('app-ready', () => {
  if (app.isPackaged) {
    const feedURL = `${pkg.hostUrl}/${pkg.repoName}/${process.platform}-${
      process.arch
    }/${app.getVersion()}`

    autoUpdater.setFeedURL({
      url: feedURL,
      serverType: 'default',
    })
    autoUpdater.checkForUpdates()

    const fourHours = 4 * 60 * 60 * 1000
    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, fourHours)
  }

  redirectDeepLinkingUrl(deepLinkingUrl, mainWindow)

  const locatePastelConfDir = getLocatePastelConfDir()
  const locateSentTxStore = getLocateSentTxStore()
  initServeStatic(app.isPackaged)

  if (mainWindow?.webContents) {
    mainWindow.webContents.send('app-info', {
      isPackaged: app.isPackaged,
      locatePastelConfDir,
      appPathDir: getAppPathDir(),
      locateSentTxStore,
    })
  }
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})

autoUpdater.on(
  'update-downloaded',
  (event, releaseNotes, releaseName, updateURL) => {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('update_downloaded')
    }
    console.warn('update-downloaded', {
      event,
      releaseNotes,
      releaseName,
      updateURL,
    })
  },
)

autoUpdater.on('error', err => {
  console.warn(`autoUpdater error: ${err.message}`, err)
})

const getLocatePastelConfDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Pastel')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.pastel')
  }

  return path.join(app.getPath('appData'), 'Pastel')
}

const getLocateSentTxStore = (): string => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Pastel', 'senttxstore.dat')
  }

  if (os.platform() === 'linux') {
    return path.join(
      app.getPath('home'),
      '.local',
      'share',
      'psl-qt-wallet-org',
      'psl-qt-wallet',
      'senttxstore.dat',
    )
  }

  return path.join(app.getPath('appData'), 'Pastel', 'senttxstore.dat')
}

const getAppPathDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'))
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'))
  }

  return path.join(app.getPath('appData'))
}
