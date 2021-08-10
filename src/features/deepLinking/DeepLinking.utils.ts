import { app, protocol } from 'electron'

import pkg from '../../../package.json'
import { browserWindow } from '../app/window'
import { sendEventToRenderer } from '../app/mainEvents'

// Deep linked url
let deepLinkingUrl: string[] | string | undefined

export const setDeepLinkingUrl = (url: string[] | string): void => {
  deepLinkingUrl = url
}

export const setupDeepLinking = (): void => {
  const gotTheLock = app.requestSingleInstanceLock()
  if (gotTheLock) {
    app.on('second-instance', (e, argv) => {
      forceSingleInstanceApplication(argv)
    })
  } else {
    app.quit()
  }

  registerCustomProtocol()

  // Protocol handler for win32
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    setDeepLinkingUrl(process.argv.slice(1))
  }

  app.whenReady().then(registerFileProtocol)

  app.on('will-finish-launching', function () {
    // Protocol handler for osx
    app.on('open-url', function (event, url) {
      event.preventDefault()
      setDeepLinkingUrl(url)
      redirectDeepLinkingUrl()
    })
  })
}

const registerCustomProtocol = (): void => {
  if (!app.isDefaultProtocolClient(pkg.protocolSchemes.native)) {
    // Define custom protocol handler. Deep linking works on packaged versions of the application!
    app.setAsDefaultProtocolClient(pkg.protocolSchemes.native)
  }
}

const registerFileProtocol = (): void => {
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

export const redirectDeepLinkingUrl = (): void => {
  if (deepLinkingUrl?.toString().includes('://')) {
    const deepLinkingUrlString = deepLinkingUrl.toString()
    if (deepLinkingUrl.includes(`${pkg.protocolSchemes.native}://`)) {
      const url = deepLinkingUrlString
        .split(`${pkg.protocolSchemes.native}://`)[1]
        .split('?')

      const view = process.platform === 'win32' ? url[0].slice(0, -1) : url[0]
      sendEventToRenderer('deepLink', {
        view,
        param: url[1],
      })
    } else {
      throw new Error(
        "deepLinking redirectDeepLinkingUrl error: protocolSchema isn't existing",
      )
    }
  }
}

const forceSingleInstanceApplication = (argv: string[]): void => {
  // Someone tried to run a second instance, we should focus our window.
  // Protocol handler for win32
  // argv: An array of the second instance’s (command line / deep linked) arguments
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deepLinkingUrl = argv.slice(1)
  }

  const window = browserWindow.current
  if (window) {
    if (window.isMinimized()) {
      window.restore()
    }
    window.focus()
    redirectDeepLinkingUrl()
  }
}
