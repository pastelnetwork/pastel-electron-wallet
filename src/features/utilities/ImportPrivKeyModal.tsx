import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeImportPrivKeyModal } from './index'
import { Button } from 'common/components/Buttons'
import { walletRPC } from 'api/pastel-rpc'
import { isValidSaplingPrivateKey } from 'common/utils/wallet'
import congratulations from 'common/assets/icons/ico-congratulations.svg'

export default function ImportPrivKeyModal(): JSX.Element | null {
  const { importPrivKeyModalIsOpen } = useAppSelector(state => state.utilities)
  const dispatch = useAppDispatch()

  const [isComplete, setComplete] = useState<boolean>(false)
  const [privateKey, setPrivateKey] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    setMessage('')
    setPrivateKey('')
    setComplete(false)
  }, [importPrivKeyModalIsOpen])

  if (!importPrivKeyModalIsOpen) {
    return null
  }

  const handleImportPrivateKey = async () => {
    setMessage('')
    setComplete(false)
    if (!privateKey) {
      setMessage('Private Keys is required.')
      return
    }
    let keys = privateKey.replace(/\n/g, ' ').split(' ')
    if (!keys || keys.length === 0) {
      setMessage('No keys were specified, so none were imported')
      return
    }

    keys = keys.filter(
      (k: string) => !(k.trim().startsWith('#') || k.trim().length === 0),
    )

    if (isValidSaplingPrivateKey(keys.join(''))) {
      keys = [keys.join('')]
    }

    for (let i = 0; i < keys.length; i++) {
      try {
        await walletRPC.importPrivKey(keys[i].trim(), i === keys.length - 1)
        if (i === keys.length - 1) {
          setComplete(true)
        }
      } catch (error) {
        toast(error.message, { type: 'error' })
      }
    }
  }

  const renderImportButton = () => {
    return (
      <Button
        onClick={handleImportPrivateKey}
        className='w-[120px] px-0 ml-[30px]'
        childrenClassName='w-full'
      >
        <div className='flex items-center justify-center'>
          <div className='text-white text-h5-heavy'>Import</div>
        </div>
      </Button>
    )
  }

  const renderCancelButton = () => {
    return (
      <Button
        variant='secondary'
        className='w-[120px] px-0'
        childrenClassName='w-full'
        onClick={() => dispatch(closeImportPrivKeyModal())}
      >
        <div className='flex items-center justify-center'>
          <div className='text-blue-3f text-h5-medium'>Cancel</div>
        </div>
      </Button>
    )
  }

  const renderSuccessContent = () => {
    return (
      <div className='mt-6 text-center'>
        <div>
          <img
            src={congratulations}
            alt='Congratulations'
            className='w-54px h-54px mx-auto'
          />
        </div>
        <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
          The import process for the private keys has started.
          <br />
          This will take a long time, up to 1 hour!
          <br />
          Please be patient!
        </div>
      </div>
    )
  }

  return (
    <TitleModal
      isOpen={importPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeImportPrivKeyModal())}
      classNames='max-w-[700px]'
      title={!isComplete ? 'Import Private Keys' : ''}
    >
      <div className='pr-8'>
        {isComplete ? (
          <>{renderSuccessContent()}</>
        ) : (
          <>
            <div className='mt-6'>
              Please paste your private or viewing keys here (transparent
              address or shielded address), one line per key.
            </div>
            <div className='mt-3'>
              <textarea
                placeholder='Private Keys'
                className={cn(
                  'w-full rounded shadow-2px py-2 px-4 outline-none h-10 resize-none text-base text-gray-4a font-normal leading-6 transition duration-300 focus:border focus:border-blue-3f active:border-blue-3f min-h-[120px]',
                  message && 'border border-red-fe',
                )}
                value={privateKey}
                onChange={e => setPrivateKey(e.target.value)}
              />
              {message ? (
                <p className='text-red-fe text-xs leading-5 pt-1'>{message}</p>
              ) : null}
            </div>
            <div className='mt-4 flex justify-end'>
              {renderCancelButton()}
              {renderImportButton()}
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
