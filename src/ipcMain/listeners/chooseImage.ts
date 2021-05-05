import { dialog, ipcMain } from 'electron'
import fs from 'fs'

ipcMain.on('chooseImage', async (event, arg) => {
  try {
    const { canceled, filePaths, bookmarks } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    })

    const [buf, stat] = await Promise.all([
      fs.promises.readFile(filePaths[0]),
      fs.promises.stat(filePaths[0]),
    ])

    const base64 = buf.toString('base64')
    event.reply('chooseImageDone', {
      status: 'Success',
      payload: {
        base64,
        size: stat.size,
        path: filePaths[0],
      },
    })
  } catch (error) {
    event.reply('chooseImageDone', {
      status: 'Failure',
      payload: {
        error: error.message,
      },
    })
  }
})
