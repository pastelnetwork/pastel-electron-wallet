import { dialog, ipcMain } from 'electron'
import fs from 'fs'

import { TIpcListenerResponse } from './response'

export type TChooseImageResponse = {
  base64: string
  size: number
  path: string
}

export async function chooseImage(): Promise<
  TIpcListenerResponse<TChooseImageResponse>
> {
  try {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    })

    const [buf, stat] = await Promise.all([
      fs.promises.readFile(filePaths[0]),
      fs.promises.stat(filePaths[0]),
    ])

    const base64 = buf.toString('base64')
    return {
      status: 'Success',
      payload: {
        base64,
        size: stat.size,
        path: filePaths[0],
      },
    }
  } catch (error) {
    return {
      status: 'Failure',
      error: `ipcMain chooseImage error: ${error.message}`,
    }
  }
}

ipcMain.on('chooseImage', async event => {
  const resp = await chooseImage()
  event.reply('chooseImageDone', resp)
})
