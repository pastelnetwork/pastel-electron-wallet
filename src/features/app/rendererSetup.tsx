import store from '../../redux/store'
import { fetchPastelPrice } from '../pastelPrice'
import PastelDB from '../pastelDB/database'
import log from 'electron-log'
import {
  onRendererEvent,
  sendEventToMain,
  useRendererEvent,
} from './rendererEvents'
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
import { useEffect, useState } from 'react'
import { WalletRPC } from '../../api/pastel-rpc'

// workaround for Hot Module Replacement behavior to not start the same intervals twice
const intervals: Record<string, ReturnType<typeof setInterval>> = {}

export const rendererSetup = (): void => {
  const oneHour = 1000 * 60 * 60

  if (intervals.fetchPrice) {
    clearInterval(intervals.fetchPrice)
  } else {
    fetchPastelPrice()
    intervals.fetchPrice = setInterval(fetchPastelPrice, oneHour)
  }

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

    if (intervals.dbThread) {
      clearInterval(intervals.dbThread)
    } else {
      const period = 1000 * 10
      PastelDBThread()
      setInterval(PastelDBThread, period)
    }

    if (history.location.pathname === ROUTES.LOADING) {
      history.replace(ROUTES.WELCOME_PAGE)
    }
  })

  onRendererEvent('prepareToQuit', async () => {
    await Promise.all([PastelDB.prepareToQuit(), stopRpc()])

    sendEventToMain('rendererIsReadyForQuit', null)
  })
}

const stopRpc = async () => {
  const rpcConfig = getRpcConfig()
  if (rpcConfig) {
    await ignorePromiseError(RPC.doRPC('stop', [], rpcConfig))
  }
}

export const RendererSetupHooks = (): null => {
  const [hasRpcConfig, setHasRpcConfig] = useState(Boolean(getRpcConfig()))

  // Pre-load queries for Wallet screen for the list of addresses
  // Wallet balances, pastel prices are fetched by PastelDBThread
  const walletRPC = new WalletRPC()
  walletRPC.useZListUnspent({ enabled: hasRpcConfig })
  walletRPC.useTListUnspent({ enabled: hasRpcConfig })

  useEffect(() => {
    sendEventToMain('rendererStarted', null)
  }, [])

  useRendererEvent('setRpcConfig', () => {
    setHasRpcConfig(true)
  })

  return null
}
