import { BrowserWindow } from './browser-window'
import log from 'electron-log'

const remote = {
  app: {
    getPath: jest.fn(),
    getName: jest.fn(),
    getVersion: jest.fn(),
  },
}

export { log }
export { remote }
export { BrowserWindow }
