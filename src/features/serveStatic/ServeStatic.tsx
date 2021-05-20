import { app } from 'electron'
import http, { Server } from 'http'
import serveStatic from 'serve-static'

export default function initServeStatic(): Server[] {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/build`
  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  if (app.isPackaged) {
    squooshStaticPath =
      './resources/app.asar/.webpack/renderer/static/squoosh'
    glitchStaticPath =
      './resources/app.asar/.webpack/renderer/static/glitch'
  }
  const serverSquoosh = setupServeStatic(squooshStaticPath, 5101)
  const serverGlitch = setupServeStatic(glitchStaticPath, 5102)

  return [serverSquoosh, serverGlitch]
}

function setupServeStatic(staticPath: string, port: number) {
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

  return server
}
