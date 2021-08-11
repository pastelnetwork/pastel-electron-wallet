import { BrowserWindow } from './browser-window'
import {
  whenReadyPromiseRef,
  ipcRenderer,
  ipcMain,
} from '../src/common/utils/test-utils'

const app = {
  getPath: jest.fn(name => `app-path/${name}`),
  getName: jest.fn(),
  getVersion: jest.fn(),
  getAppPath: jest.fn(() => 'app-path'),
  whenReady: jest.fn(() => whenReadyPromiseRef.current),
  on: jest.fn(),
  quit: jest.fn(),
}

export { BrowserWindow, ipcRenderer, ipcMain, app }
