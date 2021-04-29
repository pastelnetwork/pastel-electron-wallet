import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { PastelModal as ReduxPastelModal } from '../../features/pastelModal'
import UpdateToast from '../../features/updateToast'
import Routes from '../Routes'

const Root = (): JSX.Element => (
  <>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <ReduxPastelModal />
    <UpdateToast />
  </>
)

export default Root
