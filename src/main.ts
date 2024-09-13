import 'core-js/stable'
import 'regenerator-runtime/runtime'
// install shortcuts on windows
import 'electron-squirrel-startup'
import ElectronStore from 'electron-store'
import getFolderSize from 'get-folder-size'

import {
  app,
  autoUpdater,
  BrowserWindow,
  ipcMain,
  shell,
  dialog,
  protocol,
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
import fs from 'fs'
import kill from 'kill-port'
import fixPath from 'fix-path'

import pkg from '../package.json'
import {
  forceSingleInstanceApplication,
  redirectDeepLinkingUrl,
  registerCustomProtocol,
} from './features/deepLinking'
import {
  glitch,
  squoosh,
  inferenceClient,
} from './features/constants/ServeStatic'
import initServeStatic, {
  closeServeStatic,
  checkAndStartInitialInference,
  setupInitialInference,
  handleReloadInferenceClient,
} from './features/serveStatic'
import MenuBuilder from './menu'

if (['darwin', 'linux'].includes(os.platform())) {
  fixPath()
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'http',
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  {
    scheme: 'https',
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  {
    scheme: 'mailto',
    privileges: {
      standard: true,
    },
  },
])

ElectronStore.initRenderer()

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

const locatePastelConfDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Pastel')
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.pastel')
  }

  return path.join(app.getPath('appData'), 'Pastel')
}

const locateAppDir = () => {
  if (os.platform() === 'darwin') {
    return app.getPath('appData')
  }

  if (os.platform() === 'linux') {
    return app.getPath('home')
  }

  return app.getPath('appData')
}

const snapshotFile = path.join(locateAppDir(), 'snapshot-latest-mainnet.tar.gz')

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
      webSecurity: false,
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
    contents.on('will-navigate', async (eventInner, navigationUrl) => {
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

  try {
    if (fs.existsSync(snapshotFile)) {
      fs.unlinkSync(snapshotFile)
    }
  } catch {
    // noop
  }
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
const getPastelFolderSize = async () => {
  const info = await getFolderSize(locatePastelConfDir())
  if (!info.errors) {
    const totalSize = info.size / 1073741824 // ~ GB
    if (totalSize < 4 && mainWindow) {
      if (fs.existsSync(snapshotFile)) {
        fs.unlinkSync(snapshotFile)
      }
      mainWindow.webContents.send('download_snapshot')
    }
  }
}
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

  setupInitialInference({
    locatePastelConf: locatePastelConf(),
    locatePastelConfDir: locatePastelConfDir(),
    pasteldBasePath: pasteldBasePath(),
    locateAppDir: locateAppDir(),
  })

  initServeStatic(app.isPackaged)

  getPastelFolderSize()
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
  try {
    await Promise.all([
      kill(9933),
      kill(9932),
      kill(19932),
      kill(19933),
      kill(glitch.staticPort),
      kill(squoosh.staticPort),
      kill(inferenceClient.staticPort),
      kill(inferenceClient.socketPort),
    ])
  } catch (error) {
    log.error(error)
  }
  try {
    if (os.platform() === 'linux') {
      app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
    } else {
      app.relaunch()
    }
    app.exit(0)
  } catch (error) {
    log.error(error)
  }
})

ipcMain.on('force_reload_pastel_app', async () => {
  try {
    if (fs.existsSync(snapshotFile)) {
      fs.unlinkSync(snapshotFile)
    }
  } catch (error) {
    log.error(error)
  }
  if (mainWindow) {
    mainWindow.webContents.reloadIgnoringCache()
  }
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

ipcMain.on('start_initial_inference', () => {
  checkAndStartInitialInference(mainWindow, {
    locatePastelConf: locatePastelConf(),
    locatePastelConfDir: locatePastelConfDir(),
    pasteldBasePath: pasteldBasePath(),
    locateAppDir: locateAppDir(),
  })
})

ipcMain.on('reload_inference_client', () => {
  handleReloadInferenceClient(mainWindow, {
    locatePastelConf: locatePastelConf(),
    locatePastelConfDir: locatePastelConfDir(),
    pasteldBasePath: pasteldBasePath(),
    locateAppDir: locateAppDir(),
  })
})
