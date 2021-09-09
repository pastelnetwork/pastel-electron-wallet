import OnboardingLayout from '../layout/Onboarding'
import PageLayout from '../layout/PageLayout'

import { OnboardingRouter } from '../../features/onboarding/index'
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
import { PasteldFn } from 'legacy/components/Pasteld'

import * as ROUTES from '../utils/constants/routes'

const onboardingRoute = {
  path: ROUTES.ONBOARDING,
  component: OnboardingRouter,
}

const Dashboard = {
  path: ROUTES.DASHBOARD,
  component: DashboardPage,
  layout: PageLayout,
}

const Portfolio = {
  path: ROUTES.PORTFOLIO,
  component: PortfolioMain,
  layout: PageLayout,
}

const myProfile = {
  path: ROUTES.MY_PROFILE,
  component: MyProfile,
  layout: PageLayout,
}

const walletScreen = {
  path: ROUTES.WALLET,
  component: WalletScreenPage,
  layout: PageLayout,
}

const nft = {
  path: ROUTES.MARKET,
  component: NFTMarketFeedPage,
  layout: PageLayout,
}

const chat = {
  path: ROUTES.CHAT,
  component: ChatPage,
  layout: PageLayout,
}

const membersDirectory = {
  path: ROUTES.MEMBERS,
  component: MembersDirectory,
  layout: PageLayout,
}

const searchResults = {
  path: ROUTES.SEARCH_RESULT,
  component: SearchPage,
  layout: PageLayout,
}

const membersProfile = {
  path: ROUTES.MEMBERS_PROFILE,
  component: MemberProfile,
  layout: PageLayout,
}

const portfolioDetail = {
  path: ROUTES.PORTFOLIO_DETAIL,
  component: PortfolioPage,
  layout: PageLayout,
}

const forum = {
  path: ROUTES.FORUM,
  component: Forum,
  layout: PageLayout,
}

const pasteld = {
  path: ROUTES.PASTELD,
  component: PasteldFn,
  layout: OnboardingLayout,
}

export const pageRoutes = [
  onboardingRoute,
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
