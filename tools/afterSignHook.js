const fs = require('fs')
const log = require('electron-log')
const electron_notarize = require('electron-notarize')

module.exports = async function (params) {
  // Only notarize the app on Mac OS only.
  if (process.platform !== 'darwin') {
    return
  }
  // console.log('afterSign hook triggered', params);

  // Same appId in electron-builder.
  const appId = 'co.pastelwallet.fullnode'

  const appPath = params.artifactPaths.find(p => p.endsWith('.dmg'))

  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`)
  }

  log.log(`Notarizing ${appId} found at ${appPath}`)

  try {
    await electron_notarize.notarize({
      appBundleId: appId,
      appPath,
      appleId: process.env.appleId,
      appleIdPassword: process.env.appleIdPassword,
    })
  } catch (error) {
    log.error(error)
  }

  log.log(`Done notarizing ${appId}`)
}
