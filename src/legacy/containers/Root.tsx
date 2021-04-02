import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import Routes from '../Routes'

const Root = (): JSX.Element => (
  <>
    <Router>
      <Routes />
    </Router>
    <ReduxErrorModal />
  </>
)

export default Root
