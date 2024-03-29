import { spawnProcess } from '../../common/utils/process'
import { pastelUtilityBinPath, pastelConfigFilePath } from './paths'
import { sendEventToRenderer } from './mainEvents'
import log from 'electron-log'
import { app } from 'electron'
import fs from 'fs'

const filterLogKeywords = [
  'Installing',
  'Downloading',
  'Starting',
  'Checking',
  'Waiting',
  'successfully',
  'Finished',
]

const handleProcessLogging = (line: string) => {
  log.info(line)
  if (filterLogKeywords.some(word => line.includes(word))) {
    sendEventToRenderer('appLoadingLogProgress', {
      message: line.split(' INFO ')[1] || line,
    })
  }
}

export const stopWalletNode = async (): Promise<void> => {
  await spawnProcess(pastelUtilityBinPath, ['stop', 'walletnode'], {
    onStdoutLine: handleProcessLogging,
  })
}

const startProcess = async () => {
  const args = ['start', 'walletnode']
  if (!app.isPackaged) {
    args.push('--development-mode')
  }

  await spawnProcess(pastelUtilityBinPath, args, {
    onStdoutLine: handleProcessLogging,
  })
}

const installProcess = async () => {
  await spawnProcess(
    pastelUtilityBinPath,
    ['install', 'walletnode', '-f', '-r', 'latest', 'Y'],
    {
      onStdoutLine: handleProcessLogging,
    },
  )
}

export const startWalletNode = async (): Promise<void> => {
  try {
    await startProcess()
  } catch (error) {
    // stop is needed in case if some services started and some failed
    if (fs.existsSync(pastelConfigFilePath)) {
      await stopWalletNode()
    }
    await installProcess()
    await startProcess()
  }
}
