import 'core-js/stable'
import 'regenerator-runtime/runtime'
// install shortcuts on windows
import 'electron-squirrel-startup'

import {
  app,
  autoUpdater,
  BrowserWindow,
  ipcMain,
  shell,
  dialog,
} from 'electron'
import electronDebug from 'electron-debug'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-assembler'
import log from 'electron-log'
import sourceMapSupport from 'source-map-support'
import path from 'path'
import os from 'os'
import kill from 'kill-port'

import pkg from '../package.json'
import {
  forceSingleInstanceApplication,
  redirectDeepLinkingUrl,
  registerCustomProtocol,
} from './features/deepLinking'
import initServeStatic, { closeServeStatic } from './features/serveStatic'
import MenuBuilder from './menu'

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
    width: 1300,
    height: 728,
    minHeight: 500,
    minWidth: 1100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  })
  mainWindow = w

  w.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  w.webContents.on('did-frame-finish-load', () => {
    // Enable dev tools
    if (!app.isPackaged) {
      app.whenReady().then(() => {
        installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], true)
          .then((name: string) => console.warn(`Added Extension:  ${name}`))
          .catch((err: Error) => console.warn('An error occurred: ', err))
          .finally(() => {
            // Open the DevTools.
            w.webContents.openDevTools()
          })
      })
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
app.on('ready', createWindow)
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

  initServeStatic(app.isPackaged)
})

ipcMain.on('start_app', () => {
  if (mainWindow) {
    mainWindow.webContents.send(
      'app-info',
      JSON.stringify({
        isPackaged: app.isPackaged,
        locatePastelConfDir: locatePastelConfDir(),
        appVersion: app.getVersion(),
        locatePastelConf: locatePastelConf(),
        pasteldBasePath: pasteldBasePath(),
        locatePasteld: locatePasteld(),
        locatePastelParamsDir: locatePastelParamsDir(),
        locatePastelWalletDir: locatePastelWalletDir(),
        locateSentTxStore: locateSentTxStore(),
      }),
    )
  }
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})

ipcMain.on('reset_pastel_app', async () => {
  await kill(9933)
  await kill(9932)
  await kill(19932)
  await kill(19933)
  app.relaunch()
  app.exit(0)
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

const locatePastelConfDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Pastel')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.pastel')
  }

  return path.join(app.getPath('appData'), 'Pastel')
}

const locatePastelConf = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Pastel', 'pastel.conf')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.pastel', 'pastel.conf')
  }

  return path.join(app.getPath('appData'), 'Pastel', 'pastel.conf')
}

const pasteldBasePath = () => {
  if (app.isPackaged) {
    return process.resourcesPath
  }

  return path.join(app.getAppPath(), 'static', 'bin')
}

const locatePasteld = () => {
  if (os.platform() === 'darwin') {
    return path.join(pasteldBasePath(), 'pasteld-mac')
  }

  if (os.platform() === 'linux') {
    return path.join(pasteldBasePath(), 'pasteld-linux')
  }

  return path.join(pasteldBasePath(), 'pasteld-win.exe')
}

const locatePastelParamsDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'PastelParams')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.pastel-params')
  }

  return path.join(app.getPath('appData'), 'PastelParams')
}

const locatePastelWalletDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'pastelwallet')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), 'pastelwallet')
  }

  return path.join(app.getPath('appData'), 'pastelwallet')
}

const locateSentTxStore = (): string => {
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

ipcMain.handle(
  'showSaveDialog_IPC',
  async (_, title, defaultPath, filters, properties) => {
    return dialog.showSaveDialog({ title, defaultPath, filters, properties })
  },
)
