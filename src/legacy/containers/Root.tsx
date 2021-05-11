import './Root.css'

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import { PastelModal as ReduxPastelModal } from '../../features/pastelModal'
// New wallet app routes V2.0
import Routes from '../../routes/Routes'
import { theme } from '../../theme'

// Old Wallet app routes V1.0 - uncomment to check old views
// import Routes from '../Routes'

const Root = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
    <ReduxPastelModal />
  </ThemeProvider>
)

export default Root
