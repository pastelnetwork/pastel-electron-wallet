import React from 'react'
import { ipcRenderer, shell } from 'electron'
import tcpPortUsed from 'tcp-port-used'
import cx from 'classnames'

import { rpc } from '../../api/pastel-rpc/rpc'
import store from '../../redux/store'
import { inferenceClient } from '../constants/ServeStatic'
import cstyles from '../../common/utils/Styles.module.css'
import dstyles from '../downloadSnapshot/DownloadSnapshot.module.css'

import styles from './inferenceClient.module.css'

interface IMasterNodeProps {
  result: {
    AssetName: string
  }
}

export default function InferenceClient(): JSX.Element {
  const [status, setStatus] = React.useState('')
  const [installRequired, setInstallRequired] = React.useState('')
  const [installUrl, setInstallUrl] = React.useState('')
  const [isError, setError] = React.useState(false)

  const checkStartInitialInference = () => {
    tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
      function (inUse) {
        if (!inUse) {
          setTimeout(() => {
            checkStartInitialInference()
          }, 5000)
        } else {
          setStatus('success')
          setInstallRequired('')
          setInstallUrl('')
          setError(false)
        }
      },
      function (err) {
        console.error('Error on check:', err.message)
      },
    )
  }
  const checkMasterNodeStatus = async () => {
    try {
      const { pastelConf } = store.getState()
      const { result } = await rpc<IMasterNodeProps>(
        'mnsync',
        ['status'],
        pastelConf,
      )
      setStatus(`Master Node ${result?.AssetName || ''}`)
      if (result?.AssetName !== 'Finished') {
        setTimeout(() => {
          checkMasterNodeStatus()
        }, 3000)
      } else {
        ipcRenderer.send('start_initial_inference')
        checkStartInitialInference()
        setStatus('Loading Pastel Inference Client')
      }
    } catch (error) {
      console.error('checkMasterNodeStatus', error)
    }
  }

  React.useEffect(() => {
    checkMasterNodeStatus()

    ipcRenderer.on('install_required', (event, data) => {
      if (data) {
        const parseData = JSON.parse(data)
        setInstallRequired(parseData.name)
        setInstallUrl(parseData.link)
      }
    })

    ipcRenderer.on('start_inference_error', (event, data) => {
      if (data) {
        setStatus(JSON.parse(data))
        setError(true)
      }
    })
  }, [])

  const handleOpenLink = (url: string) => {
    if (url) {
      shell.openExternal(url)
    }
  }

  const handleReloadInferenceClient = () => {
    setError(false)
    ipcRenderer.send('reload_inference_client')
  }

  if (status !== 'success') {
    return (
      <div className={styles.wrapper}>
        <div className={cx(styles.textWrap, styles.textWrapPadding)}>
          {status} ...
        </div>

        {installRequired !== '' ? (
          <div
            id='downloadNode'
            className={cx(dstyles.wrapper, styles.downloadModal)}
          >
            <p className={cx(dstyles.content, cstyles.large)}>
              To run Inference Client, you'll need Node.js version 22.2.0
              installed on your system. We recommend clicking{' '}
              <span
                onClick={() => handleOpenLink(installUrl)}
                className={styles.link}
              >
                {installUrl}
              </span>{' '}
              to download and install the Node.js version 22.2.0.
            </p>
          </div>
        ) : null}

        {isError ? (
          <div className={styles.reloadInferenceClientWrapper}>
            <button
              type='button'
              className={cx(dstyles.btn, cstyles.primaryButton, styles.btn)}
              onClick={handleReloadInferenceClient}
            >
              Reload Inference Client
            </button>
          </div>
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
