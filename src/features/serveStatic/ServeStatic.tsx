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

export const openNodejsFile = (pasteldBasePath: string): void => {
  try {
    if (os.platform() === 'linux') {
      cp.exec(
        'curl -fsSL https://fnm.vercel.app/install | bash && fnm use --install-if-missing 22',
      )
      return
    }
    if (os.platform() === 'darwin') {
      cp.exec(`${path.join(pasteldBasePath, 'node-mac.pkg')}`)
      return
    }
    cp.exec(`${path.join(pasteldBasePath, 'node-win.msi')}`)
  } catch (error) {
    log.error('Open Nodejs file error:', error)
  }
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
      nodePath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-linux', 'bin', 'node'),
      ),
      npxPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-linux', 'bin', 'npx'),
      ),
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
      nodePath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-mac', 'bin', 'node'),
      ),
      npxPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-mac', 'bin', 'npx'),
      ),
      npmPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'node-mac', 'bin', 'npm'),
      ),
      wrapperScriptPath: replaceSpaceInPath(
        path.join(pasteldBasePath, 'run-npm-mac.sh'),
      ),
    }
  }
  return {
    nodePath: path.join(pasteldBasePath, 'node-win', 'node.exe'),
    npxPath: path.join(pasteldBasePath, 'node-win', 'npx.cmd'),
    npmPath: path.join(pasteldBasePath, 'node-win', 'npm.cmd'),
    wrapperScriptPath: path.join(pasteldBasePath, 'run-npm-win.bat'),
  }
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

const checkAndFixNodeBinaryForMac = (pastelConf: IPastelConfProps) => {
  if (os.platform() !== 'darwin') {
    return
  }
  const copyFiles = () => {
    const { npmPath, nodePath, npxPath } = getNodeBinaryPath(
      pastelConf.pasteldBasePath,
    )
    const copyNodeBinary = () => {
      try {
        fs.copyFileSync(nodePath, '/usr/local/bin')
      } catch (error) {
        log.error('copy Node Binary error', error)
      }
    }
    const copyNpmAndNpxBinary = () => {
      try {
        fs.copyFileSync(npmPath, '/usr/local/bin')
      } catch (error) {
        log.error('copy Npm ninary error', error)
      }
      try {
        fs.copyFileSync(npxPath, '/usr/local/bin')
      } catch (error) {
        log.error('copy Npx Binary error', error)
      }
    }
    try {
      try {
        const output = cp.execSync(`${nodePath} -v`).toString()
        if (output.trim().indexOf('v22') == -1) {
          copyNodeBinary()
        }
      } catch (error) {
        copyNodeBinary()
      }
      try {
        const output = cp.execSync(`${npmPath} -v`).toString()
        if (!output) {
          copyNpmAndNpxBinary()
        }
      } catch (error) {
        copyNpmAndNpxBinary()
      }
    } catch (error) {
      log.error('checkAndFixNodeBinaryForMac error: ', error)
    }
  }
  try {
    const nodeMacPath = path.join(pastelConf.pasteldBasePath, 'node-mac')
    const absPath = path.join(pastelConf.pasteldBasePath, 'node-mac.zip')
    if (!fs.existsSync(nodeMacPath) && fs.existsSync(absPath)) {
      fs.createReadStream(absPath)
        .pipe(unzipper.Extract({ path: pastelConf.pasteldBasePath }))
        .on('close', () => {
          log.log('Extraction nodeMacPath complete')
          try {
            fs.unlinkSync(absPath)
          } catch (error) {
            log.error('unlinkSync nodeMacPath', error)
          }
          copyFiles()
        })
        .on('error', err => {
          log.error(`Error extracting zip file: ${err}`)
        })
    } else {
      copyFiles()
    }
  } catch (error) {
    log.error('unzip nodeMacPath', error)
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
          fs.rmSync(pastelInferencePath, { recursive: true, force: true })
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
