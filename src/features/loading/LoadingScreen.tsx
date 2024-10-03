/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChildProcessWithoutNullStreams } from 'child_process'
import clx from 'classnames'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import ini from 'ini'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import log from 'electron-log'
import os from 'os'
import path from 'path'

import store from '../../redux/store'
import pasteldlogo from '../../legacy/assets/img/pastel-logo-white.png'
import { RPCConfig } from '../../legacy/components/AppState'
import cstyles from '../../legacy/components/Common.module.css'
import routes from '../../legacy/constants/routes.json'
import { TWalletInfo } from '../../legacy/Routes'
import RPC from '../../legacy/rpc'
import { NO_CONNECTION } from '../../legacy/utils/utils'
import styles from './LoadingScreen.module.css'
import {
  checkHashAndDownloadParams,
  filterLogKeywords,
  startProcess,
  stopWalletNode,
  installProcess,
} from './utils'
import PastelDB from '../../features/pastelDB/database'
import { createPastelKeysFolder } from '../../features/pastelID'
import { showClosingPastelWalletModal } from '../downloadSnapshot'
import pjson from '../../../package.json'

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

interface IMasterNodeProps {
  result: {
    AssetName: string
  }
}

interface TLoadingProps {
  history: {
    push: ({pathname, search}: {pathname: string; search: string}) => void
  }
  location: {
    search: string
  }
  setRPCConfig: (data: RPCConfig | null) => void
  setInfo: (data: TWalletInfo) => void
}

let infoTimer: NodeJS.Timeout | null = null

let process = '';

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
    await this.loadPastelConf()
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

  loadPastelConf = async () => {
    // Load the RPC config from pastel.conf file
    const pastelLocation = store.getState().appInfo.locatePastelConf
    if (fs.existsSync(pastelLocation)) {
      await this.startPastelUp();
    } else {
      this.setState({ creatingPastelConf: true })
      return
    }
    let confValues

    try {
      confValues = ini.parse(
        await fs.promises.readFile(pastelLocation, { encoding: 'utf-8' }),
      )
    } catch (err) {
      log.error(err)
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

    try {
      createPastelKeysFolder(dir)
    } catch (error) {
      log.error(`createPastelKeysFolder error: ${error.message}`)
    }
    await this.startPastelUp();
  }

  setupExitHandler = () => {
    // App is quitting, exit pasteld as well
    ipcRenderer.on('appquitting', async () => {
      store.dispatch<any>(showClosingPastelWalletModal())
      try {
        const { pastelUtilityBinPath } = store.getState().appInfo;
        await stopWalletNode(pastelUtilityBinPath, this.handleStopProcessLogging);
      } catch (error) {
        log.error(error)
      }
      ipcRenderer.send('appquitdone')
    })
  }
  handleInstallProcessLogging = (line: string) => {
    const getMessage = (process: string) => {
      return (
        <div>Now downloading Snapshot of the blockchain to speed up the syncing process... Please Wait.<br />{process}</div>
      )
    }
    if (filterLogKeywords.some(word => line.includes(word))) {
      const message = line.split(' INFO ')[1] || line;
      log.info(message)
      if (message.indexOf('Downloading...') !== -1 && message.indexOf('complete') !== -1) {
        process = `Downloading... ${message.split('Downloading...')[1]?.trim()}`;
      }
      if (line.indexOf('snapshot downloaded successfully') !== -1) {
        process = 'Installing Pastel Service...'
      }
      this.setState({
        currentStatus: getMessage(process),
      })
    }
  }
  handleStartProcessLogging = (line: string) => {
    if (filterLogKeywords.some(word => line.includes(word))) {
      log.info(line.split(' INFO ')[1] || line)
    }
  }
  handleStopProcessLogging = (line: string) => {
    if (filterLogKeywords.some(word => line.includes(word))) {
      log.info(line.split(' INFO ')[1] || line)
    }
  }
  removePastelResource = async () => {
    try {
      const { locatePastelConfDir, locatePastelConf } = store.getState().appInfo;
      const locateBlocksDir = path.join(locatePastelConfDir, 'blocks')
      const locateChainStateDir = path.join(locatePastelConfDir, 'chainstate')
      const locateOldLogsDir = path.join(locatePastelConfDir, 'old_logs')
      const locateTicketsDir = path.join(locatePastelConfDir, 'tickets')
      const locateDatabaseDir = path.join(locatePastelConfDir, 'database')
      const locateFeeEstimatesFile = path.join(locatePastelConfDir, 'fee_estimates.dat')
      const locateMasternodeConfFile = path.join(locatePastelConfDir, 'masternode.conf-sample')
      const locateMessagesFile = path.join(locatePastelConfDir, 'messages.dat')
      const locateMnCacheFile = path.join(locatePastelConfDir, 'mncache.dat')
      const locateMnPaymentsFile = path.join(locatePastelConfDir, 'mnpayments.dat')
      const locateNetfulfilledFile = path.join(locatePastelConfDir, 'netfulfilled.dat')
      const locatePeersFile = path.join(locatePastelConfDir, 'peers.dat')
      const locateLockFile = path.join(locatePastelConfDir, '.lock')
      if (fs.existsSync(locateBlocksDir)) {
        fs.rmSync(locateBlocksDir, { force: true, recursive: true })
      }
      if (fs.existsSync(locateChainStateDir)) {
        fs.rmSync(locateChainStateDir, { force: true, recursive: true })
      }
      if (fs.existsSync(locateOldLogsDir)) {
        fs.rmSync(locateOldLogsDir, { force: true, recursive: true })
      }
      if (fs.existsSync(locateTicketsDir)) {
        fs.rmSync(locateTicketsDir, { force: true, recursive: true })
      }
      if (fs.existsSync(locateDatabaseDir)) {
        fs.rmSync(locateDatabaseDir, { force: true, recursive: true })
      }
      if (fs.existsSync(locateFeeEstimatesFile)) {
        fs.unlinkSync(locateFeeEstimatesFile)
      }
      if (fs.existsSync(locateMasternodeConfFile)) {
        fs.unlinkSync(locateMasternodeConfFile)
      }
      if (fs.existsSync(locateMessagesFile)) {
        fs.unlinkSync(locateMessagesFile)
      }
      if (fs.existsSync(locateMnCacheFile)) {
        fs.unlinkSync(locateMnCacheFile)
      }
      if (fs.existsSync(locateMnPaymentsFile)) {
        fs.unlinkSync(locateMnPaymentsFile)
      }
      if (fs.existsSync(locateNetfulfilledFile)) {
        fs.unlinkSync(locateNetfulfilledFile)
      }
      if (fs.existsSync(locatePeersFile)) {
        fs.unlinkSync(locatePeersFile)
      }
      if (fs.existsSync(locatePastelConf)) {
        fs.unlinkSync(locatePastelConf)
      }
      if (fs.existsSync(locateLockFile)) {
        fs.unlinkSync(locateLockFile)
      }
    } catch (error) {
      log.error('Remove Pastel resource error', JSON.stringify(error))
    }
  }
  isInstall = () => {
    try {
      const { locatePastelWalletDir } = store.getState().appInfo;
      const pastelVersionFile = path.join(locatePastelWalletDir, 'pastel.version')
      const currentAppVersion = Number(pjson.version.replaceAll('.', ''))
      if (!fs.existsSync(pastelVersionFile)) {
        return true;
      }

      const content = fs.readFileSync(pastelVersionFile).toString();
      const parseContent = JSON.parse(content);
      if (Number(parseContent.wallet) < currentAppVersion) {
        return true;
      }
    } catch (error) {
      log.error('Check wallet version error: ', JSON.stringify(error))
    }

    return false;
  }
  startPastelUp = async () => {
    this.setState({
      creatingPastelConf: false,
    })
    const { locatePastelConf, pastelUtilityBinPath, pastelReinstallPath, isPackaged, locatePastelWalletDir } = store.getState().appInfo;
    const installWalletNode = async () => {
      try {
        process = '';
        // stop is needed in case if some services started and some failed
        if (fs.existsSync(locatePastelConf)) {
          await stopWalletNode(pastelUtilityBinPath, this.handleStopProcessLogging)
        }
        await this.removePastelResource()
        await installProcess(pastelUtilityBinPath, this.handleInstallProcessLogging)
        const pastelVersionFile = path.join(locatePastelWalletDir, 'pastel.version')
        if (fs.existsSync(pastelVersionFile)) {
          const currentAppVersion = Number(pjson.version.replaceAll('.', ''))
          fs.writeFileSync(pastelVersionFile, JSON.stringify({
            wallet: currentAppVersion
          }))
        }
      } catch (error) {
        log.error('installWalletNode error: ', error)
        if (this.state.currentStatus.toString().indexOf('Install node: Finished') !== -1) {
          if (os.platform() === 'linux' || !isPackaged) {
            // stop is needed in case if some services started and some failed
            if (fs.existsSync(locatePastelConf)) {
              await stopWalletNode(pastelUtilityBinPath, this.handleStopProcessLogging)
            }
            log.info('Restart pastel wallet after installed')
            this.loadPastelConf()
          } else if (isPackaged) {
            log.info('Restart pastel wallet after installed')
            ipcRenderer.send('reset_pastel_app')
          }
        }
      }
    }
    if (!fs.existsSync(locatePastelConf) || this.isInstall()) {
      await installWalletNode();
      if (os.platform() === 'linux' || !isPackaged) {
        // stop is needed in case if some services started and some failed
        if (fs.existsSync(locatePastelConf)) {
          await stopWalletNode(pastelUtilityBinPath, this.handleStopProcessLogging)
        }
        log.info('Start pastel wallet after installed')
        this.loadPastelConf()
      } else if (isPackaged) {
        log.info('Restart pastel wallet after installed')
        ipcRenderer.send('reset_pastel_app')
      }
      return true;
    } else if (fs.existsSync(pastelReinstallPath)) {
      const content = fs.readFileSync(pastelReinstallPath);
      if (content) {
        const parseContent = JSON.parse(content.toString());
        if (parseContent?.reinstall) {
          await installWalletNode();
          try {
            fs.unlinkSync(pastelReinstallPath)
          } catch (error) {
            log.error(error)
          }
          if (os.platform() === 'linux' || !isPackaged) {
            // stop is needed in case if some services started and some failed
            if (fs.existsSync(locatePastelConf)) {
              await stopWalletNode(pastelUtilityBinPath, this.handleStopProcessLogging)
            }
            log.info('Start pastel wallet after installed')
            this.loadPastelConf()
          } else if (isPackaged) {
            log.info('Restart pastel wallet after installed')
            ipcRenderer.send('reset_pastel_app')
          }
        }
      }
      return true;
    } else {
      try {
        this.setState({
          currentStatus: 'Waiting for the Pastel Service to start...',
        })
        await startProcess(pastelUtilityBinPath, this.handleStartProcessLogging);

        try {
          await PastelDB.getDatabaseInstance()
        } catch (error) {
          // TODO log errors to a central logger so we can address them later.
          log.error(`startPastelUp error: ${error.message}`)
        }
        return true;
      } catch (error) {
        this.setState({
          currentStatus: (
            <div>
              Failed to start pasteld. Giving up! Please look at the debug.log
              file.
              <br />
              <span className={cstyles.highlight}>{store.getState().appInfo.locatePastelLog}</span>
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
        log.error('startProcess', error)
      }
    }
    return false;
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
  async handleResetPastel() {
    const { locatePastelConf, pastelUtilityBinPath, isPackaged } = store.getState().appInfo;
    if (fs.existsSync(locatePastelConf)) {
      await stopWalletNode(pastelUtilityBinPath, (line: string) => {
        if (filterLogKeywords.some(word => line.includes(word))) {
          log.info(line.split(' INFO ')[1] || line)
        }
      })
    }
    if (isPackaged) {
      ipcRenderer.send('reset_pastel_app')
    }
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
        const { pastelUtilityBinPath } = store.getState().appInfo;
        this.setState({
          currentStatus: 'Waiting for the Pastel Service to start...',
        })
        await startProcess(pastelUtilityBinPath, this.handleStartProcessLogging)
        this.setupNextGetInfo()
      }

      if (err === NO_CONNECTION && pasteldSpawned && getInfoRetryCount < 10) {
        this.setState({
          currentStatus: 'Waiting for the Pastel Service to start...',
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
                store.getState().appInfo.locatePastelLog
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

