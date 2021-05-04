import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import PastelDB from './features/pastelDB/database'
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

try {
  PastelDB.getDatabaseInstance()
} catch (error) {
  // TODO log errors to a central logger so we can address them later.
  console.error(`PastelDB.getDatabaseInstance error: ${error.message}`)
}

const application = (
  <Provider store={store}>
    <Root />
  </Provider>
)

render(application, document.getElementById('root'))
