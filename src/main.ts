import 'core-js/stable'
import 'regenerator-runtime/runtime'
// install shortcuts on windows
import 'electron-squirrel-startup'

import { app, BrowserWindow, ipcMain, shell } from 'electron'
import electronDebug from 'electron-debug'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import log from 'electron-log'
import http from 'http'
import serveStatic from 'serve-static'
import sourceMapSupport from 'source-map-support'

import pkg from '../package.json'
import MenuBuilder from './menu'

// Deep linked url
let deeplinkingUrl: string[] | string

const redirectDeepLinkingUrl = (deepLink: string, m: BrowserWindow) => {
  if (deepLink.includes(`${pkg.protocolSchemes.native}://`)) {
    const url = deepLink.split(`${pkg.protocolSchemes.native}://`)[1].split('?')

    if (process.platform == 'win32') {
      m.webContents.send('deepLink', {
        view: url[0].slice(0, -1),
        param: url[1],
      })
    } else {
      m.webContents.send('deepLink', { view: url[0], param: url[1] })
    }
  }
}

// Force Single Instance Application
const gotTheLock = app.requestSingleInstanceLock()
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform == 'win32') {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = argv.slice(1)
    }

    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
      redirectDeepLinkingUrl(deeplinkingUrl.toString(), mainWindow)
    }
  })
} else {
  app.quit()
}

// Enable dev tools
if (!app.isPackaged) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: Error) => console.log('An error occurred: ', err))
  })
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
  }
}
let mainWindow: BrowserWindow | null = null

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

  // Open the DevTools.
  if (!app.isPackaged) {
    w.webContents.openDevTools()
  }

  // Protocol handler for win32
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1)
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
      console.log('proceed to close, so closing')
      return
    }

    // If we're already waiting for close, then don't allow another close event to actually close the window
    if (waitingForClose) {
      console.log('Waiting for close... Timeout in 10s')
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
    // $FlowFixMe
    w.webContents.send('appquitting')
    // Failsafe, timeout after 10 seconds
    setTimeout(() => {
      waitingForClose = false
      proceedToClose = true
      console.log('Timeout, quitting')
      app.quit()
    }, 10 * 1000)
  })
  w.on('closed', () => {
    mainWindow = null
  })
  w.once('ready-to-show', () => {
    let staticPath = `${process.cwd()}/node_modules/squoosh/build`
    if (app.isPackaged) {
      staticPath = './resources/app.asar/.webpack/renderer/static/squoosh'
    }
    const serve = serveStatic(staticPath, {
      index: ['index.html'],
    })
    // Create server
    const server = http.createServer(function onRequest(req, res) {
      serve(req, res, () => {
        console.log('Create server')
      })
    })
    // Listen
    server.listen(5100)
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

if (!app.isDefaultProtocolClient(pkg.protocolSchemes.native)) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient(pkg.protocolSchemes.native)
}

app.on('will-finish-launching', function () {
  // Protocol handler for osx
  app.on('open-url', function (event, url) {
    event.preventDefault()
    deeplinkingUrl = url
    if (mainWindow) {
      redirectDeepLinkingUrl(deeplinkingUrl.toString(), mainWindow)
    }
  })
})

ipcMain.on('app-ready', () => {
  if (mainWindow && deeplinkingUrl) {
    redirectDeepLinkingUrl(deeplinkingUrl.toString(), mainWindow)
  }
})
