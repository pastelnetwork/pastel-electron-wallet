import React, { FormEvent, useState, useEffect } from 'react'

import PastelPromoCode from 'common/utils/PastelPromoCode'
import { TitleModal } from 'common/components/Modal'
import { Input } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import PastelUtils from 'common/utils/utils'
import { useCurrencyName } from 'common/hooks/appInfo'
import { WalletRPC } from 'api/pastel-rpc'
import { formatNumber } from 'common/utils/format'
import congratulations from 'common/assets/icons/ico-congratulations.svg'

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
  const walletRPC = new WalletRPC()
  const currencyName = useCurrencyName()
  const [isValidPrivateKey, setValidPrivateKey] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
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
      setLoading(true)
      const result = await PastelPromoCode.importPastelPromoCode(
        pastelPromoCode,
      )
      if (result) {
        const addresses = await walletRPC.fetchTandZAddresses()
        const promoCodeBalance = addresses.filter(
          address => address.address === result,
        )
        setValidPrivateKey(true)
        setMessage(
          formatNumber(parseFloat(promoCodeBalance[0]?.amount.toString()) || 0),
        )
        fetchData()
      } else {
        setValidPrivateKey(false)
        setMessage('Promo Code is invalid or already used.')
      }
      setLoading(false)
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
      title={isValidPrivateKey && message ? '' : 'Add Pastel Promo Code'}
      classNames='w-[598px]'
    >
      <div className='mt-[11px] pr-22px'>
        {isValidPrivateKey && message ? (
          <div className='text-center'>
            <div>
              <img
                src={congratulations}
                alt='Congratulations'
                className='w-54px h-54px mx-auto'
              />
            </div>
            <div className='text-gray-800 text-lg font-extrabold mt-26px mb-6'>
              Congratulations!
              <br />
              Your personalized promotional code has been accepted! You now have{' '}
              {message} {currencyName} in your wallet
            </div>
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
                disabled={!pastelPromoCode || isLoading}
                onClick={handleAddPromoCode}
              >
                {isLoading ? 'Applying' : 'Apply'}
              </Button>
            </div>
          </>
        )}
      </div>
    </TitleModal>
  )
}
