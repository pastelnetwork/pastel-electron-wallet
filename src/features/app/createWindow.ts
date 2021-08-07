import { app, BrowserWindow } from 'electron'
import { browserWindow } from '../../common/utils/app'
import { onMainEvent, sendEventToRenderer } from './events'
import { closeServeStatic } from '../serveStatic'
import MenuBuilder from '../../menu'

let waitingForClose = false
let proceedToClose = false

export const createWindow = async (): Promise<void> => {
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
  browserWindow.current = w

  w.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  w.webContents.on('did-frame-finish-load', () => {
    // Open the DevTools.
    if (!app.isPackaged) {
      w.webContents.openDevTools()
    }
  })

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  w.webContents.on('did-finish-load', () => {
    if (!browserWindow.current) {
      throw new Error('No active window')
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

    onMainEvent('rendererIsReadyForQuit', () => {
      waitingForClose = false
      proceedToClose = true
      app.quit()
    })

    closeServeStatic()

    sendEventToRenderer('prepareToQuit', null)
    // Failsafe, timeout after 10 seconds
    setTimeout(() => {
      waitingForClose = false
      proceedToClose = true
      console.warn('Timeout, quitting')
      app.quit()
    }, 10 * 1000)
  })

  w.on('closed', () => {
    browserWindow.current = undefined
  })

  const menuBuilder = new MenuBuilder(w)
  menuBuilder.buildMenu()
}
