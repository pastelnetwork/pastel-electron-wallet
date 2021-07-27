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
import PortfolioMain from '../../features/portfolio'
import DashboardPage from '../../features/dashboard/DashboardPage'
import SearchPage from '../../features/searchResults'
import { MyProfile } from '../../features/profile'
import NFTMarketFeedPage from '../../features/NFTMarketFeed'
import WalletScreenPage from '../../features/wallet'
import ChatPage from '../../features/chat'
import { MembersDirectory } from '../../features/members'
import MemberProfile from '../../features/profile/memberProfile/MemberProfile'
import PortfolioPage from 'features/nft/portfolio/PortfolioPage'
import { Forum } from '../../features/forum'
import Pasteld from 'legacy/components/Pasteld'

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
  component: PortfolioMain,
  layout: PageLayout,
}

const myProfile = {
  id: 'myProfile',
  path: ROUTES.MY_PROFILE,
  component: MyProfile,
  layout: PageLayout,
  required: {
    rpcConfig: true,
  },
}

const walletScreen = {
  id: 'walletScreen',
  path: ROUTES.WALLET,
  component: WalletScreenPage,
  layout: PageLayout,
  required: {
    info: true,
  },
}

const nft = {
  id: 'nft',
  path: ROUTES.MARKET,
  component: NFTMarketFeedPage,
  layout: PageLayout,
}

const chat = {
  id: 'chat',
  path: ROUTES.CHAT,
  component: ChatPage,
  layout: PageLayout,
}

const membersDirectory = {
  id: 'membersDirectory',
  path: ROUTES.MEMBERS,
  component: MembersDirectory,
  layout: PageLayout,
}

const searchResults = {
  id: 'searchResults',
  path: ROUTES.SEARCH_RESULT,
  component: SearchPage,
  layout: PageLayout,
}

const membersProfile = {
  id: 'membersProfile',
  path: ROUTES.MY_PROFILE,
  component: MemberProfile,
  layout: PageLayout,
}

const portfolioDetail = {
  id: 'portfolioDetail',
  path: ROUTES.PORTFOLIO_DETAIL,
  component: PortfolioPage,
  layout: PageLayout,
  required: {
    currencyName: true,
  },
}

const forum = {
  id: 'forum',
  path: ROUTES.FORUM,
  component: Forum,
  layout: PageLayout,
}

const pasteld = {
  id: 'pasteld',
  path: ROUTES.PASTELD,
  component: Pasteld,
  layout: OnboardingLayout,
  required: {
    info: true,
  },
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
  searchResults,
  myProfile,
  walletScreen,
  nft,
  chat,
  membersDirectory,
  membersProfile,
  portfolioDetail,
  portfolioDetail,
  forum,
  pasteld,
]
