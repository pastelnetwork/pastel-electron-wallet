import { app } from 'electron'
import http, { Server } from 'http'
import serveStatic from 'serve-static'

export default function initServeStatic(): Server[] {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/build`
  if (app.isPackaged) {
    squooshStaticPath =
      './resources/app.asar/.webpack/renderer/static/serve-static/squoosh'
  }
  const server1 = setupServeStatic(squooshStaticPath, 5101)

  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  if (app.isPackaged) {
    glitchStaticPath =
      './resources/app.asar/.webpack/renderer/static/serve-static/glitch'
  }
  const server2 = setupServeStatic(glitchStaticPath, 5102)

  return [server1, server2]
}

function setupServeStatic(staticPath: string, port: number) {
  const serve = serveStatic(staticPath, {
    index: ['index.html'],
  })
  // Create server
  const server = http.createServer(function onRequest(req, res) {
    serve(req, res, () => {
      console.log('Create server')
    })
  })
  // Listen
  server.listen(port)

  return server
}
