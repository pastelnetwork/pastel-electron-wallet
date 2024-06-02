import http, { Server } from 'http'
import serveStatic from 'serve-static'
import path from 'path'
import fs from 'fs'
import os from 'os'
import cp from 'child_process'
import tcpPortUsed from 'tcp-port-used'
import log from 'electron-log'
import { BrowserWindow } from 'electron'
import request from 'request'
import progress from 'progress-stream'
import AdmZip from 'adm-zip'
import kill from 'kill-port'
import fixPath from 'fix-path'

import { glitch, squoosh, inferenceClient } from '../constants/ServeStatic'

if (os.platform() === 'darwin') {
  fixPath()
}

const servers: Server[] = []

interface IPastelConfProps {
  locatePastelConf: string
  locatePastelConfDir: string
  pasteldBasePath: string
}

const replaceSpaceInPath = (path: string) => {
  if (os.platform() === 'darwin' || os.platform() === 'linux') {
    // eslint-disable-next-line no-useless-escape
    return path.replace(/ /g, '\\ ')
  }
  return path
}

const startInitialInference = (
  pastelInferencePath: string,
  mainWindow: BrowserWindow | null,
) => {
  cp.exec(
    `cd ${replaceSpaceInPath(pastelInferencePath)} && npm run start`,
    function (error) {
      if (error) {
        mainWindow?.webContents?.send('start_inference_error', error?.message)
        log.error('Start Initial Inference error:', error)
        try {
          tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
            function (inUse) {
              if (inUse) {
                kill(inferenceClient.staticPort)
              }
            },
            function (err) {
              log.error('Kill port:', err.message)
            },
          )
        } catch (error) {
          log.error('Kill port:', error.message)
        }
        setTimeout(() => {
          startInitialInference(pastelInferencePath, mainWindow)
        }, 20000)
      }
    },
  )
}

export const getDownloadUrl = (): { nodejs: string } => {
  if (os.platform() === 'darwin') {
    return {
      nodejs: 'https://nodejs.org/en/download/prebuilt-installer',
    }
  }

  if (os.platform() === 'linux') {
    return {
      nodejs: 'https://nodejs.org/en/download/package-manager',
    }
  }

  return {
    nodejs: 'https://nodejs.org/en/download/prebuilt-installer',
  }
}

export const checkAndStartInitialInference = (
  isPackaged: boolean,
  locatePastelConfDir: string,
  mainWindow: BrowserWindow | null,
  pastelConf: IPastelConfProps,
): void => {
  const checkPortAndStartApp = () => {
    tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
      function (inUse) {
        if (!inUse) {
          let pastelInferencePath = path.join(
            process.cwd(),
            'static/bin/pastel_inference_js_client-master',
          )
          if (isPackaged) {
            pastelInferencePath = path.join(
              locatePastelConfDir,
              'pastel_inference_js_client-master',
            )
          }
          if (fs.existsSync(path.join(pastelInferencePath, 'server.js'))) {
            startInitialInference(pastelInferencePath, mainWindow)
          }
        }
      },
      function (err) {
        log.error('Error on check port:', err.message)
      },
    )
  }
  cp.exec('node -v', function (error, stdout) {
    if (stdout.indexOf('v22') === -1) {
      log.error('Required Nodejs 22')
      if (mainWindow && mainWindow?.webContents) {
        mainWindow.webContents.send(
          'install_required',
          JSON.stringify({
            name: 'Nodejs 22',
            link: getDownloadUrl().nodejs,
          }),
        )
      }

      setTimeout(() => {
        checkAndStartInitialInference(
          isPackaged,
          locatePastelConfDir,
          mainWindow,
          pastelConf,
        )
      }, 20000)
    } else {
      const pastelInferencePath = path.join(
        locatePastelConfDir,
        'pastel_inference_js_client-master',
      )
      if (!fs.existsSync(path.join(pastelInferencePath, 'server.js'))) {
        downloadPastelInferenceJsClient(pastelConf, pastelInferencePath)
      } else {
        checkPortAndStartApp()
      }
    }
  })
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
  if (fs.existsSync(path.join(pastelInferencePath, '.env'))) {
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
      } else if (item.indexOf('CLIENT_WEBSOCKET_PORT=') !== -1) {
        newConfig.push(`CLIENT_WEBSOCKET_PORT=${inferenceClient.socketPort}`)
      } else {
        newConfig.push(item.replace(/\r/g, ''))
      }
    }
    if (!isHasHomeConfig) {
      newConfig.push(`HOME=${pastelConf.locatePastelConfDir}`)
    }
    fs.writeFileSync(
      path.join(pastelInferencePath, '.env'),
      newConfig.join('\n'),
    )
  }
}

const downloadPastelInferenceJsClient = async (
  pastelConf: IPastelConfProps,
  pastelInferencePath: string,
) => {
  const absPath = path.join(
    pastelConf.locatePastelConfDir,
    'pastel_inference_js_client-master.zip',
  )
  const writer = fs.createWriteStream(absPath)
  const r = request.get(
    'https://github.com/pastelnetwork/pastel_inference_js_client/archive/refs/heads/master.zip',
  )

  r.on('response', resp => {
    if (resp.statusCode !== 200) {
      throw new Error(
        'utils checkHashAndDownloadParams request.get error: can not download file',
      )
    }

    const total = parseInt(resp.headers['content-length'] || '0', 10)
    const str = progress({ time: 100 }, pgrs => {
      const percentage = Math.round((pgrs.transferred * 100) / total)
      console.log(`Downloading pastel_inference_js_client ${percentage}% ...`)
    })

    resp.pipe(str).pipe(writer)
  })
  const promise = new Promise<boolean>((resolve, reject) => {
    writer.on('finish', async () => {
      writer.close()
      resolve(true)
    })

    writer.on('error', async e => {
      writer.close()
      try {
        await fs.promises.unlink(absPath)
      } catch (error) {
        throw new Error(
          'utils downloadPastelInferenceJsClient request.get error: error deleting file',
        )
      }
      reject(`utils downloadPastelInferenceJsClient error: ${e.message}`)
    })
  })

  await promise
  const zip = new AdmZip(absPath)
  zip.extractAllTo(pastelConf.locatePastelConfDir, true)
  updateConfigForInitialInference(pastelConf, pastelInferencePath)
  try {
    await fs.promises.unlink(absPath)
  } catch (error) {
    throw new Error(
      'utils downloadPastelInferenceJsClient request.get error: error deleting file',
    )
  }
  cp.exec(
    `cd ${replaceSpaceInPath(pastelInferencePath)} && npm install`,
    function (error) {
      if (error) {
        log.error('npm install error', error)
      }
    },
  )
}

export const setupInitialInference = (
  isPackaged: boolean,
  pastelConf: IPastelConfProps,
  mainWindow: BrowserWindow | null,
): void => {
  try {
    cp.exec('node -v', function (error, stdout) {
      if (stdout.indexOf('v22') !== -1) {
        const pastelInferencePath = path.join(
          pastelConf.locatePastelConfDir,
          'pastel_inference_js_client-master',
        )
        if (!fs.existsSync(path.join(pastelInferencePath, 'server.js'))) {
          downloadPastelInferenceJsClient(pastelConf, pastelInferencePath)
        } else {
          cp.exec(
            `cd ${replaceSpaceInPath(pastelInferencePath)} && npm install`,
            function () {
              updateConfigForInitialInference(pastelConf, pastelInferencePath)
            },
          )
        }
      } else {
        setTimeout(() => {
          setupInitialInference(isPackaged, pastelConf, mainWindow)
        }, 20000)
      }
    })
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
