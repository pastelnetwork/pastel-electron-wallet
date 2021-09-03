import React, { FormEvent, useState, useEffect } from 'react'

import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { TitleModal } from 'common/components/Modal'
import { Input } from 'common/components/Inputs'
import { Button } from 'common/components/Buttons'
import { isValidPrivateKey } from 'common/utils/wallet'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import congratulations from 'common/assets/icons/ico-congratulations.svg'
import { useWalletScreenContext } from './walletScreen.context'
import { walletRPC } from '../../api/pastel-rpc'

export default function AddPastelPromoCodeModal(): JSX.Element {
  const {
    setAddPastelPromoCodeModalOpen: setIsOpen,
    lastActivityTimes,
    tAddressAmounts,
    zAddressAmounts,
    pastelPromoCode: pastelPromoCodeQuery,
  } = useWalletScreenContext()
  const handleClose = () => setIsOpen(false)

  const currencyName = useCurrencyName()
  const [isValidPromoCode, setValidPromoCode] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [pastelPromoCode, setPastelPromoCode] = useState<string>('')

  useEffect(() => {
    setValidPromoCode(false)
    setMessage('')
    setLoading(false)
  }, [])

  const handleAddPromoCode = async () => {
    setMessage('')
    if (isValidPrivateKey(pastelPromoCode)) {
      setLoading(true)
      const result = await importPastelPromoCode(pastelPromoCode)
      if (result) {
        const addresses = await walletRPC.fetchTandZAddresses()
        const promoCodeBalance = addresses.find(
          address => address.address === result,
        )
        setValidPromoCode(true)
        if (promoCodeBalance) {
          setMessage(
            formatNumber(parseFloat(promoCodeBalance.amount.toString())),
          )
        } else {
          setMessage('0')
        }
        lastActivityTimes.refetch()
        tAddressAmounts.refetch()
        zAddressAmounts.refetch()
        pastelPromoCodeQuery.refetch()
      } else {
        setValidPromoCode(false)
        setMessage('Promo Code is invalid.')
      }
      setLoading(false)
    } else {
      setValidPromoCode(false)
      setMessage('Promo Code is invalid.')
    }
  }

  let promoCodeIsValid = null
  if (!isValidPromoCode && message) {
    promoCodeIsValid = false
  }

  return (
    <TitleModal
      isOpen
      handleClose={() => handleClose()}
      title={isValidPromoCode && message ? '' : 'Add Pastel Promo Code'}
      classNames='w-[598px]'
    >
      <div className='mt-[11px] pr-22px'>
        {isValidPromoCode && message ? (
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
                    ? message || 'Promo Code is invalid.'
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
