import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { PastelModal as ReduxPastelModal } from '../../features/pastelModal'
import Routes from '../Routes'

const Root = (): JSX.Element => (
  <>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <ReduxPastelModal />
  </>
)

export default Root
