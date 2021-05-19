import { BrowserWindow } from 'electron'

import { redirectDeepLinkingUrl } from '../DeepLinking'

describe('deepLinking/redirectDeepLinkingUrl', () => {
  let mockWindow: BrowserWindow

  beforeEach(() => {
    mockWindow = new BrowserWindow()
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test("protocolSchema isn't existing on redirectDeepLinkingUrl", async () => {
    expect.hasAssertions()
    try {
      redirectDeepLinkingUrl(
        'protocolSchemes://creator?content=test',
        mockWindow,
      )
    } catch (err) {
      expect(err.message).toEqual(
        "deepLinking redirectDeepLinkingUrl error: protocolSchema isn't existing",
      )
    }
  })

  test('App opening correct screen based on redirectDeepLinkingUrl', async () => {
    const url = 'pastel://creator?content=test'
    redirectDeepLinkingUrl(url, mockWindow)

    expect(mockWindow.webContents.send).toHaveBeenCalledTimes(1)
  })
})
