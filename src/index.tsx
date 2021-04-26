import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { ipcRenderer } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { createDatabase, saveDataToLocalSqlite } from './features/pastelDB'
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

createDatabase()
  .then(DB => {
    ipcRenderer.on('appquitting', async () => {
      saveDataToLocalSqlite(DB)
    })
  })
  .catch(err => {
    console.error('error created DB', err)
  })

const application = (
  <Provider store={store}>
    <Root />
  </Provider>
)

render(application, document.getElementById('root'))
