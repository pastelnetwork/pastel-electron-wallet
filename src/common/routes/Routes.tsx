import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch, useLocation } from 'react-router-dom'

import { pageRoutes } from './index'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'

type TRouteType = {
  id: string
  path: string
  component:
    | React.FunctionComponent<RouteComponentProps>
    | React.ComponentClass<RouteComponentProps>
    | null
  layout:
    | React.FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null
}

const childRoutes = (routes: Array<TRouteType>) =>
  routes.map(({ component: Component, layout: Layout, path, id }) => {
    if (!Component || !Layout) {
      return null
    }

    return (
      <Route
        key={id}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  })

const Routes = (): JSX.Element => {
  const location = useLocation()

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-d1'>
      <Switch location={location}>
        {childRoutes(pageRoutes)}
        <Route exact path={ROUTES.LOADING} component={LoadingScreen} />
      </Switch>
    </div>
  )
}

export default Routes
