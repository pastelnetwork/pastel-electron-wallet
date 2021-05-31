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
   * Make redux flow for the logged used and avoid passing props
   */
  const [user, setUser] = React.useState(false)

  /**
   * TODO
   * Remove this CONST when new designs will be applied.
   * For now you can switch between old and new application by changing SHOW_ONBOARDING
   */
  const SHOW_ONBOARDING = false

  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        {SHOW_ONBOARDING ? (
          user ? (
            <Routes />
          ) : (
            <OnboardingRoutes setUser={setUser} />
          )
        ) : (
          <Routes />
        )}
      </MemoryRouter>
      <PastelModal />
      <UpdateToast />
    </ThemeProvider>
  )
}

export default Root
