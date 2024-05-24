import http, { Server } from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import fs from 'fs'
import cp from 'child_process'
import tcpPortUsed from 'tcp-port-used'
import log from 'electron-log'
import { BrowserWindow } from 'electron'

import { glitch, squoosh, inferenceClient } from '../constants/ServeStatic'

const servers: Server[] = []

interface IPastelConfProps {
  locatePastelConf: string
  locatePastelConfDir: string
}

const startInitialInference = (
  pastelInferencePath: string,
  mainWindow: BrowserWindow,
) => {
  cp.exec(`cd ${pastelInferencePath} && yarn start`, function (error) {
    if (error) {
      mainWindow.webContents.send(
        'start_inference_client_status',
        JSON.stringify({
          status: 'Starting',
          port: inferenceClient.staticPort,
        }),
      )
      log.log('Start Initial Inference error:', error)
      setTimeout(() => {
        startInitialInference(pastelInferencePath, mainWindow)
      }, 20000)
    } else {
      mainWindow.webContents.send(
        'start_inference_client_status',
        JSON.stringify({
          status: 'success',
          port: inferenceClient.staticPort,
        }),
      )
      log.log('Start Initial Inference success:')
    }
  })
}

export const checkAndStartInitialInference = (
  isPackaged: boolean,
  locatePastelConfDir: string,
  mainWindow: BrowserWindow,
): void => {
  tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (!inUse) {
        let pastelInferencePath = path.join(
          process.cwd(),
          'static/bin/pastel_inference_js_client',
        )
        if (isPackaged) {
          pastelInferencePath = path.join(
            locatePastelConfDir,
            'pastel_inference_js_client',
          )
        }
        if (!fs.existsSync(path.join(pastelInferencePath, 'server.js'))) {
          mainWindow.webContents.send(
            'start_inference_client_status',
            JSON.stringify({
              status: 'Error',
              port: inferenceClient.staticPort,
            }),
          )
        } else {
          startInitialInference(pastelInferencePath, mainWindow)
        }
      } else {
        mainWindow.webContents.send(
          'start_inference_client_status',
          JSON.stringify({
            status: 'success',
            port: inferenceClient.staticPort,
          }),
        )
      }
    },
    function (err) {
      console.error('Error on check:', err.message)
    },
  )
}

const updateConfigForInitialInference = (
  pastelConf: IPastelConfProps,
  pastelInferencePath: string,
) => {
  const pastelInferenceClientConfigPath = path.join(
    pastelConf.locatePastelConfDir,
    '.pastel',
  )
  if (!fs.existsSync(pastelInferenceClientConfigPath)) {
    fs.mkdirSync(pastelInferenceClientConfigPath)
    const config = fs.readFileSync(pastelConf.locatePastelConf)
    fs.writeFileSync(
      path.join(pastelInferenceClientConfigPath, 'pastel.conf'),
      config.toString(),
    )
  }

  const config = fs
    .readFileSync(path.join(pastelInferencePath, '.env'))
    .toString()
    .split('\n')
  const newConfig = []
  let isHasHomeConfig = false
  for (const item of config) {
    if (item.indexOf('HOME=') !== -1) {
      newConfig.push(`HOME=${pastelConf.locatePastelConfDir}`)
      isHasHomeConfig = true
    } else if (item.indexOf('CLIENT_PORT=') !== -1) {
      newConfig.push(`CLIENT_PORT=${inferenceClient.staticPort}`)
      isHasHomeConfig = true
    } else if (item.indexOf('CLIENT_WEBSOCKET_PORT=') !== -1) {
      newConfig.push(`CLIENT_WEBSOCKET_PORT=${inferenceClient.socketPort}`)
      isHasHomeConfig = true
    } else {
      newConfig.push(item)
    }
  }
  if (!isHasHomeConfig) {
    newConfig.push(`HOME=${pastelConf.locatePastelConfDir}`)
  }
  fs.writeFileSync(path.join(pastelInferencePath, '.env'), newConfig.join('\n'))
}

export const setupInitialInference = (
  isPackaged: boolean,
  pastelConf: IPastelConfProps,
): void => {
  try {
    let pastelInferencePath = path.join(
      process.cwd(),
      'static/bin/pastel_inference_js_client',
    )
    if (isPackaged) {
      pastelInferencePath = path.join(
        pastelConf.locatePastelConfDir,
        'pastel_inference_js_client',
      )
    }
    updateConfigForInitialInference(pastelConf, pastelInferencePath)

    // TODO: Implement install nodejs and yarn
    // cp.exec('node -v', function(error, stdout) {
    //   if (stdout.indexOf('v22') === -1) {
    //     cp.exec('winget install Schniz.fnm && fnm use --install-if-missing 22.2.0 && npm install --global yarn', function (error) {
    //       if (error) {
    //         log.log('Install node error:', error)
    //       }
    //     })
    //   }
    // })
    if (!fs.existsSync(path.join(pastelInferencePath, 'server.js'))) {
      cp.exec(
        `cd ${pastelConf.locatePastelConfDir} && git clone https://github.com/pastelnetwork/pastel_inference_js_client.git && cd ${pastelInferencePath} && yarn install`,
      )
    }
  } catch (error) {
    log.error('Setup Initial Inference error:', error.message)
  }
}

export default function initServeStatic(isPackaged: boolean): void {
  let squooshStaticPath = `${process.cwd()}/node_modules/squoosh/production`
  let glitchStaticPath = `${process.cwd()}/node_modules/jpg-glitch/production`
  if (isPackaged) {
    squooshStaticPath = path.join(
      process.resourcesPath,
      '/app.asar/.webpack/renderer/static/squoosh',
    )
    glitchStaticPath = path.join(
      process.resourcesPath,
      '/app.asar/.webpack/renderer/static/glitch',
    )
  }
  tcpPortUsed.check(squoosh.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (!inUse) {
        setupServeStatic(squooshStaticPath, squoosh.staticPort)
      }
    },
    function (err) {
      console.error('Error on check:', err.message)
    },
  )

  tcpPortUsed.check(glitch.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (!inUse) {
        setupServeStatic(glitchStaticPath, glitch.staticPort)
      }
    },
    function (err) {
      console.error('Error on check:', err.message)
    },
  )
}

function setupServeStatic(staticPath: string, port: number) {
  try {
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
