import store from '../../redux/store'
import { fetchPastelPrice } from '../pastelPrice'
import PastelDB from '../pastelDB/database'
import log from 'electron-log'
import { onRendererEvent, sendEventToMain } from './rendererEvents'
import { getRpcConfig, setRpcConfig } from '../rpcConfig'
import RPC from '../../legacy/rpc'
import {
  setPastelInfo,
  setGetInfoError,
  setIsPackagedAndPaths,
} from './AppInfoSlice'
import { PastelDBThread } from '../pastelDB'
import history from '../../common/utils/history'
import * as ROUTES from '../../common/utils/constants/routes'
import { ignorePromiseError, retryPromise } from '../../common/utils/promises'

export const rendererSetup = (): void => {
  const oneHour = 1000 * 60 * 60

  fetchPastelPrice()
  setInterval(fetchPastelPrice, oneHour)

  onRendererEvent('setAppInfo', info => {
    if (info.isPackaged) {
      log.transports.console.level = false
    }

    store.dispatch(setIsPackagedAndPaths(info))
    PastelDB.init()
  })

  onRendererEvent('setRpcConfig', async ({ rpcConfig }) => {
    setRpcConfig(rpcConfig)

    retryPromise(
      async () => {
        const info = await RPC.getInfoObject(rpcConfig)
        store.dispatch(setPastelInfo({ info: { ...info } }))
      },
      {
        attempts: 10,
        delay: 1000,
        onError(error: Error) {
          log.error(error)
          store.dispatch(setGetInfoError({ message: error.message }))
        },
      },
    )

    // set pastel DB thread update timer
    const { isPackaged } = store.getState().appInfo
    if (!isPackaged) {
      const period = 1000 * 10
      PastelDBThread()
      setInterval(PastelDBThread, period)
    }

    history.replace(ROUTES.WELCOME_PAGE)
  })

  onRendererEvent('prepareToQuit', async () => {
    await Promise.all([PastelDB.waitTillValid(), stopRpc()])

    sendEventToMain('rendererIsReadyForQuit', null)
  })
}

const stopRpc = async () => {
  const rpcConfig = getRpcConfig()
  if (rpcConfig) {
    await ignorePromiseError(RPC.doRPC('stop', [], rpcConfig))
  }
}
