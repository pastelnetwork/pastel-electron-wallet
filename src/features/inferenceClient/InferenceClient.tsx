import React from 'react'
import { ipcRenderer } from 'electron'

import { rpc } from '../../api/pastel-rpc/rpc'
import store from '../../redux/store'

import styles from './inferenceClient.module.css'

interface IMasterNodeProps {
  result: {
    AssetName: string
  }
}

export default function InferenceClient(): JSX.Element {
  const [status, setStatus] = React.useState('')
  const [port, setPort] = React.useState(0)
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
      }
    } catch (error) {
      console.error('checkMasterNodeStatus', error)
    }
  }

  ipcRenderer.on('start_inference_client_status', (event, data) => {
    setStatus(data.status)
    setPort(data.port)
  })

  React.useEffect(() => {
    checkMasterNodeStatus()
  }, [])

  if (status !== 'success') {
    return <div className={styles.textWrap}>Loading {status} ...</div>
  }

  return (
    <div className={styles.iframe}>
      <webview src={`http://localhost:${port}/`} />
    </div>
  )
}
