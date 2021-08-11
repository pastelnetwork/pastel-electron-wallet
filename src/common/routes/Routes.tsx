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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any // TODO remove this any and eslint disable after user login is taken by redux
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

    const extraProps = {}

    return (
      <Route
        key={id}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} {...extraProps} />
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
