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
import fixPath from 'fix-path'
import dayjs from 'dayjs'

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

const getNodeBinaryPath = (pasteldBasePath: string) => {
  if (os.platform() === 'linux') {
    return {
      nodePath: path.join(pasteldBasePath, 'node-linux', 'bin', 'node'),
      npmPath: path.join(pasteldBasePath, 'node-linux', 'bin', 'npm'),
      wrapperScriptPath: path.join(pasteldBasePath, 'run-npm-linux.sh'),
    }
  }
  if (os.platform() === 'darwin') {
    return {
      nodePath: path.join(pasteldBasePath, 'node-mac', 'bin', 'node'),
      npmPath: path.join(pasteldBasePath, 'node-mac', 'bin', 'npm'),
      wrapperScriptPath: path.join(pasteldBasePath, 'run-npm-mac.sh'),
    }
  }
  return {
    nodePath: path.join(pasteldBasePath, 'node-win', 'node.exe'),
    npmPath: path.join(pasteldBasePath, 'node-win', 'npm.cmd'),
    wrapperScriptPath: path.join(pasteldBasePath, 'run-npm-win.sh'),
  }
}

const replaceSpaceInPath = (path: string) => {
  if (os.platform() === 'darwin' || os.platform() === 'linux') {
    return path.replace(/ /g, '\\ ')
  }
  return path
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
        const { wrapperScriptPath } = getNodeBinaryPath(
          pastelConf.pasteldBasePath,
        )
        cp.execFile(
          wrapperScriptPath,
          ['start'],
          { cwd: replaceSpaceInPath(pastelInferencePath) },
          (error, stdout, stderr) => {
            if (error) {
              log.error(`npm install failed: ${error}`)
              mainWindow?.webContents?.send(
                'start_inference_error',
                JSON.stringify(error?.message),
              )
              return
            }
            log.log(`npm install output: ${stdout}`)
            if (stderr) {
              log.error(`npm install errors: ${stderr}`)
            }
          },
        )
        log.log('npm start success')
      }
    },
    function (err) {
      log.error('checkAndStartInitialInference error: ', err.message)
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
        fs.rmSync(pastelInferencePath, { recursive: true, force: true })
      }
    }
  } catch (error) {
    log.error('checkUpdatePastelInferenceJsClient - ', error)
  }
}

export const setupInitialInference = async (
  pastelConf: IPastelConfProps,
): Promise<void> => {
  try {
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
    const zip = new AdmZip(absPath)
    zip.extractAllTo(pastelConf.locateAppDir, true)
    updateConfigForInitialInference(pastelConf, pastelInferencePath)
    try {
      await fs.promises.unlink(absPath)
    } catch (error) {
      throw new Error(
        'utils downloadPastelInferenceJsClient request.get error: error deleting file',
      )
    }

    const { nodePath } = getNodeBinaryPath(pastelConf.pasteldBasePath)
    try {
      cp.execFile(nodePath, ['-v'], (err, stdout) => {
        if (err) {
          log.error('Error checking Node.js version: ', err)
          return
        }
        log.log(`Node.js version: ${stdout.trim()}`)
      })
      const { wrapperScriptPath } = getNodeBinaryPath(
        pastelConf.pasteldBasePath,
      )
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
          if (stderr) {
            log.error('npm install errors: ', stderr)
          }
        },
      )
    } catch (error) {
      log.error('npm install errors:', error)
    }
  } catch (error) {
    log.error('setupInitialInference error: ', error)
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
