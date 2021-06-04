import React from 'react'
import { Switch, Route } from 'react-router'
import OnboardingRoutes from './OnboardingRoutes'
import routes from '../constants/routes.json'
import Header from '../components/Header'
import NFTMarketFeed from '../../features/NFTMarket'
import Dashboard from '../../features/dashboard/DashboardPage'

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
        <Switch>
          <Route exact path={routes.DASHBOARD} component={Dashboard} />
          <Route exact path={routes.MARKET} component={NFTMarketFeed} />
        </Switch>
      </div>
    )
  }

  return <OnboardingRoutes setUser={setUser} />
}
