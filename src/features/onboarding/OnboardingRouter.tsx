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
      <Switch>
        <Route exact path={ROUTES.WELCOME_PAGE} component={WelcomePage} />
        <Route exact path={ROUTES.SIGN_UP}>
          <RegisterPage fetchedPastelId={fetchedPastelId} />
        </Route>
        {fetchedPastelId && (
          <Route exact path={ROUTES.LOGIN}>
            <LoginPage pastelId={fetchedPastelId} />
          </Route>
        )}
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
