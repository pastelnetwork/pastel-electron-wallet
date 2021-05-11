import * as React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ScrollToTop from '../helpers/ScrollToTop/ScrollToTop'
import { RouteType } from '../types/routes'
import { pageRoutes } from './index'
import * as Styles from './Routes.styles'

const childRoutes = (routes: Array<RouteType>) =>
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

const Routes: React.FC = () => {
  const location = useLocation()

  return (
    <Styles.Container>
      <ScrollToTop />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={300}>
          <Switch location={location}>{childRoutes(pageRoutes)}</Switch>
        </CSSTransition>
      </TransitionGroup>
    </Styles.Container>
  )
}

export default Routes
