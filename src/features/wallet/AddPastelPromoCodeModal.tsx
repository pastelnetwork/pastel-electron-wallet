import React, { FormEvent, useState, useEffect } from 'react'

import PastelPromoCode from 'common/utils/PastelPromoCode'
import { TitleModal } from 'common/components/Modal'
import { Input } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import PastelUtils from 'common/utils/utils'
import { useCurrencyName } from 'common/hooks/appInfo'

type TAddPastelPromoCodeModalProps = {
  isOpen: boolean
  handleClose: () => void
  fetchData: () => void
}

export default function AddPastelPromoCodeModal({
  isOpen,
  handleClose,
  fetchData,
}: TAddPastelPromoCodeModalProps): JSX.Element {
  const currencyName = useCurrencyName()
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
      if (result) {
        setValidPrivateKey(true)
        setMessage(
          `Congratulations, your personalized promotional code has been accepted! You now have 2,500 ${currencyName} in your wallet`,
        )
        fetchData()
      } else {
        setValidPrivateKey(false)
        setMessage('Promo Code is invalid or already used.')
      }
    } else {
      setValidPrivateKey(false)
      setMessage('Promo Code is invalid')
    }
  }

  let promoCodeIsValid = null
  if (!isValidPrivateKey && message) {
    promoCodeIsValid = false
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
                isValid={promoCodeIsValid}
                errorMessage={
                  !promoCodeIsValid && message
                    ? message || 'Promo Code is invalid'
                    : null
                }
                hint
                hintAsTooltip={false}
              />
            </div>
            <div className='mt-6'>
              <Button
                className='w-full flex items-center'
                disabled={!pastelPromoCode}
                onClick={handleAddPromoCode}
              >
                Apply
              </Button>
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
