import OnboardingLayout from '../layout/Onboarding/Onboarding';

import OnboardingWelcome from '../pages/OnboardingWelcome/OnboardingWelcome';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import PasswordRecovery from '../pages/PasswordRecovery/PasswordRecovery';

import * as ROUTES from '../utils/constants/routes';

const onboardingRoute = {
  id: 'OnboardingWelcome',
  path: ROUTES.ONBOARDING,
  component: OnboardingWelcome,
  layout: OnboardingLayout,
};

const signUpRoute = {
  id: 'signUp',
  path: ROUTES.SIGN_UP,
  component: SignUp,
  layout: OnboardingLayout,
};

const loginRoute = {
  id: 'login',
  path: ROUTES.LOGIN,
  component: Login,
  layout: OnboardingLayout,
};

const passwordRecoveryRoute = {
  id: 'passwordRecovery',
  path: ROUTES.PASSWORD_RECOVERY,
  component: PasswordRecovery,
  layout: OnboardingLayout,
};

export const pageRoutes = [onboardingRoute, signUpRoute, loginRoute, passwordRecoveryRoute];
