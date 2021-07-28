import { app, BrowserWindow, protocol } from 'electron'

import pkg from '../../../package.json'

export const redirectDeepLinkingUrl = (
  deepLink: string[] | string,
  mainWindow: BrowserWindow | null,
): void => {
  if (deepLink && deepLink.toString().includes('://')) {
    const deepLinkingUrl = deepLink.toString()
    if (deepLinkingUrl.includes(`${pkg.protocolSchemes.native}://`)) {
      const url = deepLinkingUrl
        .split(`${pkg.protocolSchemes.native}://`)[1]
        .split('?')
      if (mainWindow && mainWindow.webContents) {
        if (process.platform == 'win32') {
          mainWindow.webContents.send('deepLink', {
            view: url[0].slice(0, -1),
            param: url[1],
          })
        } else {
          mainWindow.webContents.send('deepLink', {
            view: url[0],
            param: url[1],
          })
        }
      }
    } else {
      throw new Error(
        "deepLinking redirectDeepLinkingUrl error: protocolSchema isn't existing",
      )
    }
  }
}

export const forceSingleInstanceApplication = (
  mainWindow: BrowserWindow | null,
  deepLinkingUrl: string[] | string,
  argv: string[],
): void => {
  // Someone tried to run a second instance, we should focus our window.
  // Protocol handler for win32
  // argv: An array of the second instance’s (command line / deep linked) arguments
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deepLinkingUrl = argv.slice(1)
  }

  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
    redirectDeepLinkingUrl(deepLinkingUrl, mainWindow)
  }
}

export const registerCustomProtocol = (): void => {
  if (!app.isDefaultProtocolClient(pkg.protocolSchemes.native)) {
    // Define custom protocol handler. Deep linking works on packaged versions of the application!
    app.setAsDefaultProtocolClient(pkg.protocolSchemes.native)
  }
}

export const registerFileProtocol = (): void => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const url = request.url.replace(/^file:\/\//, '')
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      return callback(decodedUrl)
    } catch (error) {
      console.error(
        `feature/deepLinking registerFileProtocol error: Could not get file path: ${error?.message}`,
        error,
      )
    }
  })
}
