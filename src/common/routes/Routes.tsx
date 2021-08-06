import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'

import { pageRoutes } from './index'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'
import { TWalletInfo, defaultPastelInfo } from 'features/serveStatic'

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
  required?: {
    [name: string]: boolean
  }
}

const childRoutes = (routes: Array<TRouteType>, info?: TWalletInfo) =>
  routes.map(({ component: Component, layout: Layout, path, id, required }) => {
    if (!Component || !Layout) {
      return null
    }

    const extraProps = {}

    if (required?.info) {
      Object.assign(extraProps, { info })
    }

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
  const history = useHistory()
  const [info] = useState<TWalletInfo>(defaultPastelInfo)

  useEffect(() => {
    history.push(ROUTES.LOADING)
  }, [])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-d1'>
      <Switch location={location}>
        {childRoutes(pageRoutes, info)}
        <Route path={ROUTES.LOADING} component={LoadingScreen} />
      </Switch>
    </div>
  )
}

export default Routes
