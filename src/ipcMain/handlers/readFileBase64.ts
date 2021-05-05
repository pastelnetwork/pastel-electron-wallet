import { ipcMain } from 'electron'
import fs from 'fs'

ipcMain.handle('readFileBase64', async (e, path) => {
  const file = await fs.promises.readFile(path)
  return file.toString('base64')
})
