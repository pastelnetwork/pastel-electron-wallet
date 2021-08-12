import React from 'react'
import styles from './LoadingScreen.module.css'
import {
  retryInitializingApp,
  useLoadingErrorMessage,
  useLoadingMessage,
} from './LoadingScreen.service'
import { useAppSelector } from '../../redux/hooks'

export default function LoadingScreen(): JSX.Element | null {
  const error = useLoadingErrorMessage()
  const debugLogPath = useAppSelector(state => state.appInfo.debugLogPath)

  return (
    <div className='w-full h-full'>
      <div className='flex-center'>
        <div className={styles.loader} />
      </div>
      <div className='pt-[120px] text-center'>
        {!error && <LoadingMessage />}
        {error && (
          <>
            <span>
              Failed to start pasteld. Giving up! Please look at the debug.log
              file.
              <br />
              <span className='text-yellow-ff'>{debugLogPath}</span>
              <br />
              Please file an issue with Pastel Wallet
            </span>
            <div className='mt-5'>Error: {error}</div>
            <div className='flex-center'>
              <button
                type='button'
                className='block underline mt-5'
                onClick={retryInitializingApp}
              >
                Retry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const LoadingMessage = () => {
  const message = useLoadingMessage()

  return <span>{message}</span>
}
