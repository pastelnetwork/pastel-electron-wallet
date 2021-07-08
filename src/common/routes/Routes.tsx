import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import { pageRoutes } from './index'
import * as Styles from './Routes.styles'
import * as ROUTES from '../utils/constants/routes'
import { TRPCConfig } from 'api/pastel-rpc'
import LoadingScreen from 'features/loading'
import { setPastelConf } from 'features/pastelConf'
import { PastelDBThread } from 'features/pastelDB'
import { useAppDispatch } from 'redux/hooks'

export type TWalletInfo = {
  connections: number
  currencyName: string
  disconnected: boolean
  latestBlock: number
  pslPrice: number | undefined
  solps: number
  testnet: boolean
  verificationProgress: number
  version: number
}

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
  requiredRPCConfig?: boolean
  requiredInfo?: boolean
}

const childRoutes = (
  routes: Array<RouteType>,
  setUser: React.Dispatch<React.SetStateAction<boolean>>,
  rpcConfig?: TRPCConfig,
  info?: TWalletInfo,
) =>
  routes.map(
    ({
      component: Component,
      layout: Layout,
      path,
      id,
      requiredRPCConfig,
      requiredInfo,
    }) => {
      if (!Component || !Layout) {
        return null
      }

      const extraProps = {}
      if (requiredRPCConfig) {
        Object.assign(extraProps, { rpcConfig })
      }

      if (requiredInfo) {
        Object.assign(extraProps, { info })
      }

      return (
        <Route
          key={id}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} setUser={setUser} {...extraProps} />
            </Layout>
          )}
        />
      )
    },
  )

interface RoutesProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const period = 1000 * 10

const Routes: React.FC<RoutesProps> = ({ setUser }) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [isPackaged, setIsPackaged] = React.useState(false)
  const [rpcConfig, setRPCConfig] = React.useState<TRPCConfig>()
  const [info, setInfo] = React.useState<TWalletInfo>({
    connections: 0,
    currencyName: '',
    disconnected: false,
    latestBlock: 0,
    pslPrice: undefined,
    solps: 0,
    testnet: false,
    verificationProgress: 0,
    version: 0,
  })

  React.useEffect(() => {
    ipcRenderer.send('app-ready')
    ipcRenderer.on(
      'app-info',
      (event, { isPackaged }: { isPackaged: boolean }) => {
        setIsPackaged(isPackaged)
      },
    )

    history.push(ROUTES.LOADING)
  }, [])

  const setInformation = (newInfo: TWalletInfo) => {
    if (!newInfo.pslPrice) {
      newInfo.pslPrice = info.pslPrice
    }

    setInfo(newInfo)
  }

  return (
    <Styles.Container>
      <Switch location={location}>
        {childRoutes(pageRoutes, setUser, rpcConfig, info)}
        <Route
          path={ROUTES.LOADING}
          render={props => (
            <LoadingScreen
              {...props}
              setRPCConfig={(rpcConfig: TRPCConfig | null) => {
                // To support Redux calls
                if (rpcConfig) {
                  dispatch(
                    setPastelConf({
                      url: rpcConfig.url,
                      username: rpcConfig.username,
                      password: rpcConfig.password,
                    }),
                  )

                  // To support legacy calls
                  // TODO Remove then fully moved over to Redux
                  setRPCConfig(rpcConfig)

                  // set pastel DB thread update timer
                  if (!isPackaged) {
                    setInterval(() => {
                      PastelDBThread(rpcConfig)
                    }, period)
                  }
                }
              }}
              setInfo={setInformation}
              redirectTo={ROUTES.WELCOME_PAGE}
            />
          )}
        />
      </Switch>
    </Styles.Container>
  )
}

export default Routes
