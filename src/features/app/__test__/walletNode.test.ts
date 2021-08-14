import { spawnProcess } from '../../../common/utils/process'
import { asMock, nextTickPromise } from '../../../common/utils/test-utils'
import { startWalletNode } from '../walletNode'
import { sendEventToRenderer } from '../mainEvents'

jest.mock('../../../common/utils/process')
jest.mock('../mainEvents')

describe('walletNode', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should start process and if it fails it should install and start again', async () => {
    asMock(spawnProcess)
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce('ok')
      .mockResolvedValueOnce('ok')

    startWalletNode()
    await nextTickPromise()

    expect(spawnProcess).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining(['start']),
      expect.any(Object),
    )

    expect(spawnProcess).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining(['install']),
      expect.any(Object),
    )

    expect(spawnProcess).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining(['start']),
      expect.any(Object),
    )
  })

  it('should send some logs to renderer', async () => {
    asMock(spawnProcess)
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce('ok')
      .mockResolvedValueOnce('ok')

    startWalletNode()
    await nextTickPromise()

    const onLineCallbacks = asMock(spawnProcess).mock.calls.map(
      call => call[2].onStdoutLine,
    )

    const messages = ['Starting', 'Installing', 'Downloading', 'Finished']
    onLineCallbacks[0](messages[0])
    onLineCallbacks[1](messages[1])
    onLineCallbacks[1](messages[2])
    onLineCallbacks[2](messages[3])

    onLineCallbacks.forEach(onLine => onLine('Should ignore this message'))

    messages.forEach(message =>
      expect(sendEventToRenderer).toHaveBeenCalledWith(
        'appLoadingLogProgress',
        { message },
      ),
    )
  })
})
