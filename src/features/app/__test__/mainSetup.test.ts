import { redirectDeepLinkingUrl, setupDeepLinking } from '../../deepLinking'
import { setupAutoUpdater } from '../autoUpdater'
import { setupOptimizeImageHandler } from '../../nft/addNFT/imageOptimization/ImageOptimization.main'
import { mainSetup, onWindowClose, resetWindowCloseFlags } from '../mainSetup'
import {
  asMock,
  emitMainEvent,
  nextTickPromise,
  resetWhenReadyPromise,
  resolveAppReadyPromise,
} from '../../../common/utils/test-utils'
import { createWindow } from '../window'
import initServeStatic, { closeServeStatic } from '../../serveStatic'
import { mainEventPromise, sendEventToRenderer } from '../mainEvents'
import { startWalletNode, stopWalletNode } from '../walletNode'
import { readRpcConfig } from '../../rpcConfig'
import { promiseTimeout } from '../../../common/utils/promises'
import { app } from 'electron'

jest.mock('../../deepLinking')
jest.mock('../autoUpdater')
jest.mock('../../nft/addNFT/imageOptimization/ImageOptimization.main')
jest.mock('../window')
jest.mock('../../serveStatic')
jest.mock('../mainEvents', () => ({
  ...jest.requireActual('../mainEvents'),
  sendEventToRenderer: jest.fn(),
  mainEventPromise: jest.fn(() => Promise.resolve()),
}))
jest.mock('../walletNode')
jest.mock('../../rpcConfig')

describe('mainSetup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    resetWhenReadyPromise()
  })

  test('successful setup', async () => {
    const rpcConfig = 'rpcConfig'
    let resolveRpcConfig: ((value: unknown) => void) | undefined
    asMock(readRpcConfig).mockReturnValueOnce(
      new Promise(res => (resolveRpcConfig = res)),
    )

    mainSetup()

    expect(setupDeepLinking).toHaveBeenCalled()
    expect(setupAutoUpdater).toHaveBeenCalled()
    expect(setupOptimizeImageHandler).toHaveBeenCalled()

    await resolveAppReadyPromise()

    expect(createWindow).toHaveBeenCalled()

    emitMainEvent('rendererStarted', null)

    expect(sendEventToRenderer).toHaveBeenCalledWith(
      'setAppInfo',
      expect.any(Object),
    )
    asMock(sendEventToRenderer).mockClear()
    expect(initServeStatic).toHaveBeenCalled()
    expect(startWalletNode).toHaveBeenCalled()
    await nextTickPromise()

    expect(readRpcConfig).toHaveBeenCalled()
    resolveRpcConfig?.(rpcConfig)
    await promiseTimeout(0)
    expect(sendEventToRenderer).toHaveBeenCalledWith('setRpcConfig', {
      rpcConfig,
    })

    expect(redirectDeepLinkingUrl).toHaveBeenCalled()
  })

  test('retryInitializingApp event should start wallet node, send rpc config and redirect deep linking', async () => {
    emitMainEvent('retryInitializingApp', null)
    expect(startWalletNode).toHaveBeenCalled()
    await nextTickPromise()
    expect(sendEventToRenderer).toHaveBeenCalled()
    expect(redirectDeepLinkingUrl).toHaveBeenCalled()
  })

  test('should send appLoadingFailed event if wallet node fails', async () => {
    asMock(startWalletNode).mockRejectedValueOnce(new Error('failed'))

    mainSetup()

    await resolveAppReadyPromise()
    await emitMainEvent('rendererStarted', null)

    expect(sendEventToRenderer).toHaveBeenCalledWith('appLoadingFailed', {
      error: 'failed',
    })
  })

  test('should send appLoadingFailed event if readRpcConfig fails', async () => {
    asMock(readRpcConfig).mockRejectedValueOnce(new Error('failed'))

    mainSetup()

    await resolveAppReadyPromise()
    await emitMainEvent('rendererStarted', null)

    expect(sendEventToRenderer).toHaveBeenCalledWith('appLoadingFailed', {
      error: 'failed',
    })
  })

  test('onWindowClose sucessfull', async () => {
    resetWindowCloseFlags()

    const event = new Event('close')
    event.preventDefault = jest.fn()
    onWindowClose(event)

    await nextTickPromise()

    expect(event.preventDefault).toHaveBeenCalled()
    expect(closeServeStatic).toHaveBeenCalled()
    expect(sendEventToRenderer).toHaveBeenCalledWith('prepareToQuit', null)
    expect(mainEventPromise).toHaveBeenCalledWith('rendererIsReadyForQuit')
    expect(stopWalletNode).toHaveBeenCalled()
    expect(app.quit).toHaveBeenCalled()
  })

  test('should quit after 10 seconds if renderer hangs', async () => {
    jest.useFakeTimers()
    resetWindowCloseFlags()
    console.warn = jest.fn()

    asMock(mainEventPromise).mockReturnValueOnce(
      new Promise(() => {
        // noop
      }),
    )

    onWindowClose(new Event('close'))
    await nextTickPromise()
    expect(app.quit).not.toHaveBeenCalled()

    jest.advanceTimersByTime(10000)
    expect(console.warn).toHaveBeenCalledWith('Timeout, quitting')
    expect(app.quit).toHaveBeenCalled()
  })
})
