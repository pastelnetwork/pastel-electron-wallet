import { app, protocol } from 'electron'

import pkg from '../../../package.json'
import { browserWindow } from '../../common/utils/app'
import { sendEventToRenderer } from '../app/events'

export const redirectDeepLinkingUrl = (deepLink: string[] | string): void => {
  if (deepLink && deepLink.toString().includes('://')) {
    const deepLinkingUrl = deepLink.toString()
    if (deepLinkingUrl.includes(`${pkg.protocolSchemes.native}://`)) {
      const url = deepLinkingUrl
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

export const forceSingleInstanceApplication = (
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

  const window = browserWindow.current
  if (window) {
    if (window.isMinimized()) {
      window.restore()
    }
    window.focus()
    redirectDeepLinkingUrl(deepLinkingUrl)
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
