import { useState } from 'react'

export enum NSWFStatus {
  initial = 'initial',
  processing = 'processing',
  ready = 'ready',
  failed = 'failed',
}

export type TNSFWState = {
  status: NSWFStatus
  setStatus(status: NSWFStatus): void
  isSafe: boolean
  setIsSafe(isSafe: boolean): void
}

export const useNSFWState = (): TNSFWState => {
  const [status, setStatus] = useState<NSWFStatus>(NSWFStatus.initial)
  const [isSafe, setIsSafe] = useState(false)

  return {
    status,
    setStatus,
    isSafe,
    setIsSafe,
  }
}
