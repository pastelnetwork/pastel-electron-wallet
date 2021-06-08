import React from 'react'
import { Switch, Route } from 'react-router'
import OnboardingRoutes from './OnboardingRoutes'
import routes from 'common/constants/routes.json'
import Header from 'common/components/Header'
import Dashboard from 'features/dashboard/DashboardPage'
import NFTMarketFeed from 'features/nftMarket'
import Portfolio from 'features/nft/portfolio'

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
            <Route exact path={routes.PORTFOLIO} component={Portfolio} />
          </Switch>
        </div>
      </div>
    )
  }

  return <OnboardingRoutes setUser={setUser} />
}
