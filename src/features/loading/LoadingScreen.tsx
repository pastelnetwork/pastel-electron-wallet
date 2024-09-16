/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import clx from 'classnames'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import ini from 'ini'
import React, { Component } from 'react'
import { Redirect } from 'react-router'

import store from '../../redux/store'
import pasteldlogo from '../../legacy/assets/img/pastel-logo-white.png'
import { RPCConfig } from '../../legacy/components/AppState'
import cstyles from '../../legacy/components/Common.module.css'
import routes from '../../legacy/constants/routes.json'
import { TWalletInfo } from '../../legacy/Routes'
import RPC from '../../legacy/rpc'
import { NO_CONNECTION } from '../../legacy/utils/utils'
import styles from './LoadingScreen.module.css'
import { checkHashAndDownloadParams, spawnProcess, filterLogKeywords } from './utils'
import PastelDB from '../../features/pastelDB/database'
import { createPastelKeysFolder } from '../../features/pastelID'

interface TLoadingState {
  currentStatus: string | JSX.Element
  creatingPastelConf: boolean
  loadingDone: boolean
  connectOverTor: boolean
  enableFastSync: boolean
  errorEnsurePastelParams: boolean
  pasteldSpawned: number
  getInfoRetryCount: number
  rpcConfig: RPCConfig | null
}

interface TLoadingProps {
  history: {
    push: (route: string) => void
  }
  setRPCConfig: (data: RPCConfig | null) => void
  setInfo: (data: TWalletInfo) => void
}

let infoTimer: NodeJS.Timeout | null = null

class LoadingScreen extends Component<TLoadingProps, TLoadingState> {
  pasteld: ChildProcessWithoutNullStreams | null = null

  constructor(props: TLoadingProps) {
    super(props)
    this.state = {
      currentStatus: 'Loading...',
      creatingPastelConf: false,
      loadingDone: false,
      connectOverTor: false,
      enableFastSync: false,
      errorEnsurePastelParams: false,
      pasteldSpawned: 0,
      getInfoRetryCount: 0,
      rpcConfig: null,
    }
  }

  componentDidMount() {
    ipcRenderer.send('start_app')
    this.handleStartLoading()
  }

  handleStartLoading() {
    if (!store.getState().appInfo.locatePastelParamsDir) {
      setTimeout(() => {
        this.handleStartLoading()
      }, 2000)
    } else {
      this.loadingConfigs()
    }
  }

  loadingConfigs = async () => {
    await this.loadPastelConf(true)
    this.setupExitHandler()
  }

  ensurePastelParams = async () => {
    const domain = 'https://download.pastel.network/other/pastel-params'
    const params = [
      {
        name: 'sapling-output.params',
        url: `${domain}/sapling-output.params`,
        sha256:
          '2f0ebbcbb9bb0bcffe95a397e7eba89c29eb4dde6191c339db88570e3f3fb0e4',
      },
      {
        name: 'sapling-spend.params',
        url: `${domain}/sapling-spend.params`,
        sha256:
          '8e48ffd23abb3a5fd9c5589204f32d9c31285a04b78096ba40a79b75677efc13',
      },
      {
        name: 'sprout-groth16.params',
        url: `${domain}/sprout-groth16.params`,
        sha256:
          'b685d700c60328498fbde589c8c7c484c722b788b265b72af448a5bf0ee55b50',
      },
      {
        name: 'sprout-proving.key',
        url: `${domain}/sprout-proving.key`,
        sha256:
          '8bc20a7f013b2b58970cddd2e7ea028975c88ae7ceb9259a5344a16bc2c0eef7',
      },
      {
        name: 'sprout-verifying.key',
        url: `${domain}/sprout-verifying.key`,
        sha256:
          '4bd498dae0aacfd8e98dc306338d017d9c08dd0918ead18172bd0aec2fc5df82',
      },
    ]
    this.setState({ errorEnsurePastelParams: false })
    try {
      await checkHashAndDownloadParams({
        params,
        outputDir: store.getState().appInfo.locatePastelParamsDir,
        onProgress: (currentStatus: string) => this.setState({ currentStatus }),
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

  loadPastelConf = async (createIfMissing: boolean) => {
    await this.startPastelUp();
    // Load the RPC config from pastel.conf file
    const pastelLocation = store.getState().appInfo.locatePastelConf
    let confValues

    try {
      confValues = ini.parse(
        await fs.promises.readFile(pastelLocation, { encoding: 'utf-8' }),
      )
    } catch (err) {
      if (createIfMissing) {
        this.setState({ creatingPastelConf: true })
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

  createPastelConf = async () => {
    // const { connectOverTor, enableFastSync } = this.state
    const dir = store.getState().appInfo.locatePastelConfDir

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const pastelConfPath = store.getState().appInfo.locatePastelConf
    let confContent = ''
    if (fs.existsSync(pastelConfPath)) {
      const pastelConfigContent = fs.readFileSync(pastelConfPath);
      confContent = pastelConfigContent.toString();
    }
    confContent += 'testnet=0\n'
    confContent += 'minrelaytxfee=0.00001\n'
    confContent += 'maxmempool=20000\n'
    confContent += 'rpcworkqueue=2056\n'
    confContent += 'rpcthreads=20\n'
    confContent += 'gen=0\n'
    confContent += 'addnode=137.184.118.147\n'
    confContent += 'addnode=143.198.58.140\n'
    confContent += 'addnode=146.190.175.119\n'
    confContent += 'addnode=154.12.230.224\n'
    confContent += 'addnode=154.12.240.59\n'
    confContent += 'addnode=154.12.241.117\n'
    confContent += 'addnode=154.12.241.128\n'
    confContent += 'addnode=154.12.244.163\n'
    confContent += 'addnode=154.12.253.219\n'
    confContent += 'addnode=154.12.253.220\n'
    confContent += 'addnode=154.12.253.225\n'
    confContent += 'addnode=154.12.254.248\n'
    confContent += 'addnode=154.12.254.251\n'
    confContent += 'addnode=154.12.255.11\n'
    confContent += 'addnode=154.12.255.24\n'
    confContent += 'addnode=154.12.255.9\n'
    confContent += 'addnode=154.38.162.90\n'
    confContent += 'addnode=154.38.166.116\n'
    confContent += 'addnode=154.38.166.118\n'
    confContent += 'addnode=154.38.166.119\n'
    confContent += 'addnode=154.38.166.120\n'
    confContent += 'addnode=154.38.177.234\n'
    confContent += 'addnode=154.53.32.125\n'
    confContent += 'addnode=154.53.32.126\n'
    confContent += 'addnode=154.53.32.146\n'
    confContent += 'addnode=154.53.32.48\n'
    confContent += 'addnode=154.53.60.47\n'
    confContent += 'addnode=154.53.61.221\n'
    confContent += 'addnode=154.53.61.222\n'
    confContent += 'addnode=154.53.63.109\n'
    confContent += 'addnode=154.53.63.115\n'
    confContent += 'addnode=157.173.193.198\n'
    confContent += 'addnode=157.173.193.199\n'
    confContent += 'addnode=157.173.193.200\n'
    confContent += 'addnode=157.173.193.201\n'
    confContent += 'addnode=157.173.193.202\n'
    confContent += 'addnode=157.230.115.155\n'
    confContent += 'addnode=159.65.114.136\n'
    confContent += 'addnode=159.65.149.140\n'
    confContent += 'addnode=159.89.164.214\n'
    confContent += 'addnode=165.227.130.203\n'
    confContent += 'addnode=165.227.161.206\n'
    confContent += 'addnode=165.227.169.213\n'
    confContent += 'addnode=167.86.100.60\n'
    confContent += 'addnode=167.86.107.194\n'
    confContent += 'addnode=167.86.107.225\n'
    confContent += 'addnode=167.86.108.177\n'
    confContent += 'addnode=167.86.109.139\n'
    confContent += 'addnode=167.86.110.108\n'
    confContent += 'addnode=167.86.113.250\n'
    confContent += 'addnode=167.86.66.254\n'
    confContent += 'addnode=167.86.67.143\n'
    confContent += 'addnode=167.86.68.124\n'
    confContent += 'addnode=167.86.68.179\n'
    confContent += 'addnode=167.86.69.188\n'
    confContent += 'addnode=167.86.77.216\n'
    confContent += 'addnode=18.116.179.95\n'
    confContent += 'addnode=18.218.28.57\n'
    confContent += 'addnode=18.220.120.83\n'
    confContent += 'addnode=188.166.160.37\n'
    confContent += 'addnode=207.180.250.195\n'
    confContent += 'addnode=207.180.250.197\n'
    confContent += 'addnode=207.180.250.245\n'
    confContent += 'addnode=207.180.252.205\n'
    confContent += 'addnode=207.180.253.124\n'
    confContent += 'addnode=207.180.253.218\n'
    confContent += 'addnode=207.180.255.57\n'
    confContent += 'addnode=207.244.235.138\n'
    confContent += 'addnode=3.12.66.189\n'
    confContent += 'addnode=3.128.23.169\n'
    confContent += 'addnode=3.132.60.47\n'
    confContent += 'addnode=3.135.47.3\n'
    confContent += 'addnode=3.136.75.28\n'
    confContent += 'addnode=3.141.226.93\n'
    confContent += 'addnode=3.18.200.136\n'
    confContent += 'addnode=31.220.99.58\n'
    confContent += 'addnode=31.220.99.59\n'
    confContent += 'addnode=31.220.99.60\n'
    confContent += 'addnode=31.220.99.61\n'
    confContent += 'addnode=31.220.99.62\n'
    confContent += 'addnode=38.242.137.199\n'
    confContent += 'addnode=38.242.137.201\n'
    confContent += 'addnode=38.242.158.208\n'
    confContent += 'addnode=38.242.159.6\n'
    confContent += 'addnode=38.242.159.85\n'
    confContent += 'addnode=38.242.159.95\n'
    confContent += 'addnode=45.137.194.13\n'
    confContent += 'addnode=45.137.194.19\n'
    confContent += 'addnode=45.137.194.22\n'
    confContent += 'addnode=52.14.134.207\n'
    confContent += 'addnode=64.227.110.96\n'
    confContent += 'addnode=66.94.114.198\n'
    confContent += 'addnode=66.94.115.17\n'
    confContent += 'addnode=66.94.125.53\n'
    confContent += 'addnode=75.119.152.80\n'
    confContent += 'addnode=84.54.23.106\n'
    confContent += 'addnode=84.54.23.108\n'
    confContent += 'addnode=84.54.23.113\n'
    confContent += 'addnode=84.54.23.121\n'
    confContent += 'addnode=84.54.23.129\n'
    confContent += 'addnode=84.54.23.133\n'
    confContent += 'addnode=84.54.23.136\n'
    confContent += 'addnode=84.54.23.143\n'
    confContent += 'addnode=86.48.1.252\n'
    confContent += 'addnode=86.48.3.8\n'
    confContent += 'addnode=89.117.78.88\n'
    confContent += 'addnode=89.117.78.89\n'
    confContent += 'addnode=89.117.78.90\n'
    confContent += 'addnode=89.117.78.91\n'
    confContent += 'addnode=89.117.78.92\n'
    confContent += 'addnode=89.117.79.22\n'
    confContent += 'addnode=89.117.79.23\n'
    confContent += 'addnode=89.117.79.24\n'
    confContent += 'addnode=89.117.79.25\n'
    confContent += 'addnode=89.117.79.2\n'

    await fs.promises.writeFile(pastelConfPath, confContent)
    await this.startPastelUp();
    this.setState({
      creatingPastelConf: false,
    })

    try {
      createPastelKeysFolder(dir)
    } catch (error) {
      console.error(`createPastelKeysFolder error: ${error.message}`)
    }
    try {
      PastelDB.getDatabaseInstance()
    } catch (error) {
      // TODO log errors to a central logger so we can address them later.
      console.error(`PastelDB.getDatabaseInstance error: ${error.message}`)
    }
    this.loadPastelConf(false)
  }

  setupExitHandler = () => {
    // App is quitting, exit pasteld as well
    ipcRenderer.on('appquitting', async () => {
      const { history } = this.props
      history.push(routes.LOADING)
      while (!PastelDB.isValidDB()) {
        // wait if database is reading or writing status
        new Promise(resolve => setTimeout(resolve, 100))
      }
      try {
        const { rpcConfig } = this.state
        await RPC.doRPC('stop', [], rpcConfig)
        await this.stopWalletNode();
      } catch (error) {
        console.error(error)
      }
      ipcRenderer.send('appquitdone')
    })
  }
  handleProcessLogging = (line: string) => {
    if (filterLogKeywords.some(word => line.includes(word))) {
      this.setState({
        pasteldSpawned: 1,
        currentStatus: line.split(' INFO ')[1] || line,
      })
    }
  }
  startProcess = async () => {
    const { isPackaged, pastelUtilityBinPath } = store.getState().appInfo;
    const args = ['start', 'walletnode']
    if (!isPackaged) {
      args.push('--development-mode')
    }
    return spawnProcess(pastelUtilityBinPath, args)
  }
  stopWalletNode = async () => {
    const { pastelUtilityBinPath } = store.getState().appInfo;
    await spawnProcess(pastelUtilityBinPath, ['stop', 'walletnode'])
  }
  installProcess = async () => {
    const { pastelUtilityBinPath } = store.getState().appInfo;
    await spawnProcess(
      pastelUtilityBinPath,
      ['install', 'walletnode', '-n', 'mainnet', '-f', '-use-snapshot', 'true'],
      {
        onStdoutLine: this.handleProcessLogging,
      },
    )
  }
  startPastelUp = async () => {
    const { pasteldSpawned } = this.state
    if (pasteldSpawned) {
      this.setState({
        currentStatus: 'pasteld start failed',
      })
      return
    }
    this.setState({
      creatingPastelConf: false,
    })
    const { locatePastelConf, locatePasteld } = store.getState().appInfo;
     // stop is needed in case if some services started and some failed
    if (fs.existsSync(locatePastelConf)) {
      await this.stopWalletNode()
    }
    if (!fs.existsSync(locatePasteld)) {
      await this.installProcess()
    }
    try {
      this.setState({
        pasteldSpawned: 1,
        currentStatus: 'pasteld starting...',
      })
      await this.startProcess();
      this.setState({
        creatingPastelConf: true,
      })
    } catch (error) {
      await this.startProcess()
      this.setState({
        creatingPastelConf: true,
      })
      this.loadPastelConf(false)
    }
    try {
      await PastelDB.getDatabaseInstance()
    } catch (error) {
      // TODO log errors to a central logger so we can address them later.
      console.error(`PastelDB.getDatabaseInstance error: ${error.message}`)
    }
    this.loadPastelConf(false)
  }

  setupNextGetInfo() {
    const isDownloadSnapshot = store.getState().downloadSnapshot
      .isDownloadSnapshot
    if (!isDownloadSnapshot) {
      infoTimer = setTimeout(() => this.getInfo(), 1000)
    } else if (infoTimer) {
      clearTimeout(infoTimer)
    }
  }

  handleResetPastel() {
    ipcRenderer.send('reset_pastel_app')
  }

  async getInfo() {
    const { rpcConfig, pasteldSpawned, getInfoRetryCount } = this.state // Try getting the info.
    try {
      const info = await RPC.getInfoObject(rpcConfig)
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
        await this.startProcess()
        this.setupNextGetInfo()
      }

      if (err === NO_CONNECTION && pasteldSpawned && getInfoRetryCount < 10) {
        this.setState({
          currentStatus: 'Waiting for pasteld to start...',
        })
        const inc = getInfoRetryCount + 1
        this.setState({
          getInfoRetryCount: inc,
        })
        this.setupNextGetInfo()
      }

      if (err === NO_CONNECTION && pasteldSpawned && getInfoRetryCount >= 10) {
        // Give up
        this.setState({
          currentStatus: (
            <div>
              Failed to start pasteld. Giving up! Please look at the debug.log
              file.
              <br />
              <span className={cstyles.highlight}>{`${
                store.getState().appInfo.locatePastelConfDir
              }/debug.log`}</span>
              <br />
              Please file an issue with Pastel Wallet
              <div className={cstyles.buttoncontainer}>
                <button
                  type='button'
                  className={cstyles.primarybutton}
                  onClick={this.handleResetPastel}
                >
                  Restart Pastel
                </button>
              </div>
            </div>
          ),
        })
      }

      if (err !== NO_CONNECTION) {
        this.setupNextGetInfo()
      }
    }
  }

  render() {
    const {
      loadingDone,
      currentStatus,
      creatingPastelConf,
      errorEnsurePastelParams,
    } = this.state // If still loading, show the status

    if (!loadingDone) {
      return (
        <div className={clx(cstyles.center, styles.loadingcontainer)}>
          <div className={styles.viewContent}>
            {creatingPastelConf ? (
              <div className={cstyles.verticalflex}>
                <div
                  className={clx(
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                    cstyles.highlight,
                  )}
                >
                  <div className={cstyles.xlarge}>
                    {' '}
                    Welcome To Pastel Wallet Fullnode!
                  </div>
                </div>

                <div className={clx(cstyles.center, cstyles.margintoplarge)}>
                  <img src={pasteldlogo} width='400px' alt='pasteldlogo' />
                </div>

                <div
                  className={clx(
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                  )}
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

                <div className={cstyles.buttoncontainer}>
                  <button
                    type='button'
                    className={cstyles.primarybutton}
                    onClick={this.createPastelConf}
                  >
                    Start Pastel
                  </button>
                </div>
              </div>
            ) : (
              <div className={cstyles.verticalflex}>
                <div className={styles.viewInner}>
                  <div className={styles.loaderWrapper}>
                    <div className={styles.loader} />
                  </div>
                </div>
                <div className={styles.textWrap}>
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
          </div>
        </div>
      )
    }

    return <Redirect to={routes.DASHBOARD} />
  }
}

export default LoadingScreen

