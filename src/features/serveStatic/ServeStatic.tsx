import http, { Server } from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import detect from 'detect-port'
import { app } from 'electron'
import log from 'electron-log'

import { glitch, squoosh, ffmpegwasm } from '../../common/constants/ServeStatic'

const servers: Server[] = []

async function setupServeStatic(staticPath: string, port: number) {
  try {
    const _port = await detect(port)
    if (port === _port) {
      const serve = serveStatic(staticPath, {
        index: ['index.html'],
      })
      // Create server
      const server = http.createServer(function onRequest(req, res) {
        serve(req, res, () => {
          log.log('Created server')
        })
      })
      // Listen
      server.listen(port)
      servers.push(server)
    }
  } catch (error) {
    const message: string = error.message || ''
    throw new Error(`serveStatic setupServeStatic error: ${message}`)
  }
}

export default function initServeStatic(): void {
  const sourcePath: string = process.cwd() || ''
  let squooshStaticPath = `${sourcePath}/node_modules/squoosh/production`
  let glitchStaticPath = `${sourcePath}/node_modules/jpg-glitch/production`
  let ffmpegStaticPath = `${sourcePath}/node_modules/ffmpegwasm-create-video/production`

  if (app.isPackaged) {
    squooshStaticPath = path.join(
      process.resourcesPath,
      '/app.asar/.webpack/renderer/static/squoosh',
    )
    glitchStaticPath = path.join(
      process.resourcesPath,
      '/app.asar/.webpack/renderer/static/glitch',
    )
    ffmpegStaticPath = path.join(
      process.resourcesPath,
      '/app.asar/.webpack/renderer/static/ffmpeg',
    )
  }

  setupServeStatic(squooshStaticPath, squoosh.staticPort)
    .then(() => {
      // noop
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      // noop
    })
  setupServeStatic(glitchStaticPath, glitch.staticPort)
    .then(() => {
      // noop
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      // noop
    })
  setupServeStatic(ffmpegStaticPath, ffmpegwasm.staticPort)
    .then(() => {
      // noop
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      // noop
    })
}

export function closeServeStatic(): void {
  if (servers && servers.length > 0) {
    servers.forEach(server => {
      server.close(error => {
        if (error) {
          const message: string = error.message || ''
          throw new Error(`serveStatic closeServeStatic error: ${message}`)
        }
      })
    })
  }
}
