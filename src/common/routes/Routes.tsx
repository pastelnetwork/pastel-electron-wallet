import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import { pageRoutes } from './index'
import * as ROUTES from '../utils/constants/routes'
import { TRPCConfig } from 'api/pastel-rpc'
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

const childRoutes = (
  routes: Array<TRouteType>,
  rpcConfig?: TRPCConfig,
  info?: TWalletInfo,
) =>
  routes.map(({ component: Component, layout: Layout, path, id, required }) => {
    if (!Component || !Layout) {
      return null
    }

    const extraProps = {}
    if (required?.rpcConfig) {
      Object.assign(extraProps, { rpcConfig })
    }

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
  const [, setIsPackaged] = useState(false)
  const [rpcConfig] = useState<TRPCConfig>()
  const [info] = useState<TWalletInfo>(defaultPastelInfo)

  useEffect(() => {
    ipcRenderer.on(
      'app-info',
      (event, { isPackaged }: { isPackaged: boolean }) => {
        setIsPackaged(isPackaged)
      },
    )

    history.push(ROUTES.LOADING)
  }, [])

  useEffect(() => {
    if (rpcConfig) {
      ipcRenderer.send('app-ready')
    }
  }, [rpcConfig])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-d1'>
      <Switch location={location}>
        {childRoutes(pageRoutes, rpcConfig, info)}
        <Route path={ROUTES.LOADING} component={LoadingScreen} />
      </Switch>
    </div>
  )
}

export default Routes
