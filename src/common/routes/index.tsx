import OnboardingLayout from '../layout/Onboarding'
import PageLayout from '../layout/PageLayout'

import {
  WelcomePage,
  RegisterPage,
  LoginPage,
  PasswordRecoveryPage,
  RegistrationPending,
  RegistrationSuccessful,
  NewPassword,
} from '../../features/onboarding/index'
import PortfolioPage from '../../features/portfolio'
import DashboardPage from '../../features/dashboard/DashboardPage'

import * as ROUTES from '../utils/constants/routes'

const onboardingRoute = {
  id: 'welcomePage',
  path: ROUTES.WELCOME_PAGE,
  component: WelcomePage,
  layout: OnboardingLayout,
}

const registerRoute = {
  id: 'signUp',
  path: ROUTES.SIGN_UP,
  component: RegisterPage,
  layout: OnboardingLayout,
}

const loginRoute = {
  id: 'login',
  path: ROUTES.LOGIN,
  component: LoginPage,
  layout: OnboardingLayout,
}

const passwordRecoveryRoute = {
  id: 'passwordRecovery',
  path: ROUTES.PASSWORD_RECOVERY,
  component: PasswordRecoveryPage,
  layout: OnboardingLayout,
}

const registrationPending = {
  id: 'registrationPending',
  path: ROUTES.REGISTER_PENDING,
  component: RegistrationPending,
  layout: OnboardingLayout,
}

const registrationSuccessful = {
  id: 'registrationSuccessful',
  path: ROUTES.REGISTER_SUCCESSFUL,
  component: RegistrationSuccessful,
  layout: OnboardingLayout,
}

const newPassword = {
  id: 'newPassword',
  path: ROUTES.NEW_PASSWORD,
  component: NewPassword,
  layout: OnboardingLayout,
}

const Dashboard = {
  id: 'dashboard',
  path: ROUTES.DASHBOARD,
  component: DashboardPage,
  layout: PageLayout,
}

const Portfolio = {
  id: 'portfolio',
  path: ROUTES.PORTFOLIO,
  component: PortfolioPage,
  layout: PageLayout,
}

export const pageRoutes = [
  onboardingRoute,
  registerRoute,
  loginRoute,
  passwordRecoveryRoute,
  registrationPending,
  registrationSuccessful,
  newPassword,
  Dashboard,
  Portfolio,
]
