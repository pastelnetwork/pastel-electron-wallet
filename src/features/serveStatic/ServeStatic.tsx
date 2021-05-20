import http, { Server } from 'http'
import serveStatic from 'serve-static'

export default function initServeStatic(isPackaged:boolean): Server[] {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/production`
  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  if (isPackaged) {
    squooshStaticPath = './resources/app.asar/.webpack/renderer/static/squoosh'
    glitchStaticPath = './resources/app.asar/.webpack/renderer/static/glitch'
  }
  const serverSquoosh = setupServeStatic(squooshStaticPath, 5200)
  const serverGlitch = setupServeStatic(glitchStaticPath, 5300)

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
