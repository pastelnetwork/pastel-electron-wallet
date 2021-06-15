import { BrowserWindow } from './browser-window'
import electron from 'electron'
import log from 'electron-log'

jest.mock('electron', () => ({
  remote: {
    app: {
      getPath: jest.fn(),
      getName: jest.fn(),
      getVersion: jest.fn(),
    },
  },
}))

// jest.mock('log', () => ({
//   error: jest.fn(),
// }))

export { log }
export { electron }
export { BrowserWindow }
