import React from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'
import history from '../utils/history'
import { pageRoutes } from './index'
import { OnboardingRouter } from '../../features/onboarding'
import Utilities from '../../features/utilities'

type TRouteType = {
  path: string
  component: React.FunctionComponent | React.ComponentClass
  layout?: React.FunctionComponent<unknown> | React.ComponentClass<unknown>
}

const childRoutes = (routes: Array<TRouteType>) =>
  routes.map(({ component: Component, layout: Layout, path }) => {
    return (
      <Route
        key={path}
        path={path}
        exact
        render={() =>
          Layout ? (
            <Layout>
              <Component />
            </Layout>
          ) : (
            <Component />
          )
        }
      />
    )
  })

export default function Routes(): JSX.Element {
  const renderRoutesControls = () => {
    return (
      <Switch>
        <Route exact path={ROUTES.LOADING} component={LoadingScreen} />
      </Switch>
    )
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-d1'>
      <Router history={history}>
        <Switch>
          <Route path={ROUTES.ONBOARDING} component={OnboardingRouter} />
          {childRoutes(pageRoutes)}
        </Switch>
        {renderRoutesControls()}
        <Utilities />
      </Router>
    </div>
  )
}
