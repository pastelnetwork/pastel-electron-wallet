import { useState } from 'react'
import { sendEventToMain, useRendererEvent } from '../app/rendererEvents'
import { useGetInfoError } from '../app/AppInfoSlice'

export const useLoadingErrorMessage = (): string | undefined => {
  const [error, setError] = useState<string>()
  const getInfoError = useGetInfoError()

  useRendererEvent('appLoadingFailed', ({ error }) => {
    setError(error)
  })

  return error || getInfoError
}

export const useLoadingMessage = (): string => {
  const [message, setMessage] = useState('Loading...')

  useRendererEvent('appLoadingLogProgress', ({ message }) => {
    setMessage(message)
  })

  return message
}

export const retryInitializingApp = (): void => {
  sendEventToMain('retryInitializingApp', null)
}
