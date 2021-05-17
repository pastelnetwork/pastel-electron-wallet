export const ipcRenderer = {
  events: {},
  on(event: string, handler: () => void): void {
    this.events[event] = handler
  },
  send(event: string, data: Record<string, unknown>): void {
    this.events[event](event, data)
  },
  removeAllListeners(event: string): void {
    this.events[event] = undefined
  },
}

export const dialog = {
  showOpenDialog: jest.fn(),
}

export const ipcMain = {
  on: jest.fn(),
}
