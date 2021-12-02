import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  memo,
} from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'

import { walletRPC } from 'api/pastel-rpc'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeImportANIPrivKeyModal } from './index'
import { Button } from 'common/components/Buttons'

import congratulations from 'common/assets/icons/ico-congratulations.svg'

const ImportButton = memo(function ImportButton({
  handleImportANIPrivKey,
  privateKey,
}: {
  handleImportANIPrivKey: (val: string) => void
  privateKey: string
}): JSX.Element {
  const onClick = useCallback(() => {
    handleImportANIPrivKey(privateKey)
  }, [privateKey])

  return (
    <Button
      onClick={onClick}
      className='w-[120px] px-0 ml-[30px]'
      childrenClassName='w-full'
    >
      <div className='flex items-center justify-center'>
        <div className='text-white text-h5-heavy'>Import</div>
      </div>
    </Button>
  )
})

function CancelButton(): JSX.Element {
  const dispatch = useAppDispatch()

  const onClick = useCallback(() => {
    dispatch(closeImportANIPrivKeyModal())
  }, [])

  return (
    <Button
      variant='secondary'
      className='w-[120px] px-0'
      childrenClassName='w-full'
      onClick={onClick}
    >
      <div className='flex items-center justify-center'>
        <div className='text-blue-3f text-h5-medium'>Cancel</div>
      </div>
    </Button>
  )
}

const InputControl = memo(function InputControl({
  message,
  privateKey,
  setPrivateKey,
}: {
  message: string
  privateKey: string
  setPrivateKey: (val: string) => void
}) {
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrivateKey(e.target.value)
  }, [])

  return (
    <textarea
      placeholder='ANI Private Keys'
      className={cn(
        'w-full rounded shadow-2px py-2 px-4 outline-none h-10 resize-none text-base text-gray-4a font-normal leading-6 transition duration-300 focus:border focus:border-blue-3f active:border-blue-3f min-h-[120px]',
        message && 'border border-red-fe',
      )}
      value={privateKey}
      onChange={onChange}
    />
  )
})

export default function ImportANIPrivKeyModal(): JSX.Element | null {
  const { importANIPrivKeyModalIsOpen } = useAppSelector(
    state => state.utilities,
  )
  const dispatch = useAppDispatch()
  const [isComplete, setComplete] = useState<boolean>(false)
  const [privateKey, setPrivateKey] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    setMessage('')
    setPrivateKey('')
    setComplete(false)
  }, [importANIPrivKeyModalIsOpen])

  if (!importANIPrivKeyModalIsOpen) {
    return null
  }

  const handleImportANIPrivKey = async (key: string) => {
    setMessage('')
    setComplete(false)

    if (!key) {
      setMessage('ANI Private Keys is required.')
      return
    }

    let keys = key.replace(/\n/g, ' ').split(' ')
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
      isOpen={importANIPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeImportANIPrivKeyModal())}
      classNames='max-w-[700px]'
      title={!isComplete ? 'Import ANI (Animecoin) Private Keys' : ''}
    >
      <div className='pr-8'>
        {isComplete ? (
          <>{renderSuccessContent()}</>
        ) : (
          <>
            <div className='mt-6'>
              Please paste your ANI private keys here, one line per key. <br />{' '}
              (NOTE: Don&apos;t use this unless you participated in the original
              fork of Animecoin!)
            </div>
            <div className='mt-3'>
              <InputControl
                message={message}
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
              />
              {message ? (
                <p className='text-red-fe text-xs leading-5 pt-1'>{message}</p>
              ) : null}
            </div>
            <div className='mt-4 flex justify-center'>
              <CancelButton />
              <ImportButton
                handleImportANIPrivKey={handleImportANIPrivKey}
                privateKey={privateKey}
              />
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
