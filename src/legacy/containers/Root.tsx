import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ErrorModal as ReduxErrorModal } from '../../features/errorModal'
import Routes from '../Routes'

const Root = (): JSX.Element => (
  <>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <ReduxErrorModal />
  </>
)

export default Root
