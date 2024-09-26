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
import fixPath from 'fix-path'
import dayjs from 'dayjs'
import kill from 'kill-port'
import { rimrafSync } from 'rimraf'
import unzipper from 'unzipper'
import sudo from 'sudo-prompt'

import { glitch, squoosh, inferenceClient } from '../constants/ServeStatic'

if (['darwin', 'linux'].includes(os.platform())) {
  fixPath()
}

const servers: Server[] = []

interface IPastelConfProps {
  locatePastelConf: string
  locatePastelConfDir: string
  pasteldBasePath: string
  locateAppDir: string
}

const options = {
  name: 'Pastel Network',
}

const replaceSpaceInPath = (path: string) => {
  if (os.platform() === 'darwin' || os.platform() === 'linux') {
    return path.replace(/ /g, '\\ ')
  }
  return path
}

const getBunBinaryPath = (pasteldBasePath: string) => {
  if (os.platform() === 'linux') {
    return {
      bunPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'bun-linux'),
      ),
    }
  }
  if (os.platform() === 'darwin') {
    return {
      bunPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'bun-mac'),
      ),
    }
  }
  return {
    bunPath: path.join(pasteldBasePath, 'bun-win'),
  }
}

const startInferenceClientOnMac = (
  pastelInferencePath: string,
  mainWindow: BrowserWindow | null,
) => {
  cp.exec(
    `cd ${replaceSpaceInPath(pastelInferencePath)} && bun-mac install`,
    function (error, stdout) {
      if (error) {
        log.error('bun install failed:', error)
        mainWindow?.webContents?.send(
          'start_inference_error',
          JSON.stringify(error?.message),
        )
        return
      }
      log.info('bun install output:', stdout)
      mainWindow?.webContents?.send(
        'start_inference_status',
        JSON.stringify('Loading Pastel Inference Client'),
      )
      cp.exec(
        `cd ${replaceSpaceInPath(pastelInferencePath)} && bun-mac start`,
        function (error, stdout, stderr) {
          if (error) {
            log.error(`bun start failed: ${error}`)
            mainWindow?.webContents?.send(
              'start_inference_error',
              JSON.stringify(error?.message),
            )
            return
          }
          log.info(`bun start output: ${stdout}`)
          let pastelInferenceOutput = JSON.stringify(stdout)

          if (stderr) {
            log.error(`bun start errors: ${stderr}`)
            pastelInferenceOutput = JSON.stringify(stderr)
          }

          mainWindow?.webContents?.send(
            'start_inference_error',
            pastelInferenceOutput,
          )
        },
      )
    },
  )
}

export const checkAndStartInitialInference = (
  mainWindow: BrowserWindow | null,
  pastelConf: IPastelConfProps,
): void => {
  const pastelInferencePath = path.join(
    pastelConf.locateAppDir,
    'pastel_inference_js_client-master',
  )

  tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (!inUse) {
        const { bunPath } = getBunBinaryPath(
          pastelConf.pasteldBasePath,
        )
        if (os.platform() === 'darwin') {
          startInferenceClientOnMac(pastelInferencePath, mainWindow)
        } else {
          cp.execFile(
            bunPath,
            ['start'],
            { cwd: replaceSpaceInPath(pastelInferencePath) },
            (error, stdout, stderr) => {
              if (error) {
                log.error(`bun start failed: ${error}`)
                mainWindow?.webContents?.send(
                  'start_inference_error',
                  JSON.stringify(error?.message),
                )
                return
              }
              log.info(`bun start output: ${stdout}`)
              let pastelInferenceOutput = JSON.stringify(stdout)
              if (stderr) {
                log.error(`bun start errors: ${stderr}`)
                pastelInferenceOutput = JSON.stringify(stderr)
              }

              mainWindow?.webContents?.send(
                'start_inference_error',
                pastelInferenceOutput,
              )
            },
          )
        }
      }
    },
    function (err) {
      log.error('checkAndStartInitialInference error: ', err.message)
      mainWindow?.webContents?.send(
        'start_inference_error',
        JSON.stringify(err.message),
      )
    },
  )
}

const updateConfigForInitialInference = (
  pastelConf: IPastelConfProps,
  pastelInferencePath: string,
) => {
  if (os.platform() === 'win32') {
    const pastelInferenceClientConfigPath = path.join(
      pastelConf.locateAppDir,
      '../../',
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
  }
  if (fs.existsSync(path.join(pastelInferencePath, '.env'))) {
    const config = fs
      .readFileSync(path.join(pastelInferencePath, '.env'))
      .toString()
      .split('\n')
    const newConfig = []
    for (const item of config) {
      if (item.indexOf('CLIENT_PORT=') !== -1) {
        newConfig.push(`CLIENT_PORT=${inferenceClient.staticPort}`)
      } else if (item.indexOf('CLIENT_WEBSOCKET_PORT=') !== -1) {
        newConfig.push(`CLIENT_WEBSOCKET_PORT=${inferenceClient.socketPort}`)
      } else {
        newConfig.push(item.replace(/\r/g, ''))
      }
    }
    fs.writeFileSync(
      path.join(pastelInferencePath, '.env'),
      newConfig.join('\n'),
    )
  }
}

const checkUpdatePastelInferenceJsClient = async (
  pastelInferencePath: string,
) => {
  try {
    if (fs.existsSync(path.join(pastelInferencePath, ' package.json'))) {
      const stats = fs.statSync(path.join(pastelInferencePath, ' package.json'))
      const now = dayjs()
      const target = dayjs(stats.birthtime)
      const days = now.diff(target, 'day')
      if (days >= 5) {
        rimrafSync(pastelInferencePath)
      }
    }
  } catch (error) {
    log.error('checkUpdatePastelInferenceJsClient - ', error)
  }
}

const installBunModuleForInferenceClientOnMac = (
  pastelConf: IPastelConfProps,
  pastelInferencePath: string,
  callBack?: () => void,
) => {
  cp.exec('bun-mac --version', function (error, stdout) {
    if (error || !fs.existsSync(path.join('/usr/local/bin', 'bun-mac'))) {
      if (fs.existsSync(path.join(pastelConf.pasteldBasePath, 'bun-mac-aarch'))) {
        fs.renameSync(path.join(pastelConf.pasteldBasePath, 'bun-mac-aarch'), path.join(pastelConf.pasteldBasePath, 'bun-mac'))
      }
      sudo.exec(
        `rsync -avE ${replaceSpaceInPath(
          path.join(pastelConf.pasteldBasePath, 'bun-mac'),
        )} /usr/local/bin`,
        options,
        function (error, stdout) {
          if (error) {
            log.error('Install Bun error: ', error)
          }
          setTimeout(function(){
            cp.exec(
              `cd ${replaceSpaceInPath(pastelInferencePath)} && bun-mac install`,
              function (error, stdout, stderr) {
                if (error) {
                  log.error('bun-mac install failed:', error)
                  return
                }
                log.info('bun-mac install output:', stdout)
                if (callBack) {
                  callBack()
                }
                if (stderr) {
                  log.error('bun-mac install errors: ', stderr)
                  return
                }
              },
            )
          }, 5000);
    
          log.info('stdout: ' + stdout)
        },
      )
    } else {
      cp.exec(
        `cd ${replaceSpaceInPath(pastelInferencePath)} && bun-mac install`,
        function (error, stdout, stderr) {
          if (error) {
            log.error('bun-mac install failed:', error)
            return
          }
          log.info('bun-mac install output:', stdout)
          if (callBack) {
            callBack()
          }
          if (stderr) {
            log.error('bun-mac install errors: ', stderr)
            return
          }
        },
      )
    }
  })
}

export const setupInitialInference = async (
  pastelConf: IPastelConfProps,
  callBack?: () => void,
  forceInstall = false,
): Promise<void> => {
  try {
    const pastelInferencePath = path.join(
      pastelConf.locateAppDir,
      'pastel_inference_js_client-master',
    )
    await checkUpdatePastelInferenceJsClient(pastelInferencePath)
    if (forceInstall) {
      try {
        rimrafSync(pastelInferencePath)
      } catch (error) {
        log.error('Delete pastelInferencePath error - ', error)
      }
    } else if (fs.existsSync(pastelInferencePath)) {
      if (!fs.existsSync(path.join(pastelInferencePath, 'node_modules'))) {
        try {
          rimrafSync(pastelInferencePath)
        } catch (error) {
          log.error('Delete pastelInferencePath error - ', error)
        }
      } else {
        return
      }
    }
    const absPath = path.join(
      pastelConf.locateAppDir,
      'pastel_inference_js_client-master.zip',
    )
    log.info('Starting download inference')
    const writer = fs.createWriteStream(absPath)
    const r = request.get(
      'https://github.com/pastelnetwork/pastel_inference_js_client/archive/refs/heads/master.zip',
    )

    r.on('response', resp => {
      if (resp.statusCode !== 200) {
        log.error('utils pastel_inference_js_client request.get error: can not download file')
        throw new Error(
          'utils pastel_inference_js_client request.get error: can not download file',
        )
      }

      const total = parseInt(resp.headers['content-length'] || '1', 10)
      const str = progress({ time: 100 }, pgrs => {
        const percentage = Math.round((pgrs.transferred * 100) / total)
        log.info(`Downloading pastel_inference_js_client ${percentage}% ...`)
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
          if (fs.existsSync(absPath)) {
            await fs.promises.unlink(absPath)
          }
        } catch (error) {
          log.error('utils pastel_inference_js_client request.get error: error deleting file')
          throw new Error(
            'utils pastel_inference_js_client request.get error: error deleting file',
          )
        }
        log.error(`utils pastel_inference_js_client error: ${e.message}`)
        reject(`utils pastel_inference_js_client error: ${e.message}`)
      })
    })

    await promise
    fs.createReadStream(absPath)
      .pipe(unzipper.Extract({ path: pastelConf.locateAppDir }))
      .on('close', async () => {
        log.info('Extraction PastelInferenceJsClient complete')
        updateConfigForInitialInference(pastelConf, pastelInferencePath)
        try {
          if (fs.existsSync(absPath)) {
            await fs.promises.unlink(absPath)
          }
        } catch (error) {
          log.error('unlinkSync PastelInferenceJsClient error', error)
        }

        try {
          const { bunPath } = getBunBinaryPath(
            pastelConf.pasteldBasePath,
          )
          if (os.platform() === 'darwin') {
            installBunModuleForInferenceClientOnMac(
              pastelConf,
              pastelInferencePath,
              callBack,
            )
          } else {
            cp.execFile(
              bunPath,
              ['install'],
              { cwd: replaceSpaceInPath(pastelInferencePath) },
              (error, stdout, stderr) => {
                if (error) {
                  log.error('bun install failed:', error)
                  return
                }
                log.info('bun install output:', stdout)
                if (callBack) {
                  callBack()
                }
                if (stderr) {
                  log.error('bun install errors: ', stderr)
                }
              },
            )
          }
        } catch (error) {
          log.error('bun install errors:', error)
        }
      })
      .on('error', err => {
        log.error(`Error extracting zip file: ${err}`)
      })
  } catch (error) {
    log.error('setupInitialInference error: ', error)
  }
}

export const handleReloadInferenceClient = async (
  mainWindow: BrowserWindow | null,
  pastelConf: IPastelConfProps,
): Promise<void> => {
  try {
    const pastelInferencePath = path.join(
      pastelConf.locateAppDir,
      'pastel_inference_js_client-master',
    )
    try {
      kill(inferenceClient.staticPort)
      kill(inferenceClient.socketPort)
      fs.rmSync(pastelInferencePath, { recursive: true, force: true })
    } catch (error) {
      log.error('rimrafSync pastel_inference_js_client-master error: ', error)
    }
    await setupInitialInference(pastelConf, () => {
      log.info('Start Inference')
      checkAndStartInitialInference(mainWindow, pastelConf)
    }, true)
  } catch (error) {
    log.error('handleReloadInferenceClient error: ', error)
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
      log.error('Error on check:', err.message)
    },
  )

  tcpPortUsed.check(glitch.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (!inUse) {
        setupServeStatic(glitchStaticPath, glitch.staticPort)
      }
    },
    function (err) {
      log.error('Error on check:', err.message)
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
        log.info('Created server')
      })
    })
    // Listen
    server.listen(port)
    servers.push(server)
  } catch (error) {
    log.error(`serveStatic setupServeStatic error: ${error.message}`)
    throw new Error(`serveStatic setupServeStatic error: ${error.message}`)
  }
}

export function closeServeStatic(): void {
  if (servers && servers.length > 0) {
    servers.map(server => {
      server.close(error => {
        if (error) {
          log.error(`serveStatic closeServeStatic error: ${error.message}`)
          throw new Error(
            `serveStatic closeServeStatic error: ${error.message}`,
          )
        }
      })
    })
  }
}

export const stopInference = (
  locateAppDir: string,
  pasteldBasePath: string,
): void => {
  const pastelInferencePath = path.join(
    locateAppDir,
    'pastel_inference_js_client-master',
  )

  tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
    function (inUse) {
      if (inUse) {
        const { bunPath } = getBunBinaryPath(
          pasteldBasePath,
        )
        if (os.platform() === 'darwin') {
          cp.exec(
            `cd ${replaceSpaceInPath(pastelInferencePath)} && bun stop`,
            function (error) {
              if (error) {
                log.error(`bun stop failed: ${error}`)
              }
            },
          )
        } else {
          cp.execFile(
            bunPath,
            ['stop'],
            { cwd: replaceSpaceInPath(pastelInferencePath) }
          )
        }
      }
    },
    function (err) {
      log.error('checkAndStartInitialInference error: ', err.message)
    },
  )
}