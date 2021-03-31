import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import store from './redux/store'

const application = (
  <Provider store={store}>
    <Root />
  </Provider>
)

render(application, document.getElementById('root'))
