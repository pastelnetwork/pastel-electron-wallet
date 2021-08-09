import { spawnProcess } from '../../common/utils/process'
import { getBinPath } from '../../common/utils/app'
import { sendEventToRenderer } from './events'
import log from 'electron-log'

const binPath = getBinPath({
  linux: 'pastel-utility-linux-amd64',
  darwin: 'pastel-utility-darwin-amd64',
  windows: 'pastel-utility-windows-amd64',
})

export const startWalletNode = async (): Promise<void> => {
  try {
    await startProcess()
  } catch (error) {
    await installProcess()
    await startProcess()
  }
}

export const stopWalletNode = async (): Promise<void> => {
  await spawnProcess(binPath, ['stop', 'walletnode'], {
    onStdoutLine: handleProcessLogging,
  })
}

const startProcess = async () => {
  await spawnProcess(binPath, ['start', 'walletnode', '--cf'], {
    onStdoutLine: handleProcessLogging,
  })
}

const installProcess = async () => {
  await spawnProcess(binPath, ['install', 'walletnode', '--force'], {
    onStdoutLine: handleProcessLogging,
  })
}

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
