import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { PastelModal } from '../../features/pastelModal'
import Routes from '../Routes'

const Root = (): JSX.Element => (
  <>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <PastelModal />
  </>
)

export default Root
