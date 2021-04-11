import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
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
