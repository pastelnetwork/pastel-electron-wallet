import OnboardingLayout from '../components/OnboardingLayout/OnboardingLayout'
import OnboardingWelcome from '../pages/OnboardingWelcome/OnboardingWelcome'
import SignUp from '../pages/SignUp/SignUp'
import * as ROUTES from '../utils/constants/routes'

const onboardingRoute = {
  id: 'OnboardingWelcome',
  path: ROUTES.ONBOARDING,
  component: OnboardingWelcome,
  layout: OnboardingLayout,
}

const signUpRoute = {
  id: 'signUp',
  path: ROUTES.SIGN_UP,
  component: SignUp,
  layout: OnboardingLayout,
}

export const pageRoutes = [onboardingRoute, signUpRoute]
