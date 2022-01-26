import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  memo,
} from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'
import parse from 'html-react-parser'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeImportPrivKeyModal } from './index'
import { Button } from 'common/components/Buttons'
import { walletRPC } from 'api/pastel-rpc'
import { isValidSaplingPrivateKey } from 'common/utils/wallet'
import { translate } from 'features/app/translations'

import congratulations from 'common/assets/icons/ico-congratulations.svg'

function CancelButton(): JSX.Element {
  const dispatch = useAppDispatch()

  const onClick = useCallback(() => {
    dispatch(closeImportPrivKeyModal())
  }, [])

  return (
    <Button
      variant='secondary'
      className='w-[120px] px-0'
      childrenClassName='w-full'
      onClick={onClick}
    >
      <div className='flex items-center justify-center'>
        <div className='text-blue-3f text-h5-medium'>{translate('cancel')}</div>
      </div>
    </Button>
  )
}

const ImportButton = memo(function ImportButton({
  handleImportPrivateKey,
  privateKey,
}: {
  handleImportPrivateKey: (val: string) => void
  privateKey: string
}): JSX.Element {
  const onClick = useCallback(() => {
    handleImportPrivateKey(privateKey)
  }, [privateKey])

  return (
    <Button
      onClick={onClick}
      className='w-[120px] px-0 ml-[30px]'
      childrenClassName='w-full'
    >
      <div className='flex items-center justify-center'>
        <div className='text-white text-h5-heavy'>{translate('import')}</div>
      </div>
    </Button>
  )
})

const InputControl = memo(function InputControl({
  message,
  privateKey,
  setPrivateKey,
}: {
  message: string
  privateKey: string
  setPrivateKey: (val: string) => void
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrivateKey(e.target.value)
  }, [])

  return (
    <textarea
      placeholder={translate('privateKeys')}
      className={cn(
        'w-full rounded shadow-2px py-2 px-4 outline-none h-10 resize-none text-base text-gray-4a font-normal leading-6 transition duration-300 focus:border focus:border-blue-3f active:border-blue-3f min-h-[120px]',
        message && 'border border-red-fe',
      )}
      value={privateKey}
      onChange={onChange}
    />
  )
})

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

  const handleCloseModal = useCallback(() => {
    dispatch(closeImportPrivKeyModal())
  }, [])

  const handleImportPrivateKey = useCallback(async (key: string) => {
    setMessage('')
    setComplete(false)
    if (!key) {
      setMessage(translate('privateKeysIsRequired'))
      return
    }
    let keys = key.replace(/\n/g, ' ').split(' ')
    if (!keys || keys.length === 0) {
      setMessage(translate('noKeysWereSpecified'))
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
  }, [])

  if (!importPrivKeyModalIsOpen) {
    return null
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
          {parse(translate('importPrivateKeySuccessMessage'))}
        </div>
      </div>
    )
  }

  return (
    <TitleModal
      isOpen={importPrivKeyModalIsOpen}
      handleClose={handleCloseModal}
      classNames='max-w-[700px]'
      title={!isComplete ? translate('importPrivateKeys') : ''}
    >
      <div className='pr-8'>
        {isComplete ? (
          <>{renderSuccessContent()}</>
        ) : (
          <>
            <div className='mt-6'>{translate('importPrivateKeysIntro')}</div>
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
            <div className='mt-4 flex justify-end'>
              <CancelButton />
              <ImportButton
                handleImportPrivateKey={handleImportPrivateKey}
                privateKey={privateKey}
              />
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
