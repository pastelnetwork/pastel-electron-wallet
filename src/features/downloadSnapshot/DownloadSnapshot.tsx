import React from 'react'
import { ipcRenderer } from 'electron'
import fs from 'fs'

import { useAppSelector } from '../../redux/hooks'

export default function DownloadSnapshot(): JSX.Element | null {
  const { opened } = useAppSelector(state => state.downloadSnapshot)
  const { pastelReinstallPath } = useAppSelector(state => state.appInfo)

  React.useEffect(() => {
    if (opened) {
      handleReinstallWalletNode();
    }
  }, [opened])

  const handleReinstallWalletNode = async () => {
    await fs.promises.writeFile(pastelReinstallPath, JSON.stringify({ reinstall: true }))
    ipcRenderer.send('reset_pastel_app')
  }

  return null
}
