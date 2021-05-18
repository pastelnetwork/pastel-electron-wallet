import { redirectDeepLinkingUrl } from '../DeepLinking'
import { BrowserWindowMock } from '../mocks/browser-window'

describe('deepLinking/redirectDeepLinkingUrl', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockWindow: any

  beforeEach(() => {
    mockWindow = new BrowserWindowMock()
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test("protocolSchema isn't existing on redirectDeepLinkingUrl", async () => {
    expect.hasAssertions()
    try {
      redirectDeepLinkingUrl('protocolSchemes', null)
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
