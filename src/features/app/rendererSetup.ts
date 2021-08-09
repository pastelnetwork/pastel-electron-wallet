import store from '../../redux/store'
import { fetchPastelPrice } from '../pastelPrice'
import PastelDB from '../pastelDB/database'
import { isPackaged } from '../../common/utils/app'
import log from 'electron-log'
import { onRendererEvent, sendEventToMain } from './events'
import { getRpcConfig, setRpcConfig } from '../rpcConfig'
import RPC from '../../legacy/rpc'
import { setPastelInfo } from '../serveStatic'
import { PastelDBThread } from '../pastelDB'
import history from '../../common/utils/history'
import * as ROUTES from '../../common/utils/constants/routes'
import { setGetInfoError } from '../serveStatic/AppInfoSlice'
import { ignorePromiseError, retryPromise } from '../../common/utils/promises'

export const rendererSetup = (): void => {
  const oneHour = 1000 * 60 * 60

  fetchPastelPrice()
  setInterval(fetchPastelPrice, oneHour)

  PastelDB.init()

  if (isPackaged) {
    log.transports.console.level = false
  }

  onRendererEvent('setRpcConfig', async ({ rpcConfig }) => {
    setRpcConfig(rpcConfig)

    await retryPromise(
      async () => {
        const info = await RPC.getInfoObject(rpcConfig)
        store.dispatch(setPastelInfo({ ...info }))
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
