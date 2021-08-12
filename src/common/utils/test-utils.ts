import { promiseTimeout } from './promises'
import { EventEmitter } from 'events'
import { TMainEvents } from '../../features/app/mainEvents'
import { TRendererEvents } from '../../features/app/rendererEvents'

const createTestablePromise = () => {
  const resolveRef: { current?(): void } = {}

  const createWhenReadyPromise = () =>
    new Promise<void>(res => (resolveRef.current = res))

  const promiseRef: { current: Promise<void> } = {
    current: createWhenReadyPromise(),
  }

  const reset = () => {
    promiseRef.current = createWhenReadyPromise()
  }

  const resolve = () => {
    resolveRef.current?.()
    return promiseTimeout(0)
  }

  return { promiseRef, resolve, reset }
}

const whenReady = createTestablePromise()

export const whenReadyPromiseRef = whenReady.promiseRef
export const resolveAppReadyPromise = whenReady.resolve
export const resetWhenReadyPromise = whenReady.reset

const installExtensions = createTestablePromise()
export const installExtensionsPromiseRef = installExtensions.promiseRef
export const resolveInstallExtensionsPromise = installExtensions.resolve
export const resetInstallExtensionsPromise = installExtensions.reset

const ipcRendererEvents = new EventEmitter()
const ipcMainEvents = new EventEmitter()

export const ipcRenderer = {
  removeAllListeners(channel: string): void {
    ipcRendererEvents.removeAllListeners(channel)
  },
  on: jest.fn(
    (channel: string, callback: (event: Event, payload: unknown) => void) =>
      ipcRendererEvents.on(channel, payload => {
        callback(new Event(channel), payload)
      }),
  ),
  once: jest.fn((channel: string, callback: () => void) =>
    ipcRendererEvents.once(channel, callback),
  ),
  send: jest.fn((channel: string, payload: unknown) => {
    ipcMainEvents.emit(channel, payload)
  }),
  invoke: jest.fn((channel: string, payload: unknown) => {
    ipcMain.handlers[channel]?.(payload)
  }),
}

export const ipcMain = {
  on: jest.fn(
    (channel: string, callback: (event: Event, payload: unknown) => void) =>
      ipcMainEvents.on(channel, payload =>
        callback(new Event(channel), payload),
      ),
  ),
  once: jest.fn((channel: string, callback: () => void) =>
    ipcMainEvents.once(channel, callback),
  ),
  handlers: {} as Record<string, (arg: unknown) => unknown>,
  send: jest.fn((channel: string, payload: unknown) => {
    ipcRendererEvents.emit(channel, payload)
  }),
  handle: jest.fn((channel: string, callback: () => unknown) => {
    ipcMain.handlers[channel] = callback
  }),
}

export const emitMainEvent = <Channel extends keyof TMainEvents>(
  channel: Channel,
  payload: TMainEvents[Channel],
): Promise<void> => {
  ipcMainEvents.emit(channel, payload)
  return nextTickPromise()
}

export const emitRendererEvent = <Channel extends keyof TRendererEvents>(
  channel: Channel,
  payload: TRendererEvents[Channel],
): Promise<void> => {
  ipcRendererEvents.emit(channel, payload)
  return nextTickPromise()
}

// eslint-disable-next-line
export const asMock = (object: any): jest.Mock => object as jest.Mock

export const nextTickPromise = (): Promise<void> =>
  new Promise(resolve => process.nextTick(resolve))
