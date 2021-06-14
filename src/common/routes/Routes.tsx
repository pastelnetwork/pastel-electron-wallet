<<<<<<< HEAD
import React from 'react'
import { Switch, Route } from 'react-router'
import OnboardingRoutes from './OnboardingRoutes'
import routes from '../constants/routes.json'
import Header from '../components/Header'
import NFTMarketFeed from '../../features/nftMarket'
import Dashboard from '../../features/dashboard/DashboardPage'
import Chat from '../../features/chat'

export default function Routes(): JSX.Element {
  /**
   * TODO
   * Make redux flow for the logged used and avoid passing props
   */
  const [user, setUser] = React.useState(true)

  if (user) {
    return (
      <div className='flex flex-col h-full'>
        <Header />
        <div className='flex-grow overflow-auto'>
          <Switch>
            <Route exact path={routes.DASHBOARD} component={Dashboard} />
            <Route exact path={routes.MARKET} component={NFTMarketFeed} />
            <Route exact path={routes.CHAT} component={Chat} />
          </Switch>
        </div>
      </div>
=======
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
>>>>>>> new_development
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
