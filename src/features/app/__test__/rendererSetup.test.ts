import { mockedStore } from '../../../common/utils/mockStore'
import { rendererSetup } from '../rendererSetup'
import { fetchPastelPrice } from '../../pastelPrice'
import {
  asMock,
  emitRendererEvent,
  ipcRenderer,
  nextTickPromise,
} from '../../../common/utils/test-utils'
import {
  setGetInfoError,
  setIsPackagedAndPaths,
  setPastelInfo,
  TWalletInfo,
} from '../AppInfoSlice'
import PastelDB from '../../pastelDB/database'
import { TRPCConfig } from '../../../api/pastel-rpc'
import { getRpcConfig, setRpcConfig } from '../../rpcConfig'
import RPC from '../../../legacy/rpc'
import { PastelDBThread } from '../../pastelDB'
import history from '../../../common/utils/history'
import * as ROUTES from '../../../common/utils/constants/routes'
import { sendEventToMain } from '../rendererEvents'

jest.useFakeTimers()
jest.mock('../../pastelPrice')
jest.mock('../../pastelDB/database')
jest.mock('../../rpcConfig')
jest.mock('../../../legacy/rpc')
jest.mock('../../pastelDB')
jest.mock('../../../common/utils/history')
jest.mock('../rendererEvents', () => {
  const actual = jest.requireActual('../rendererEvents')

  return {
    ...actual,
    sendEventToMain: jest.fn(),
  }
})

const rpcConfig: TRPCConfig = {
  username: 'username',
  password: 'password',
  url: 'url',
}

describe('rendererSetup', () => {
  beforeEach(() => {
    mockedStore.clearActions()
    ipcRenderer.removeAllListeners('setAppInfo')
    ipcRenderer.removeAllListeners('setRpcConfig')
    ipcRenderer.removeAllListeners('prepareToQuit')
  })

  it('should setup fetchPastelPrice interval', () => {
    rendererSetup()
    expect(fetchPastelPrice).toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalledWith(
      fetchPastelPrice,
      expect.any(Number),
    )
  })

  it('should setup app info and init db on setAppInfo event', async () => {
    rendererSetup()

    const info = {
      isPackaged: false,
      appVersion: '1.2.3',
      sentTxStorePath: 'path',
      debugLogPath: 'path',
      pastelWalletDirPath: 'path',
      sqliteFilePath: 'path',
    }
    await emitRendererEvent('setAppInfo', info)

    expect(mockedStore.getActions()).toEqual([setIsPackagedAndPaths(info)])
    expect(PastelDB.init).toHaveBeenCalled()
  })

  describe('on setRpcConfig event', () => {
    beforeEach(() => {
      mockedStore.getState().appInfo = {
        isPackaged: false,
      }

      rendererSetup()
    })

    it('should set rpc config', async () => {
      await emitRendererEvent('setRpcConfig', { rpcConfig })

      expect(setRpcConfig).toHaveBeenCalledWith(rpcConfig)
    })

    it('should get info from rpc', async () => {
      const info = ({ info: true } as unknown) as TWalletInfo
      asMock(RPC.getInfoObject)
        .mockRejectedValueOnce(new Error('error'))
        .mockResolvedValueOnce(info)

      await emitRendererEvent('setRpcConfig', { rpcConfig })

      expect(mockedStore.getActions()).toEqual([
        setGetInfoError({ message: 'error' }),
      ])

      mockedStore.clearActions()
      jest.advanceTimersToNextTimer()
      await nextTickPromise()

      expect(mockedStore.getActions()).toEqual([setPastelInfo({ info })])
    })

    it('should setup pastel db thread', async () => {
      mockedStore.getState().appInfo = {
        isPackaged: false,
      }

      await emitRendererEvent('setRpcConfig', { rpcConfig })

      expect(PastelDBThread).toHaveBeenCalled()
      expect(setInterval).toHaveBeenCalledWith(
        PastelDBThread,
        expect.any(Number),
      )
    })

    it('should redirect to welcome page', async () => {
      await emitRendererEvent('setRpcConfig', { rpcConfig })

      expect(history.replace).toHaveBeenCalledWith(ROUTES.WELCOME_PAGE)
    })
  })

  describe('on prepareToQuit event', () => {
    it('should wait till pastel db prepare to quit, stop rpc and send rendererIsReadyForQuit event', async () => {
      asMock(getRpcConfig).mockReturnValue(rpcConfig)

      rendererSetup()

      asMock(PastelDB.prepareToQuit).mockRejectedValueOnce(new Error())
      await emitRendererEvent('prepareToQuit', null)

      expect(RPC.doRPC).toBeCalledWith('stop', [], rpcConfig)
      expect(sendEventToMain).not.toHaveBeenCalled()

      await emitRendererEvent('prepareToQuit', null)
      expect(RPC.doRPC).toBeCalledWith('stop', [], rpcConfig)
      expect(sendEventToMain).toBeCalledWith('rendererIsReadyForQuit', null)
    })
  })
})
