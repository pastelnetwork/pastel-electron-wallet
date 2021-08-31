import React, { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'

import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import { createNewPastelID } from 'api/pastel-rpc/pastelid'
import { PrevButton, NextButton } from './Buttons'
import { isValidPrivateKey } from 'common/utils/wallet'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { WalletRPC } from 'api/pastel-rpc'
import { PaymentMethods } from './Regiser.state'

type TPromoCodeProps = {
  paymentMethod: PaymentMethods
  pastelPromoCode: string
  setPastelPromoCode(val: string): void
  password: string
  finish(): void
  goBack(): void
}

const targetBalance = 1000

export default function PromoCode(props: TPromoCodeProps): JSX.Element {
  const walletRPC = new WalletRPC()
  const currencyName = useCurrencyName()
  const [isValidPromoCode, setValidPromoCode] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [promoBalance, setPromoBalance] = useState(0)
  const [status, setStatus] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState(0)
  const [selectedAddress, seSelectedAddress] = useState<string>('')

  const handleNextClick = async (type?: string) => {
    if (type === 'next') {
      setStatus('loading')
      try {
        await createNewPastelID(props.password, selectedAddress)
        props.finish()
      } catch (error) {
        toast.error(error.message)
        setStatus('error')
      }
    } else {
      setMessage('')
      setValidPromoCode(false)
      if (isValidPrivateKey(props.pastelPromoCode)) {
        setStatus('loading')
        const result = await importPastelPromoCode(props.pastelPromoCode)
        if (result) {
          const [addresses, totalBalances] = await Promise.all([
            walletRPC.fetchTandZAddresses(),
            walletRPC.fetchTotalBalance(),
          ])
          const promoCodeBalance = addresses.find(
            address => address.address === result,
          )
          if (promoCodeBalance) {
            setPromoBalance(parseFloat(promoCodeBalance.amount.toString()))
          } else {
            setPromoBalance(0)
          }
          setWalletBalance(totalBalances.total)
          setStatus('done')
          setValidPromoCode(true)
          seSelectedAddress(result)
        } else {
          setStatus('error')
          setMessage('Promo Code is invalid.')
        }
      } else {
        setMessage('Promo Code is invalid.')
      }
    }
  }

  const nextActive =
    props.paymentMethod === PaymentMethods.PastelPromoCode &&
    props.pastelPromoCode.length > 0

  let promoCodeIsValid = null
  if (!isValidPromoCode && message) {
    promoCodeIsValid = false
  }

  return (
    <>
      <div className='flex-grow pt-28'>
        <h1 className='text-gray-23 text-xl font-black'>Pastel Promo Code</h1>
        <div className='mt-4 airdrop'>
          <Input
            className='w-full'
            type='text'
            placeholder='Paste your promo code here'
            onChange={(e: FormEvent<HTMLInputElement>) =>
              props.setPastelPromoCode(e.currentTarget.value.trim())
            }
            isValid={promoCodeIsValid}
            errorMessage={
              !promoCodeIsValid && message
                ? message || 'Promo Code is invalid.'
                : null
            }
            hint
            hintAsTooltip={false}
            value={props.pastelPromoCode}
          />
        </div>
        {status === 'done' ? (
          <div className='mt-6 text-gray-71 text-base font-normal'>
            Congratulations, your personalized promotional code has been
            accepted! You now have {formatNumber(promoBalance)} {currencyName}{' '}
            in your wallet.{' '}
            <button
              type='button'
              className='link'
              onClick={() => {
                props.setPastelPromoCode('')
                setStatus('')
                setMessage('')
                setValidPromoCode(false)
              }}
            >
              Add new pastel promo code.
            </button>
          </div>
        ) : null}
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          className='min-w-160px'
          onClick={() =>
            handleNextClick(
              status === 'done' && walletBalance >= targetBalance
                ? 'next'
                : 'apply',
            )
          }
          text={
            props.paymentMethod === PaymentMethods.PastelPromoCode &&
            (walletBalance < targetBalance || !status) &&
            status !== 'done'
              ? props.paymentMethod === PaymentMethods.PastelPromoCode &&
                status === 'loading'
                ? 'Applying'
                : 'Apply'
              : `Proceed to 1,000 ${currencyName} Payment`
          }
          disabled={
            !nextActive ||
            (status === 'done' && walletBalance < targetBalance) ||
            status === 'loading'
          }
        />
      </div>
    </>
  )
}
