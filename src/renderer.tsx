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

import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader' // has to stay first
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { PastelModal } from './features/pastelModal'
import UpdateToast from './features/updateToast'
import Utilities from './features/utilities'
import Root from './legacy/containers/Root'
import store from './redux/store'
import 'common/utils/initDayjs'
import { sendEventToMain } from './features/app/rendererEvents'
import { rendererSetup } from './features/app/rendererSetup'

rendererSetup()

const App = () => {
  useEffect(() => {
    sendEventToMain('rendererStarted', null)
  }, [])

  return (
    <Provider store={store}>
      <Root />
      <ToastContainer hideProgressBar autoClose={5000} />
      <Utilities />
      <PastelModal />
      <UpdateToast />
    </Provider>
  )
}

const application = <App />

render(application, document.getElementById('root'))

export default hot(module)(application)
