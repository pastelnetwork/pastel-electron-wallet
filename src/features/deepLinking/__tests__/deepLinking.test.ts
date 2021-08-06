import { BrowserWindow } from 'electron'

import { redirectDeepLinkingUrl } from '../DeepLinking.utils'
import { browserWindow } from '../../../common/utils/app'

describe('deepLinking/redirectDeepLinkingUrl', () => {
  beforeEach(() => {
    browserWindow.current = new BrowserWindow()
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test("protocolSchema isn't existing on redirectDeepLinkingUrl", async () => {
    expect.hasAssertions()
    try {
      redirectDeepLinkingUrl('protocolSchemes://creator?content=test')
    } catch (err) {
      expect(err.message).toEqual(
        "deepLinking redirectDeepLinkingUrl error: protocolSchema isn't existing",
      )
    }
  })

  test('App opening correct screen based on redirectDeepLinkingUrl', async () => {
    const url = 'pastel://creator?content=test'
    redirectDeepLinkingUrl(url)

    expect(browserWindow.current?.webContents.send).toHaveBeenCalledTimes(1)
  })
})
