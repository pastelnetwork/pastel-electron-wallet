import { onMainEvent, sendEventToRenderer } from './mainEvents'
import { app, autoUpdater } from 'electron'
import log from 'electron-log'
import pkg from '../../../package.json'

export const setupAutoUpdater = (): void => {
  onMainEvent('rendererStarted', () => {
    if (app.isPackaged) {
      const version: string = app.getVersion() || ''
      const hostUrl: string = pkg.hostUrl || ''
      const repoName: string = pkg.repoName || ''
      const platform: string = process.platform || ''
      const arch: string = process.arch || ''
      const feedURL = `${hostUrl}/${repoName}/${platform}-${arch}/${version}`

      autoUpdater.setFeedURL({
        url: feedURL,
        serverType: 'default',
      })
      autoUpdater.checkForUpdates()

      const fourHours = 4 * 60 * 60 * 1000
      setInterval(() => {
        autoUpdater.checkForUpdates()
      }, fourHours)
    }
  })

  onMainEvent('restartApp', () => {
    autoUpdater.quitAndInstall()
  })

  autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName, updateURL) => {
      sendEventToRenderer('updateDownloaded', null)
      log.info('updateDownloaded', {
        event,
        releaseNotes,
        releaseName,
        updateURL,
      })
    },
  )

  autoUpdater.on('error', err => {
    const message: string = err.message || ''
    log.warn(`autoUpdater error: ${message}`, err)
  })
}
