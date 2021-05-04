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

import { fetchPastelPrice } from './features/pastelPrice'
import Root from './legacy/containers/Root'
import store from './redux/store'

const oneHour = 1000 * 60 * 60

// get pastel price
store.dispatch(fetchPastelPrice())

// set up pastel price update timer
setInterval(() => {
  store.dispatch(fetchPastelPrice())
}, oneHour)

const application = (
  <Provider store={store}>
    <Root />
  </Provider>
)

render(application, document.getElementById('root'))

export default hot(module)(application)
