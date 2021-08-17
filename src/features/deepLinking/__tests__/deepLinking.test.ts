import { BrowserWindow } from 'electron'

import { redirectDeepLinkingUrl, setDeepLinkingUrl } from '../DeepLinking.utils'
import { browserWindow } from '../../app/window'

describe('deepLinking/redirectDeepLinkingUrl', () => {
  beforeEach(() => {
    browserWindow.current = new BrowserWindow()
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test("protocolSchema isn't existing on redirectDeepLinkingUrl", async () => {
    expect.hasAssertions()
    try {
      setDeepLinkingUrl('protocolSchemes://creator?content=test')
      redirectDeepLinkingUrl()
    } catch (err) {
      expect(err.message).toEqual(
        "deepLinking redirectDeepLinkingUrl error: protocolSchema isn't existing",
      )
    }
  })

  test('App opening correct screen based on redirectDeepLinkingUrl', async () => {
    setDeepLinkingUrl('pastel://creator?content=test')
    redirectDeepLinkingUrl()

    expect(browserWindow.current?.webContents.send).toHaveBeenCalledTimes(1)
  })
})
