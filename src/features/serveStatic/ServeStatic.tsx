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

const replaceSpaceInPath = (path: string) => {
  if (os.platform() === 'darwin' || os.platform() === 'linux') {
    return path.replace(/ /g, '\\ ')
  }
  return path
}

const getNodeBinaryPath = (pasteldBasePath: string) => {
  if (os.platform() === 'linux') {
    return {
      npmPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-linux', 'bin', 'npm'),
      ),
      wrapperScriptPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'run-npm-linux.sh'),
      ),
    }
  }
  if (os.platform() === 'darwin') {
    return {
      npmPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-mac', 'bin', 'npm'),
      ),
      wrapperScriptPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'run-npm-mac.sh'),
      ),
    }
  }
  return {
    npmPath: path.join(pasteldBasePath, 'node-win', 'npm.cmd'),
    wrapperScriptPath: path.join(pasteldBasePath, 'run-npm-win.bat'),
  }
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
        const { npmPath, wrapperScriptPath } = getNodeBinaryPath(
          pastelConf.pasteldBasePath,
        )

        if (os.platform() === 'darwin') {
          cp.exec(
            `cd ${replaceSpaceInPath(pastelInferencePath)} && ${npmPath} start`,
            function (error, stdout, stderr) {
              if (error) {
                log.error(`npm start failed: ${error}`)
                mainWindow?.webContents?.send(
                  'start_inference_error',
                  JSON.stringify(error?.message),
                )
                return
              }
              log.log(`npm start output: ${stdout}`)
              let pastelInferenceOutput = JSON.stringify(stdout)

              if (stderr) {
                log.error(`npm start errors: ${stderr}`)
                pastelInferenceOutput = JSON.stringify(stderr)
              }

              mainWindow?.webContents?.send(
                'start_inference_error',
                pastelInferenceOutput,
              )
            },
          )
        } else {
          cp.execFile(
            wrapperScriptPath,
            ['start'],
            { cwd: replaceSpaceInPath(pastelInferencePath) },
            (error, stdout, stderr) => {
              if (error) {
                log.error(`npm start failed: ${error}`)
                mainWindow?.webContents?.send(
                  'start_inference_error',
                  JSON.stringify(error?.message),
                )
                return
              }
              log.log(`npm start output: ${stdout}`)
              let pastelInferenceOutput = JSON.stringify(stdout)
              if (stderr) {
                log.error(`npm start errors: ${stderr}`)
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
    if (fs.existsSync(pastelInferencePath)) {
      const stats = fs.statSync(pastelInferencePath)
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

const copyNodeBinaryFolderForMac = (pastelConf: IPastelConfProps) => {
  try {
    const sourceFolder = replaceSpaceInPath(
      path.join(pastelConf.pasteldBasePath, 'node-mac'),
    )
    if (fs.existsSync(sourceFolder)) {
      const destinationFolder = '/usr/local'
      const binChild = cp.spawn(
        'sh',
        ['-c', `sudo -S cp ${sourceFolder}/bin ${destinationFolder}`],
        { stdio: 'inherit' },
      )
      binChild.on('exit', code => {
        if (code === 0) {
          log.log('bin folder copied successfully.')
        } else {
          log.error('Error copying bin folder:', code)
        }
      })

      const includeChild = cp.spawn(
        'sh',
        ['-c', `sudo -S cp ${sourceFolder}/include ${destinationFolder}`],
        { stdio: 'inherit' },
      )
      includeChild.on('exit', code => {
        if (code === 0) {
          log.log('include folder copied successfully.')
        } else {
          log.error('Error copying include folder:', code)
        }
      })

      const libChild = cp.spawn(
        'sh',
        ['-c', `sudo -S cp ${sourceFolder}/lib ${destinationFolder}`],
        { stdio: 'inherit' },
      )
      libChild.on('exit', code => {
        if (code === 0) {
          log.log('lib folder copied successfully.')
        } else {
          log.error('Error copying lib folder:', code)
        }
      })

      const shareChild = cp.spawn(
        'sh',
        ['-c', `sudo -S cp ${sourceFolder}/share ${destinationFolder}`],
        { stdio: 'inherit' },
      )
      shareChild.on('exit', code => {
        if (code === 0) {
          log.log('share folder copied successfully.')
        } else {
          log.error('Error copying share folder:', code)
        }
      })
    }
  } catch (error) {
    log.error('Copy Node.js files error', error)
  }
}

const checkAndFixNodeBinaryForMac = (pastelConf: IPastelConfProps) => {
  if (os.platform() !== 'darwin') {
    return
  }
  const extractNodeBinary = () => {
    log.log('extractNodeBinary')
    const nodeMacPath = path.join(pastelConf.pasteldBasePath, 'node-mac')
    if (fs.existsSync(nodeMacPath)) {
      log.log(nodeMacPath + ' is existed.')
      return
    }

    const absPath = path.join(pastelConf.pasteldBasePath, 'node-mac.zip')
    if (fs.existsSync(absPath)) {
      log.log('Extracting node-mac to' + pastelConf.pasteldBasePath)
      fs.createReadStream(absPath)
        .pipe(
          unzipper.Extract({
            path: replaceSpaceInPath(pastelConf.pasteldBasePath),
          }),
        )
        .on('close', () => {
          log.log('Extractedx node-mac to' + pastelConf.pasteldBasePath)
          copyNodeBinaryFolderForMac(pastelConf)
          try {
            fs.unlinkSync(absPath)
          } catch (error) {
            log.error('unlinkSync nodeMacPath', error)
          }
        })
        .on('error', err => {
          log.error(`Error extracting zip file: ${err}`)
        })
    }
  }
  try {
    extractNodeBinary()

    const output = cp.execSync('node -v').toString()
    if (output.trim().indexOf('v22') == -1) {
      copyNodeBinaryFolderForMac(pastelConf)
    }
  } catch (error) {
    copyNodeBinaryFolderForMac(pastelConf)
    log.error('Check Node.js version error: ', error)
  }
}

export const setupInitialInference = async (
  pastelConf: IPastelConfProps,
  callBack?: () => void,
): Promise<void> => {
  try {
    checkAndFixNodeBinaryForMac(pastelConf)
    const pastelInferencePath = path.join(
      pastelConf.locateAppDir,
      'pastel_inference_js_client-master',
    )
    checkUpdatePastelInferenceJsClient(pastelInferencePath)
    if (fs.existsSync(pastelInferencePath)) {
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
    const writer = fs.createWriteStream(absPath)
    const r = request.get(
      'https://github.com/pastelnetwork/pastel_inference_js_client/archive/refs/heads/master.zip',
    )

    r.on('response', resp => {
      if (resp.statusCode !== 200) {
        throw new Error(
          'utils pastel_inference_js_client request.get error: can not download file',
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
            'utils pastel_inference_js_client request.get error: error deleting file',
          )
        }
        reject(`utils pastel_inference_js_client error: ${e.message}`)
      })
    })

    await promise
    console.log('Start extract pastel_inference_js_client')
    fs.createReadStream(absPath)
      .pipe(unzipper.Extract({ path: pastelConf.locateAppDir }))
      .on('close', async () => {
        log.log('Extraction PastelInferenceJsClient complete')
        updateConfigForInitialInference(pastelConf, pastelInferencePath)
        try {
          fs.unlinkSync(absPath)
        } catch (error) {
          log.error('unlinkSync PastelInferenceJsClient error', error)
        }

        try {
          const { npmPath, wrapperScriptPath } = getNodeBinaryPath(
            pastelConf.pasteldBasePath,
          )
          if (os.platform() === 'darwin') {
            cp.exec(
              `cd ${replaceSpaceInPath(
                pastelInferencePath,
              )} && ${npmPath} install`,
              function (error, stdout, stderr) {
                if (error) {
                  log.error('npm install failed:', error)
                  return
                }
                log.log('npm install output:', stdout)
                if (callBack) {
                  callBack()
                }
                if (stderr) {
                  log.error('npm install errors: ', stderr)
                  return
                }
              },
            )
          } else {
            cp.execFile(
              wrapperScriptPath,
              ['install'],
              { cwd: replaceSpaceInPath(pastelInferencePath) },
              (error, stdout, stderr) => {
                if (error) {
                  log.error('npm install failed:', error)
                  return
                }
                log.log('npm install output:', stdout)
                if (callBack) {
                  callBack()
                }
                if (stderr) {
                  log.error('npm install errors: ', stderr)
                }
              },
            )
          }
        } catch (error) {
          log.error('npm install errors:', error)
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
    kill(inferenceClient.staticPort)
    kill(inferenceClient.socketPort)
    rimrafSync(pastelInferencePath)
    await setupInitialInference(pastelConf, () => {
      checkAndStartInitialInference(mainWindow, pastelConf)
    })
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
