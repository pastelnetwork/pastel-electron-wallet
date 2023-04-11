/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader' // has to stay first
import { Provider } from 'react-redux'
import log from 'electron-log'
import { ipcRenderer } from 'electron'

import { fetchPastelPrice } from './features/pastelPrice'
import { setAppInfo, IAppInfoState } from './features/app/AppInfoSlice'
import Root from './legacy/containers/Root'
import store from './redux/store'

const oneHour = 1000 * 60 * 60
/**
 * TODO Max please remove <any> from fetchPastelPrice after investigation why
 * fetchPastelPrice fails after merging master into onboarding branch.
 * Any is also visible in fetchPastelPrice tests.
 */
// get pastel price
// eslint-disable-next-line @typescript-eslint/no-explicit-any
store.dispatch<any>(fetchPastelPrice())

// set up pastel price update timer
setInterval(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store.dispatch<any>(fetchPastelPrice())
}, oneHour)

ipcRenderer.on('app-info', (event, data) => {
  if (data) {
    const {
      isPackaged,
      locatePastelConfDir,
      appVersion,
      locatePastelConf,
      pasteldBasePath,
      locatePasteld,
      locatePastelParamsDir,
      locatePastelWalletDir,
      locateSentTxStore,
    } = JSON.parse(data) as IAppInfoState
    if (isPackaged) {
      log.transports.console.level = false
    }
    store.dispatch(
      setAppInfo({
        isPackaged,
        locatePastelConfDir,
        appVersion,
        locatePastelConf,
        pasteldBasePath,
        locatePasteld,
        locatePastelParamsDir,
        locatePastelWalletDir,
        locateSentTxStore,
      }),
    )
  }
})

const application = (
  <Provider store={store}>
    <Root />
  </Provider>
)

render(application, document.getElementById('root'))

export default hot(module)(application)
