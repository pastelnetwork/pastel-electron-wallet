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
import { useFirstPastelIdWithTxIdAndConfirmed } from '../../api/pastel-rpc'
import history from '../../common/utils/history'
import OnboardingStoreProvider from './OnboardingStoreProvider'

export default function OnboardingRouter(): JSX.Element {
  const {
    data: fetchedPastelId,
    isLoading,
    error,
  } = useFirstPastelIdWithTxIdAndConfirmed({
    onSuccess(pastelId) {
      if (history.location.pathname === ROUTES.ONBOARDING) {
        history.push(pastelId?.isConfirmed ? ROUTES.LOGIN : ROUTES.WELCOME_PAGE)
      }
    },
  })
  if (isLoading) {
    return <LoadingScreen message='Loading...' />
  }

  if (error) {
    return <p>Failed to load PastelId: ${error.message}</p>
  }

  return (
    <OnboardingLayout>
      <OnboardingStoreProvider fetchedPastelId={fetchedPastelId}>
        <Switch>
          <Route exact path={ROUTES.WELCOME_PAGE} component={WelcomePage} />
          <Route exact path={ROUTES.NEW_PASSWORD} component={NewPassword} />
          <Route
            exact
            path={ROUTES.PASSWORD_RECOVERY}
            component={PasswordRecoveryPage}
          />
          <Route exact path={ROUTES.SIGN_UP}>
            <RegisterPage />
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <LoginPage />
          </Route>
          <Route
            exact
            path={ROUTES.REGISTER_SUCCESSFUL}
            component={RegistrationSuccessful}
          />
        </Switch>
      </OnboardingStoreProvider>
    </OnboardingLayout>
  )
}
