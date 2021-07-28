import { EventEmitter } from 'events'

export { BrowserWindow } from './browser-window'
export { default as log } from 'electron-log'

export const remote = {
  app: {
    getPath: jest.fn(),
    getName: jest.fn(),
    getVersion: jest.fn(),
  },
}

class IPCRendererMock extends EventEmitter {
  public send = jest.fn()
  public invoke = jest.fn()
  public on = jest.fn()

  constructor() {
    super()
  }
}

export const ipcRenderer = new IPCRendererMock()
