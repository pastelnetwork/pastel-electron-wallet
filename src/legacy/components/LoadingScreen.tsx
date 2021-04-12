/* eslint-disable */

import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router'
import ini from 'ini'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { remote, ipcRenderer } from 'electron'
import { spawn } from 'child_process'
import routes from '../constants/routes.json'
import { RPCConfig } from './AppState'
import RPC from '../rpc'
import cstyles from './Common.module.css'
import styles from './LoadingScreen.module.css'
import { NO_CONNECTION } from '../utils/utils'
import Logo from '../assets/img/pastel-logo.png'
import pasteldlogo from '../assets/img/pastel-logo2.png'
import process from 'process'
import { checkHashAndDownloadParams } from '../../features/loading'

const locatePastelConfDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(remote.app.getPath('appData'), 'Pastel')
  }

  if (os.platform() === 'linux') {
    return path.join(remote.app.getPath('home'), '.pastel')
  }

  return path.join(remote.app.getPath('appData'), 'Pastel')
}

const locatePastelConf = () => {
  if (os.platform() === 'darwin') {
    return path.join(remote.app.getPath('appData'), 'Pastel', 'pastel.conf')
  }

  if (os.platform() === 'linux') {
    return path.join(remote.app.getPath('home'), '.pastel', 'pastel.conf')
  }

  return path.join(remote.app.getPath('appData'), 'Pastel', 'pastel.conf')
}

const pasteldBasePath = () => {
  if (remote.app.isPackaged) {
    return process.resourcesPath
  }

  return path.join(remote.app.getAppPath(), 'static', 'bin')
}

const locatePasteld = () => {
  if (os.platform() === 'darwin') {
    return path.join(pasteldBasePath(), 'pasteld-mac')
  }

  if (os.platform() === 'linux') {
    return path.join(pasteldBasePath(), 'pasteld-linux')
  }

  return path.join(pasteldBasePath(), 'pasteld-win.exe')
}

const locatePastelParamsDir = () => {
  if (os.platform() === 'darwin') {
    return path.join(remote.app.getPath('appData'), 'PastelParams')
  }

  if (os.platform() === 'linux') {
    return path.join(remote.app.getPath('home'), '.pastel-params')
  }

  return path.join(remote.app.getPath('appData'), 'PastelParams')
}

class LoadingScreenState {
  currentStatus = 'Loading...'
  creatingPastelConf = false
  loadingDone = false
  pasteldSpawned = 0
  getinfoRetryCount = 0
  rpcConfig: RPCConfig | null = null
}

class LoadingScreen extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = new LoadingScreenState()
  }

  componentDidMount() {
    ;(async () => {
      const success = await this.ensurePastelParams()

      if (success) {
        await this.loadPastelConf(true)
        await this.setupExitHandler()
      }
    })()
  }

  ensurePastelParams = async () => {
    const params = [
      {
        name: 'sapling-output.params',
        url: 'https://z.cash/downloads/sapling-output.params',
        sha256:
          '2f0ebbcbb9bb0bcffe95a397e7eba89c29eb4dde6191c339db88570e3f3fb0e4',
      },
      {
        name: 'sapling-spend.params',
        url: 'https://z.cash/downloads/sapling-spend.params',
        sha256:
          '8e48ffd23abb3a5fd9c5589204f32d9c31285a04b78096ba40a79b75677efc13',
      },
      {
        name: 'sprout-groth16.params',
        url: 'https://z.cash/downloads/sprout-groth16.params',
        sha256:
          'b685d700c60328498fbde589c8c7c484c722b788b265b72af448a5bf0ee55b50',
      },
      {
        name: 'sprout-proving.key',
        url: 'https://z.cash/downloads/sprout-proving.key',
        sha256:
          '8bc20a7f013b2b58970cddd2e7ea028975c88ae7ceb9259a5344a16bc2c0eef7',
      },
      {
        name: 'sprout-verifying.key',
        url: 'https://z.cash/downloads/sprout-verifying.key',
        sha256:
          '4bd498dae0aacfd8e98dc306338d017d9c08dd0918ead18172bd0aec2fc5df82',
      },
    ]
    this.setState({ errorEnsurePastelParams: false })

    try {
      await checkHashAndDownloadParams({
        params,
        outputDir: locatePastelParamsDir(),
        onProgress: currentStatus => this.setState({ currentStatus }),
      })
      return true
    } catch (err) {
      this.setState({
        currentStatus: `Error downloading params. The error was: ${err}`,
        errorEnsurePastelParams: true,
      })
      return false
    }
  }

  async loadPastelConf(createIfMissing: any) {
    // Load the RPC config from pastel.conf file
    const pastelLocation = locatePastelConf()
    let confValues

    try {
      confValues = ini.parse(
        await fs.promises.readFile(pastelLocation, {
          encoding: 'utf-8',
        }),
      )
    } catch (err) {
      if (createIfMissing) {
        this.setState({
          creatingPastelConf: true,
        })
        return
      }

      this.setState({
        currentStatus: `Could not create pastel.conf at ${pastelLocation}. This is a bug, please file an issue with Pastel Wallet`,
      })
      return
    } // Get the username and password

    const rpcConfig = new RPCConfig()
    rpcConfig.username = confValues.rpcuser
    rpcConfig.password = confValues.rpcpassword

    if (!rpcConfig.username || !rpcConfig.password) {
      this.setState({
        currentStatus: (
          <div>
            <p>
              Your pastel.conf is missing a &quot;rpcuser&quot; or
              &quot;rpcpassword&quot;.
            </p>
            <p>
              Please add a &quot;rpcuser=some_username&quot; and
              &quot;rpcpassword=some_password&quot; to your pastel.conf to
              enable RPC access
            </p>
            <p>Your pastel.conf is located at {pastelLocation}</p>
          </div>
        ),
      })
      return
    }

    const isTestnet =
      (confValues.testnet && confValues.testnet === '1') || false
    const server = confValues.rpcbind || '127.0.0.1'
    const port = confValues.rpcport || (isTestnet ? '19932' : '9932')
    rpcConfig.url = `http://${server}:${port}`
    this.setState({
      rpcConfig,
    }) // And setup the next getinfo

    this.setupNextGetInfo()
  }

  createPastelconf = async () => {
    const { connectOverTor, enableFastSync } = this.state
    const dir = locatePastelConfDir()

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const pastelConfPath = await locatePastelConf()
    let confContent = ''
    confContent += 'server=1\n'
    confContent += 'rpcuser=pastelwallet\n'
    confContent += `rpcpassword=${Math.random()
      .toString(36)
      .substring(2, 15)}\n`

    if (connectOverTor) {
      confContent += 'proxy=127.0.0.1:9050\n'
    }

    if (enableFastSync) {
      confContent += 'ibdskiptxverification=1\n'
    }

    await fs.promises.writeFile(pastelConfPath, confContent)
    this.setState({
      creatingPastelConf: false,
    })
    this.loadPastelConf(false)
  }
  pasteld: any = null
  setupExitHandler = () => {
    // App is quitting, exit pasteld as well
    ipcRenderer.on('appquitting', async () => {
      if (this.pasteld) {
        const { history } = this.props
        const { rpcConfig } = this.state
        this.setState({
          currentStatus: 'Waiting for pasteld to exit...',
        })
        history.push(routes.LOADING)
        this.pasteld.on('close', () => {
          ipcRenderer.send('appquitdone')
        })
        this.pasteld.on('exit', () => {
          ipcRenderer.send('appquitdone')
        })
        console.log('Sending stop')
        setTimeout(() => {
          RPC.doRPC('stop', [], rpcConfig)
        })
      } else {
        // And reply that we're all done.
        ipcRenderer.send('appquitdone')
      }
    })
  }
  startPasteld = async () => {
    const { pasteldSpawned } = this.state

    if (pasteldSpawned) {
      this.setState({
        currentStatus: 'pasteld start failed',
      })
      return
    }

    const program = locatePasteld()
    console.log(program)
    this.pasteld = spawn(program)
    this.setState({
      pasteldSpawned: 1,
    })
    this.setState({
      currentStatus: 'pasteld starting...',
    })
    this.pasteld.on('error', (err: any) => {
      console.log(`pasteld start error, giving up. Error: ${err}`) // Set that we tried to start pasteld, and failed

      this.setState({
        pasteldSpawned: 1,
      }) // No point retrying.

      this.setState({
        getinfoRetryCount: 10,
      })
    })
  }

  setupNextGetInfo() {
    setTimeout(() => this.getInfo(), 1000)
  }

  async getInfo() {
    const { rpcConfig, pasteldSpawned, getinfoRetryCount } = this.state // Try getting the info.

    try {
      const info = await RPC.getInfoObject(rpcConfig)
      console.log(info)
      const { setRPCConfig, setInfo } = this.props
      setRPCConfig(rpcConfig)
      setInfo(info) // This will cause a redirect to the dashboard

      this.setState({
        loadingDone: true,
      })
    } catch (err) {
      // Not yet finished loading. So update the state, and setup the next refresh
      this.setState({
        currentStatus: err,
      })

      if (err === NO_CONNECTION && !pasteldSpawned) {
        // Try to start pasteld
        this.startPasteld()
        this.setupNextGetInfo()
      }

      if (err === NO_CONNECTION && pasteldSpawned && getinfoRetryCount < 10) {
        this.setState({
          currentStatus: 'Waiting for pasteld to start...',
        })
        const inc = getinfoRetryCount + 1
        this.setState({
          getinfoRetryCount: inc,
        })
        this.setupNextGetInfo()
      }

      if (err === NO_CONNECTION && pasteldSpawned && getinfoRetryCount >= 10) {
        // Give up
        this.setState({
          currentStatus: (
            <span>
              Failed to start pasteld. Giving up! Please look at the debug.log
              file.
              <br />
              <span
                className={cstyles.highlight}
              >{`${locatePastelConfDir()}/debug.log`}</span>
              <br />
              Please file an issue with Pastel Wallet
            </span>
          ),
        })
      }

      if (err !== NO_CONNECTION) {
        this.setupNextGetInfo()
      }
    }
  }

  handleEnableFastSync = (event: any) => {
    this.setState({
      enableFastSync: event.target.checked,
    })
  }
  handleTorEnabled = (event: any) => {
    this.setState({
      connectOverTor: event.target.checked,
    })
  }

  render() {
    const {
      loadingDone,
      currentStatus,
      creatingPastelConf,
      connectOverTor,
      enableFastSync,
      errorEnsurePastelParams,
    } = this.state // If still loading, show the status

    if (!loadingDone) {
      return (
        <div className={[cstyles.center, styles.loadingcontainer].join(' ')}>
          {!creatingPastelConf && (
            <div className={cstyles.verticalflex}>
              <div
                style={{
                  marginTop: '100px',
                }}
              >
                <img src={Logo} width='200px;' alt='Logo' />
              </div>
              <div>
                {currentStatus}
                {errorEnsurePastelParams && (
                  <>
                    {' '}
                    <span
                      className={styles.clickable}
                      onClick={this.ensurePastelParams}
                    >
                      Retry
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {creatingPastelConf && (
            <div>
              <div className={cstyles.verticalflex}>
                <div
                  className={[
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                    cstyles.highlight,
                  ].join(' ')}
                >
                  <div className={[cstyles.xlarge].join(' ')}>
                    {' '}
                    Welcome To Pastel Wallet Fullnode!
                  </div>
                </div>

                <div
                  className={[cstyles.center, cstyles.margintoplarge].join(' ')}
                >
                  <img src={pasteldlogo} width='400px' alt='pasteldlogo' />
                </div>

                <div
                  className={[
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                  ].join(' ')}
                  style={{
                    width: '75%',
                    marginLeft: '15%',
                  }}
                >
                  <div>
                    Pastel Fullnode will download the{' '}
                    <span className={cstyles.highlight}>
                      entire Pastel Blockchain
                    </span>
                  </div>
                </div>

                {/*
                <div
                  className={cstyles.left}
                  style={{
                    width: '75%',
                    marginLeft: '15%',
                  }}
                >
                  <div className={cstyles.margintoplarge} />
                  <div className={[cstyles.verticalflex].join(' ')}>
                    <div>
                      <input
                        type='checkbox'
                        onChange={this.handleTorEnabled}
                        defaultChecked={connectOverTor}
                      />
                      &nbsp; Connect over Tor
                    </div>
                    <div className={cstyles.sublight}>
                      Will connect over Tor. Please make sure you have the Tor
                      client installed and listening on port 9050.
                    </div>
                  </div>

                  <div className={cstyles.margintoplarge} />
                  <div className={[cstyles.verticalflex].join(' ')}>
                    <div>
                      <input
                        type='checkbox'
                        onChange={this.handleEnableFastSync}
                        defaultChecked={enableFastSync}
                      />
                      &nbsp; Enable Fast Sync
                    </div>
                    <div className={cstyles.sublight}>
                      When enabled, Pastel Wallet will skip some expensive
                      verifications of the pasteld blockchain when downloading.
                      This option is safe to use if you are creating a brand new
                      wallet.
                    </div>
                  </div>
                </div>
                */}

                <div className={cstyles.buttoncontainer}>
                  <button
                    type='button'
                    className={cstyles.primarybutton}
                    onClick={this.createPastelconf}
                  >
                    Start Pastel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    return <Redirect to={routes.DASHBOARD} />
  }
}

export default withRouter(LoadingScreen)
