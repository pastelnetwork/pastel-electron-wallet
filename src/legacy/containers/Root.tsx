import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import Routes from '../Routes'
import OnboardingRoutes from '../../common/routes/Routes'

const Root = (): JSX.Element => {
  /**
   * TODO
   * Remove this CONST when new designs will be applied.
   * For now you can switch between old and new application by changing SHOW_ONBOARDING
   */
  const SHOW_ONBOARDING = true

  return (
    <>
      <MemoryRouter>
        {SHOW_ONBOARDING ? <OnboardingRoutes /> : <Routes />}
      </MemoryRouter>
    </>
  )
}

export default Root
