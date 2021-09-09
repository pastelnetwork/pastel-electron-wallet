import React, { useEffect, useState } from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'
import history from '../utils/history'
import { Database } from 'better-sqlite3'
import PastelDB from '../../features/pastelDB/database'
import { AppContext } from '../../features/app/AppContext'
import { pageRoutes } from './index'
import { useAppSelector } from '../../redux/hooks'
import { OnboardingRouter } from '../../features/onboarding'

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
            <Switch>
              <Route path={ROUTES.ONBOARDING} component={OnboardingRouter} />
              {childRoutes(pageRoutes)}
            </Switch>
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
