import http, { Server } from 'http'
import serveStatic from 'serve-static'
import path from 'path'

import {
  glitch,
  squoosh,
  ffmpegwasm,
  restoreVideo,
} from '../constants/ServeStatic'

const servers: Server[] = []

export default function initServeStatic(isPackaged: boolean): void {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/production`
  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  let ffmpegStaticPath = `${process.cwd()}/node_modules/ffmpegwasm-create-video/production`
  let videoStaticPath = `${process.cwd()}/static/videos`

  if (isPackaged) {
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

    videoStaticPath = ffmpegStaticPath = path.join(
      process.resourcesPath,
      '/videos',
    )
  }
  console.log(1111, 'videoStaticPath', videoStaticPath)
  setupServeStatic(squooshStaticPath, squoosh.staticPort)
  setupServeStatic(glitchStaticPath, glitch.staticPort)
  setupServeStatic(ffmpegStaticPath, ffmpegwasm.staticPort)
  setupServeStatic(videoStaticPath, restoreVideo.staticPort)
}

function setupServeStatic(staticPath: string, port: number) {
  try {
    const serve = serveStatic(staticPath, {
      index: ['index.html'],
    })
    // Create server
    const server = http.createServer(function onRequest(req, res) {
      serve(req, res, () => {
        console.log(111, 'Created server', port)
      })
    })
    // Listen
    server.listen(port)
    servers.push(server)
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
