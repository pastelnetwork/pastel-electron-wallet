import React, { useState } from 'react'
import { Router } from 'react-router'
import fs from 'fs'
import log from 'electron-log'
import { Route, Switch } from 'react-router-dom'
import * as ROUTES from '../utils/constants/routes'
import LoadingScreen from 'features/loading'
import history from '../utils/history'
import { Database } from 'better-sqlite3'
import PastelDB from '../../features/pastelDB/database'
import { AppContext } from '../../features/app/AppContext'
import { pageRoutes } from './index'
import { OnboardingRouter } from '../../features/onboarding'
import Utilities from '../../features/utilities'
import { onRendererEvent } from 'features/app/rendererEvents'

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
  const [db, setDb] = useState<Database>()

  onRendererEvent('setAppInfo', info => {
    if (info.sqliteFilePath && !db && !fs.existsSync(info.sqliteFilePath)) {
      setTimeout(() => {
        PastelDB.getDatabaseInstance(true)
          .then(setDb)
          .catch(error => {
            log.error(error)
            // noop
          })
          .finally(() => {
            // noop
          })
      }, 500)
    } else if (!db && fs.existsSync(info.sqliteFilePath)) {
      PastelDB.getDatabaseInstance()
        .then(setDb)
        .catch(error => {
          log.error(error)
          // noop
        })
        .finally(() => {
          // noop
        })
    }
  })

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
        {db && (
          <AppContext.Provider value={{ db }}>
            <Switch>
              <Route path={ROUTES.ONBOARDING} component={OnboardingRouter} />
              {childRoutes(pageRoutes)}
            </Switch>
          </AppContext.Provider>
        )}
        {renderRoutesControls()}
        {db ? <Utilities /> : null}
      </Router>
    </div>
  )
}
