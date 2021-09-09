import React from 'react'
import LoadingScreen from '../loading'
import { ROUTES } from '../../common/constants/routes'
import { Switch, Route } from 'react-router-dom'
import OnboardingLayout from '../../common/layout/Onboarding'
import {
  LoginPage,
  NewPassword,
  PasswordRecoveryPage,
  RegisterPage,
  RegistrationSuccessful,
  WelcomePage,
} from './index'
import { useInitializeOnboarding } from './Onboarding.service'
import { useOnboardingStore } from './Onboarding.store'
import RegistrationPending from './register/RegistrationPending'

// to check password: pastelid sign login *id* *password*

export default function OnboardingRouter(): JSX.Element {
  useInitializeOnboarding()
  const pastelId = useOnboardingStore(state => state.pastelId)
  const error = useOnboardingStore(state => state.pastelIdLoadingError)

  if (error) {
    return <p>Failed to load PastelId: ${error.message}</p>
  }

  if (!pastelId) {
    return <LoadingScreen message='Loading...' />
  }

  if (pastelId?.isConfirmed === false) {
    return (
      <OnboardingLayout>
        <RegistrationPending />
      </OnboardingLayout>
    )
  }

  return (
    <OnboardingLayout>
      <Switch>
        <Route exact path={ROUTES.WELCOME_PAGE} component={WelcomePage} />
        <Route exact path={ROUTES.SIGN_UP}>
          <RegisterPage />
        </Route>
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_RECOVERY}
          component={PasswordRecoveryPage}
        />
        <Route
          exact
          path={ROUTES.REGISTER_SUCCESSFUL}
          component={RegistrationSuccessful}
        />
        <Route exact path={ROUTES.NEW_PASSWORD} component={NewPassword} />
      </Switch>
    </OnboardingLayout>
  )
}
