import React, { FormEvent, useState, useEffect } from 'react'

import PastelPromoCode from 'common/utils/PastelPromoCode'
import { TitleModal } from 'common/components/Modal'
import { Input } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import PastelUtils from 'common/utils/utils'

type TAddPastelPromoCodeModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function AddPastelPromoCodeModal({
  isOpen,
  handleClose,
}: TAddPastelPromoCodeModalProps): JSX.Element {
  const [isValidPrivateKey, setValidPrivateKey] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [pastelPromoCode, setPastelPromoCode] = useState<string>('')

  useEffect(() => {
    if (isOpen) {
      setValidPrivateKey(false)
      setMessage('')
    }
  }, [isOpen])

  const handleAddPromoCode = async () => {
    setMessage('')
    if (PastelUtils.isValidPrivateKey(pastelPromoCode)) {
      const result = await PastelPromoCode.importPastelPromoCode(
        pastelPromoCode,
      )
      setValidPrivateKey(true)
      if (result) {
        setMessage(
          'Congratulations, your personalized promotional code has been accepted! You now have 2,500 PSL in your wallet',
        )
      } else {
        setMessage('Error saving. Please try again')
      }
    } else {
      setValidPrivateKey(false)
      setMessage('PrivateKey is invalid')
    }
  }

  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      title='Add Pastel Promo Code'
      classNames='w-[598px]'
    >
      <div className='mt-[11px] pr-22px'>
        {isValidPrivateKey && message ? (
          <div className='mt-6 mb-6 text-gray-71 text-base font-normal'>
            {message}
          </div>
        ) : (
          <>
            <div className='mt-4'>
              <Input
                className='w-full'
                type='text'
                placeholder='Paste your promo code here'
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setPastelPromoCode(e.currentTarget.value.trim())
                }
              />
              {!isValidPrivateKey && message ? (
                <p className='text-red-fe text-xs leading-5 pt-1'>{message}</p>
              ) : null}
            </div>
            <div className='mt-6'>
              <Button
                className='w-full flex items-center'
                disabled={!pastelPromoCode}
                onClick={handleAddPromoCode}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
