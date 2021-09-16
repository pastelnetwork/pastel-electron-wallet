import React, { useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'

import { walletRPC } from 'api/pastel-rpc'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeImportANIPrivKeyModal } from './index'
import { Button } from 'common/components/Buttons'

import congratulations from 'common/assets/icons/ico-congratulations.svg'

export default function ImportANIPrivKeyModal(): JSX.Element | null {
  const { importANIPrivKeyModalIsOpen } = useAppSelector(
    state => state.utilities,
  )
  const dispatch = useAppDispatch()
  const [isComplete, setComplete] = useState<boolean>(false)
  const [privateKey, setPrivateKey] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  if (!importANIPrivKeyModalIsOpen) {
    return null
  }

  const handleImportANIPrivKey = async () => {
    setMessage('')
    setComplete(false)

    if (!privateKey) {
      setMessage('ANI Private Keys is required.')
      return
    }

    let keys = privateKey.split(new RegExp('[\\n\\r]+'))
    if (!keys || keys.length === 0) {
      setMessage('No ANI keys were specified, so none were imported')
      return
    }

    keys = keys.filter(
      (k: string) => !(k.trim().startsWith('#') || k.trim().length === 0),
    )

    for (let i = 0; i < keys.length; i++) {
      try {
        await walletRPC.doImportANIPrivKey(keys[i])
        if (i === keys.length - 1) {
          setComplete(true)
        }
      } catch (error) {
        toast(error.message, { type: 'error' })
      }
    }
  }

  return (
    <TitleModal
      isOpen={importANIPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeImportANIPrivKeyModal())}
      classNames='max-w-[700px]'
      title='Import ANI (Animecoin) Private Keys'
    >
      {isComplete ? (
        <>
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
        </>
      ) : (
        <>
          <div className='mt-6'>
            Please paste your ANI private keys here, one line per key. <br />{' '}
            (NOTE: Don&apos;t use this unless you participated in the original
            fork of Animecoin!)
          </div>
          <div className='mt-3'>
            <textarea
              placeholder='ANI Private Keys'
              className={cn(
                'w-full rounded shadow-2px py-2 px-4 outline-none h-10 resize-none text-base text-gray-4a font-normal leading-6',
                message && 'border border-red-fe',
              )}
              value={privateKey}
              onChange={e => setPrivateKey(e.target.value)}
            />
            {message ? (
              <p className='text-red-fe text-xs leading-5 pt-1'>{message}</p>
            ) : null}
          </div>
          <div className='mt-4 flex justify-center'>
            <Button
              onClick={handleImportANIPrivKey}
              className='w-[120px] px-0'
              childrenClassName='w-full'
            >
              <div className='flex items-center justify-center'>
                <div className='text-white text-h5-heavy'>Import</div>
              </div>
            </Button>
            <Button
              variant='secondary'
              className='w-[120px] ml-3 px-0'
              childrenClassName='w-full'
              onClick={() => dispatch(closeImportANIPrivKeyModal())}
            >
              <div className='flex items-center justify-center'>
                <div className='text-blue-3f text-h5-medium'>Cancel</div>
              </div>
            </Button>
          </div>
        </>
      )}
    </TitleModal>
  )
}
