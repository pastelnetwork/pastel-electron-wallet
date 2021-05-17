import { ipcMain } from 'electron'
import fs from 'fs'

export async function readFileBase64(path: string): Promise<string> {
  const file = await fs.promises.readFile(path)
  return file.toString('base64')
}

ipcMain.handle('readFileBase64', async (e, path) => {
  const resp = await readFileBase64(path)
  return resp
})
