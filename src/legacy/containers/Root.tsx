import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import { PastelModal } from '../../features/pastelModal'
import UpdateToast from '../../features/updateToast'
import Routes from '../Routes'
import { theme } from '../../common/theme'

const Root = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <PastelModal />
    <UpdateToast />
  </ThemeProvider>
)

export default Root
