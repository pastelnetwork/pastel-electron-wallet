import React from 'react'
import styles from './LoadingScreen.module.css'
import { pastelConfigFilePath, debugLogPath } from 'common/utils/app'

enum LoadingStep {
  initial,
  incompletePastelConf,
  failedToCreatePastelConf,
  waitingForWalletNode,
  failedToStart,
}

export default function LoadingScreen(): JSX.Element | null {
  const step = LoadingStep.initial as LoadingStep
  const showRetry = true as boolean

  return (
    <div className='w-full h-full'>
      <div className='relative'>
        <div className='absolute inset-0 z-50'>
          <div className={styles.loader} />
        </div>
      </div>
      <div className='pt-[120px] text-center'>
        {step === LoadingStep.initial && 'Loading...'}
        {step === LoadingStep.incompletePastelConf && (
          <div>
            <p>
              Your pastel.conf is missing a &quot;rpcuser&quot; or
              &quot;rpcpassword&quot;.
            </p>
            <p>
              Please add a &quot;rpcuser=some_username&quot; and
              &quot;rpcpassword=some_password&quot; to your pastel.conf to
              enable RPC access
            </p>
            <p>Your pastel.conf is located at {pastelConfigFilePath}</p>
          </div>
        )}
        {step === LoadingStep.failedToCreatePastelConf && (
          <>
            Could not create pastel.conf at {pastelConfigFilePath}.<br />
            This is a bug, please file an issue with Pastel Wallet
          </>
        )}
        {step === LoadingStep.waitingForWalletNode &&
          'Waiting for pasteld to start...'}
        {step === LoadingStep.failedToStart && (
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
