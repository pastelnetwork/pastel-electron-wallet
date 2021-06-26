import React, { memo } from 'react'
import { ipcRenderer } from 'electron'

const StartServeStatic = memo(function StartServeStatic() {
  ipcRenderer.send('app-ready')

  return <></>
})

export default StartServeStatic
