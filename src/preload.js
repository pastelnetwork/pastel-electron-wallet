import { contextBridge, ipcRenderer } from 'electron'

process.once('loaded', () => {
  contextBridge.exposeInMainWorld('pastelWallet', {
    showSaveDialog: (title, defaultPath, filters, properties) => {
      return ipcRenderer.invoke(
        'showSaveDialog_IPC',
        title,
        defaultPath,
        filters,
        properties,
      )
    },
  })
})
