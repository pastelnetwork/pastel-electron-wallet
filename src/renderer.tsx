import './index.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { PastelModal } from './features/pastelModal'
import UpdateToast from './features/updateToast'
import store from './redux/store'
import 'common/utils/initDayjs'
import { rendererSetup, RendererSetupHooks } from './features/app/rendererSetup'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './common/utils/queryClient'
import Routes from 'common/routes/Routes'
import { initTranslation } from 'features/app/translations'

rendererSetup()

function App() {
  useEffect(() => {
    initTranslation()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RendererSetupHooks />
        <Routes />
      </QueryClientProvider>
      <ToastContainer hideProgressBar autoClose={5000} className='break-all' />
      <PastelModal />
      <UpdateToast />
    </Provider>
  )
}

const application = <App />

render(application, document.getElementById('root'))
