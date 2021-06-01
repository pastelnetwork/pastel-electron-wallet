import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { pageRoutes } from './index'
import * as Styles from './Routes.styles'
import * as ROUTES from '../utils/constants/routes'

type RouteType = {
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

const childRoutes = (
  routes: Array<RouteType>,
  setUser: React.Dispatch<React.SetStateAction<boolean>>,
) =>
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
            <Component {...props} setUser={setUser} />
          </Layout>
        )}
      />
    )
  })

interface RoutesProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const Routes: React.FC<RoutesProps> = ({ setUser }) => {
  const location = useLocation()
  const history = useHistory()

  React.useEffect(() => history.push(ROUTES.WELCOME_PAGE), [])

  return (
    <Styles.Container>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={300}>
          <Switch location={location}>
            {childRoutes(pageRoutes, setUser)}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Styles.Container>
  )
}

export default Routes
