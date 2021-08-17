import http, { Server } from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import detect from 'detect-port'
import { app } from 'electron'

import { glitch, squoosh, ffmpegwasm } from '../../common/constants/ServeStatic'

const servers: Server[] = []

export default function initServeStatic(): void {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/production`
  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  let ffmpegStaticPath = `${process.cwd()}/node_modules/ffmpegwasm-create-video/production`

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
  setupServeStatic(glitchStaticPath, glitch.staticPort)
  setupServeStatic(ffmpegStaticPath, ffmpegwasm.staticPort)
}

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
          console.log('Created server')
        })
      })
      // Listen
      server.listen(port)
      servers.push(server)
    }
  } catch (error) {
    throw new Error(`serveStatic setupServeStatic error: ${error.message}`)
  }
}

export function closeServeStatic(): void {
  if (servers && servers.length > 0) {
    servers.map(server => {
      server.close(error => {
        if (error) {
          throw new Error(
            `serveStatic closeServeStatic error: ${error.message}`,
          )
        }
      })
    })
  }
}
