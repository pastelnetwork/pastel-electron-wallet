import React from 'react'
import { Switch, Route } from 'react-router'
import OnboardingRoutes from './OnboardingRoutes'
import routes from '../constants/routes.json'
import Header from '../components/Header'
import NFTMarketFeed from '../../features/nftMarket/NFTMarketFeed'
import Dashboard from '../../features/dashboard/DashboardPage'
import MemberProfile from '../../features/profile/memberProfile/MemberProfile'

export default function Routes(): JSX.Element {
  /**
   * TODO
   * Make redux flow for the logged used and avoid passing props
   */
  const [user, setUser] = React.useState(true)

  if (user) {
    return (
      <div className='flex flex-col h-full'>
        <Header />
        <div className='flex-grow overflow-auto'>
          <Switch>
            <Route exact path={routes.DASHBOARD} component={Dashboard} />
            <Route exact path={routes.MARKET} component={NFTMarketFeed} />
            <Route exact path={routes.MEMBERS} component={MemberProfile} />
          </Switch>
        </div>
      </div>
    )
  }

  return <OnboardingRoutes setUser={setUser} />
}
