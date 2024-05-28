import React from 'react'
import { ipcRenderer } from 'electron'
import tcpPortUsed from 'tcp-port-used'
import Modal from 'react-modal'

import { rpc } from '../../api/pastel-rpc/rpc'
import store from '../../redux/store'
import { inferenceClient } from '../constants/ServeStatic'

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

  const checkStartInitialInference = () => {
    tcpPortUsed.check(inferenceClient.staticPort, '127.0.0.1').then(
      function (inUse) {
        if (!inUse) {
          setStatus('Waiting')
          setTimeout(() => {
            checkStartInitialInference()
          }, 5000)
        } else {
          setStatus('success')
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
      setStatus(result?.AssetName || '')
      if (result?.AssetName !== 'Finished') {
        setTimeout(() => {
          checkMasterNodeStatus()
        }, 1000)
      } else {
        ipcRenderer.send('start_initial_inference')
        checkStartInitialInference()
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
        setStatus('Waiting')
        setInstallRequired(parseData.name)
        setInstallUrl(parseData.link)
      }
    })
  }, [])

  if (status !== 'success') {
    return (
      <div className={styles.textWrap}>
        <div className={styles.textWrap}>{status} ...</div>
        <Modal
          isOpen={installRequired !== ''}
          onRequestClose={() => setInstallRequired('')}
          className={styles.modalWrapper}
        >
          <div className={styles.modalContent}>
            <button
              type='button'
              className={styles.btnClose}
              onClick={() => setInstallRequired('')}
            >
              X
            </button>
            <div className={styles.modalMainContent}>
              Please download and install {installRequired} on your system.
              <br />
              Visit: {installUrl}
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className={styles.iframe}>
      <webview src={`http://localhost:${inferenceClient.staticPort}/`} />
    </div>
  )
}
