import { BrowserWindow } from './browser-window'
import { EventEmitter } from 'events'

class IPCRendererMock extends EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public send: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public invoke: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on: any

  constructor() {
    super()
    this.send = jest.fn()
    this.on = jest.fn()
    this.invoke = jest.fn()
  }
}
const ipcRenderer = new IPCRendererMock()
export { BrowserWindow, ipcRenderer }
