import './Root.css'

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import { PastelModal } from '../../features/pastelModal'
import UpdateToast from '../../features/updateToast'
import Routes from '../Routes'
import OnboardingRoutes from '../../common/routes/Routes'
import { theme } from '../../common/theme'

const Root = (): JSX.Element => {
  /**
   * TODO
   * Remove this CONST when new designs will be applied.
   * For now you can switch between old and new application by changing SHOW_ONBOARDING
   */
  const SHOW_ONBOARDING = true

  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        {SHOW_ONBOARDING ? <OnboardingRoutes /> : <Routes />}
      </MemoryRouter>
      <PastelModal />
      <UpdateToast />
    </ThemeProvider>
  )
}

export default Root
