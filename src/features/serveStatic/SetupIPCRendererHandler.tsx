import React, { memo } from 'react'
import { ipcRenderer } from 'electron'

const SetupIPCRendererHandler = memo(function SetupIPCRendererHandler() {
  ipcRenderer.send('app-ready')

  return <></>
})

export default SetupIPCRendererHandler
