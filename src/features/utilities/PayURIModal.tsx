import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closePayURIModal } from './index'
import Input from 'common/components/Inputs/Input'
import { Button } from 'common/components/Buttons'
import { parsePastelURI } from 'common/utils/uris'
import * as ROUTES from 'common/utils/constants/routes'

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

  if (!payURIModalIsOpen) {
    return null
  }

  const handlePayURI = () => {
    setMessage('')
    if (!uri) {
      setValid(false)
      setMessage('URI was not found or invalid')
      return
    }

    const parsedUri = parsePastelURI(uri)

    if (typeof parsedUri === 'string') {
      setMessage(parsedUri)
      return
    }

    history.replace({
      pathname: ROUTES.WALLET,
      state: { ...parsedUri[0] },
    })
    dispatch(closePayURIModal())
  }

  let uriIsValid = null
  if (!isValid && message) {
    uriIsValid = false
  }

  return (
    <TitleModal
      isOpen={payURIModalIsOpen}
      handleClose={() => dispatch(closePayURIModal())}
      classNames='max-w-[700px]'
      title='Pay URI'
    >
      <div className='pr-8'>
        <div className='mt-6'>
          <Input
            placeholder='URI'
            type='text'
            value={uri}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUri(e.target.value)
            }
            isValid={uriIsValid}
            errorMessage={message}
            hint
            hintAsTooltip={false}
          />
        </div>
        <div className='mt-4 flex justify-end'>
          <Button
            variant='secondary'
            className='w-[120px] px-0'
            childrenClassName='w-full'
            onClick={() => dispatch(closePayURIModal())}
          >
            <div className='flex items-center justify-center'>
              <div className='text-blue-3f text-h5-medium'>Cancel</div>
            </div>
          </Button>
          <Button
            onClick={handlePayURI}
            className='w-[120px] ml-[30px] px-0'
            childrenClassName='w-full'
          >
            <div className='flex items-center justify-center'>
              <div className='text-white text-h5-heavy'>Pay URI</div>
            </div>
          </Button>
        </div>
      </div>
    </TitleModal>
  )
}
