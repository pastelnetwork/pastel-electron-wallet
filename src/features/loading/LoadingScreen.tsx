import React from 'react'
import styles from './LoadingScreen.module.css'
import { debugLogPath } from 'common/utils/app'

enum LoadingStep {
  waiting,
  failed,
}

export default function LoadingScreen(): JSX.Element | null {
  const step = LoadingStep.waiting as LoadingStep
  const showRetry = true as boolean

  return (
    <div className='w-full h-full'>
      <div className='relative'>
        <div className='absolute inset-0 z-50'>
          <div className={styles.loader} />
        </div>
      </div>
      <div className='pt-[120px] text-center'>
        {step === LoadingStep.waiting && 'Loading...'}
        {step === LoadingStep.failed && (
          <span>
            Failed to start pasteld. Giving up! Please look at the debug.log
            file.
            <br />
            <span className='text-yellow-ff'>{debugLogPath}</span>
            <br />
            Please file an issue with Pastel Wallet
          </span>
        )}
        {showRetry && (
          <div className='flex-center'>
            <button
              type='button'
              className='block underline mt-5'
              // onClick={retry}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
