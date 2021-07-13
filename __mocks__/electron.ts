import { BrowserWindow } from './browser-window'

const remote = {
  app: {
    getPath: jest.fn(),
    getName: jest.fn(),
    getVersion: jest.fn(),
  },
}

export { BrowserWindow, remote }
