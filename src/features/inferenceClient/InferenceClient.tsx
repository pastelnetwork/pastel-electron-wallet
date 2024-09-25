import React from 'react'
import { ipcRenderer, shell } from 'electron'
import tcpPortUsed from 'tcp-port-used'
import cx from 'classnames'
import log from 'electron-log'

import { useAppSelector } from '../../redux/hooks'
import { rpc } from '../../api/pastel-rpc/rpc'
import store from '../../redux/store'
import { inferenceClient } from '../constants/ServeStatic'
import cstyles from '../../common/utils/Styles.module.css'
import loadingStyles from '../loading/LoadingScreen.module.css'
import dstyles from '../downloadSnapshot/DownloadSnapshot.module.css'

import styles from './inferenceClient.module.css'

interface IMasterNodeProps {
  result: {
    AssetName: string
  }
}

export default function InferenceClient(): JSX.Element {
  const [status, setStatus] = React.useState('Loading Inference Client... Please Wait.')
  const [isError, setError] = React.useState(false)
  const [isReloadInference, setReloadInference] = React.useState(false)
  const { isConnected } = useAppSelector(state => state.downloadSnapshot)

  const checkStartInitialInference = async () => {
    tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
      function (inUse) {
        if (!inUse) {
          setTimeout(() => {
            checkStartInitialInference()
          }, 3000)
        } else {
          setStatus('success')
          setError(false)
          if (isReloadInference) {
            log.info('Inference started successfully')
          }
          setReloadInference(false)
        }
      },
      function (err) {
        console.error('Error on check:', err.message)
      },
    )
  }

  const getSupernodeData = async () => {
    try {
      const { pastelConf } = store.getState()
      const [
        masternodeListFull,
        masternodeListRank,
        masternodeListPubkey,
        masternodeListExtra,
      ] = await Promise.all([
        rpc<IMasterNodeProps>(
          'masternodelist',
          ['full'],
          pastelConf,
        ),
        rpc<IMasterNodeProps>(
          'masternodelist',
          ['rank'],
          pastelConf,
        ),
        rpc<IMasterNodeProps>(
          'masternodelist',
          ['pubkey'],
          pastelConf,
        ),
        rpc<IMasterNodeProps>(
          'masternodelist',
          ['extra'],
          pastelConf,
        ),
      ]);
      log.info('masternodeListFull: ', JSON.stringify(masternodeListFull))
      log.info('masternodeListRank: ', JSON.stringify(masternodeListRank))
      log.info('masternodeListPubkey: ', JSON.stringify(masternodeListPubkey))
      log.info('masternodeListExtra: ', JSON.stringify(masternodeListExtra))
    } catch (error) {
      log.error('getSupernodeData error: ', error)
    }
  }

  const getMasternodeStatus = async () => {
    try {
      const { pastelConf } = store.getState()
      const { result } = await rpc<IMasterNodeProps>(
        'mnsync',
        ['status'],
        pastelConf,
      )
      log.info(`mnsync: ${JSON.stringify(result)}`)
    } catch (error) {
      log.error('mnsync error: ', error)
    }
  }

  const checkMasterNodeStatus = async () => {
    try {
      const { pastelConf } = store.getState()
      const { result } = await rpc<IMasterNodeProps>(
        'masternodelist',
        ['full'],
        pastelConf,
      )

      if (!Object.keys(result).length) {
        setStatus('The supernode information commands are not returning complete information. Inference Client is waiting for complete information before displaying.')
        setTimeout(() => {
          checkMasterNodeStatus()
        }, 1000)
      } else {
        setStatus('Loading Inference Client... Please Wait.')
        checkStartInitialInference()
      }
    } catch (error) {
      console.error('checkMasterNodeStatus', error)
    }
  }

  React.useEffect(() => {
    if (isConnected) {
      checkMasterNodeStatus()
    } else {
      setStatus("Waiting for node to sync to 100% before Inference Client can be displayed.")
    }
  }, [isConnected])

  const handleReloadInferenceClient = async () => {
    setError(false)
    log.info('Reload Inference Client')
    await getMasternodeStatus()
    await getSupernodeData()
    ipcRenderer.send('reload_inference_client')
    setStatus('Loading Inference Client... Please Wait.')
    setReloadInference(true)
  }

  if (status !== 'success') {
    return (
      <div className={styles.wrapper}>
        {!isError ?
          <div className={styles.loadingWrapper}>
            <div className={loadingStyles.viewInner}>
              <div className={loadingStyles.loaderWrapper}>
                <div className={loadingStyles.loader} />
              </div>
            </div>
            <div className={loadingStyles.textWrap}>
              {status}
            </div>
          </div> : null
        }

        {isError ? (
          <>
            <div className={cx(styles.textWrap, styles.textWrapPadding)}>
              Failed to load Inference Client. Please look at the log file.
            </div>
            <div className={cx(styles.textWrap, styles.textWrapPadding)}>
              <span className={cstyles.highlight}>{store.getState().appInfo.locatePastelLog}</span>
            </div>
            <div className={styles.reloadInferenceClientWrapper}>
              <button
                type='button'
                className={cx(dstyles.btn, cstyles.primaryButton, styles.btn)}
                onClick={handleReloadInferenceClient}
              >
                Reload Inference Client
              </button>
            </div>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <div className={styles.iframe}>
      <webview src={`http://localhost:${inferenceClient.staticPort}/`} />
    </div>
  )
}
