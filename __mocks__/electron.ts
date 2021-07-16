import { BrowserWindow } from './browser-window'
import { EventEmitter } from 'events'

class IPCRendererMock extends EventEmitter {
  public send = jest.fn()
  public invoke = jest.fn()
  public on = jest.fn()

  constructor() {
    super()
  }
}
const ipcRenderer = new IPCRendererMock()

const remote = {
  app: {
    getPath: jest.fn(),
    getName: jest.fn(),
    getVersion: jest.fn(),
  },
}

export { BrowserWindow, ipcRenderer, remote }
