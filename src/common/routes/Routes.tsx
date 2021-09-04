import React, { useEffect, useState } from 'react'
import { RouteComponentProps, Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'
import history from '../utils/history'
import { Database } from 'better-sqlite3'
import PastelDB from '../../features/pastelDB/database'
import { AppContext } from '../../features/app/AppContext'
import { pageRoutes } from './index'
import { useAppSelector } from '../../redux/hooks'

type TRouteType = {
  id: string
  path: string
  component:
    | React.FunctionComponent<RouteComponentProps>
    | React.ComponentClass<RouteComponentProps>
  layout: React.FunctionComponent<unknown> | React.ComponentClass<unknown>
}

const childRoutes = (routes: Array<TRouteType>) =>
  routes.map(({ component: Component, layout: Layout, path, id }) => {
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
  const [db, setDb] = useState<Database>()
  const sqliteFilePath = useAppSelector(state => state.appInfo.sqliteFilePath)

  useEffect(() => {
    if (sqliteFilePath) {
      PastelDB.getDatabaseInstance().then(setDb)
    }
  }, [sqliteFilePath])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-d1'>
      <Router history={history}>
        {db && (
          <AppContext.Provider value={{ db }}>
            <Switch>{childRoutes(pageRoutes)}</Switch>
          </AppContext.Provider>
        )}
        <Switch>
          <Route exact path={ROUTES.LOADING} component={LoadingScreen} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
