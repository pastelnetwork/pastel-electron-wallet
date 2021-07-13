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
export { BrowserWindow, ipcRenderer }
