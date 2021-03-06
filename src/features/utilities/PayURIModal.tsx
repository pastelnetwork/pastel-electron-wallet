import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  memo,
} from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closePayURIModal } from './index'
import Input from 'common/components/Inputs/Input'
import { Button } from 'common/components/Buttons'
import { parsePastelURI } from 'common/utils/uris'
import * as ROUTES from 'common/utils/constants/routes'
import { translate } from 'features/app/translations'

const InputControl = memo(function InputControl({
  uriIsValid,
  uri,
  setUri,
  message,
}: {
  uriIsValid: boolean | null
  uri: string
  setUri: (val: string) => void
  message: string
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value)
  }, [])

  return (
    <div className='mt-6'>
      <Input
        placeholder={translate('URI')}
        type='text'
        value={uri}
        onChange={onChange}
        isValid={uriIsValid}
        errorMessage={message}
        hint
        hintAsTooltip={false}
      />
    </div>
  )
})

function CancelButton(): JSX.Element {
  const dispatch = useAppDispatch()

  const onClick = useCallback(() => {
    dispatch(closePayURIModal())
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

const PayURIButton = memo(function PayURIButton({
  handlePayURI,
  uri,
}: {
  handlePayURI: (val: string) => void
  uri: string
}): JSX.Element {
  const onClick = useCallback(() => {
    handlePayURI(uri)
  }, [uri])

  return (
    <Button
      onClick={onClick}
      className='w-[120px] ml-[30px] px-0'
      childrenClassName='w-full'
    >
      <div className='flex items-center justify-center'>
        <div className='text-white text-h5-heavy'>{translate('payURI')}</div>
      </div>
    </Button>
  )
})

export default function PayURIModal(): JSX.Element | null {
  const { payURIModalIsOpen } = useAppSelector(state => state.utilities)
  const history = useHistory()

  const [uri, setUri] = useState<string>('')
  const [isValid, setValid] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setUri('')
    setMessage('')
    setValid(false)
  }, [payURIModalIsOpen])

  const handlePayURI = useCallback((strUri: string) => {
    setMessage('')
    if (!strUri) {
      setValid(false)
      setMessage(translate('uriWasNotFoundOrInvalid'))
      return
    }

    const parsedUri = parsePastelURI(strUri)

    if (typeof parsedUri === 'string') {
      setMessage(parsedUri)
      return
    }

    history.replace({
      pathname: ROUTES.WALLET,
      state: { ...parsedUri[0] },
    })
    dispatch(closePayURIModal())
  }, [])

  const onClose = useCallback(() => {
    dispatch(closePayURIModal())
  }, [])

  if (!payURIModalIsOpen) {
    return null
  }

  let uriIsValid: boolean | null = null
  if (!isValid && message) {
    uriIsValid = false
  }

  const renderPayButtons = () => (
    <div className='mt-4 flex justify-end'>
      <CancelButton />
      <PayURIButton handlePayURI={handlePayURI} uri={uri} />
    </div>
  )

  return (
    <TitleModal
      isOpen={payURIModalIsOpen}
      handleClose={onClose}
      classNames='max-w-[700px]'
      title={translate('payURI')}
    >
      <div className='pr-8'>
        <InputControl
          uriIsValid={uriIsValid}
          message={message}
          uri={uri}
          setUri={setUri}
        />
        {renderPayButtons()}
      </div>
    </TitleModal>
  )
}
