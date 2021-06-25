import React, { useState, FormEvent } from 'react'
import cn from 'classnames'
import { PaymentMethods, TCentralizedExchangeEntity } from './Regiser.state'
import { PrevButton, NextButton } from './Buttons'
import Radio from 'common/components/Radio/Radio'
import { Input } from 'common/components/Inputs'
import icoClipboard from 'common/assets/icons/ico-clipboard2.svg'
import Link from 'common/components/Link'

export type TStepFeeProps = {
  paymentMethod: PaymentMethods
  centralizedExchangeName: string | null
  setCentralizedExchangeName(val: string | null): void
  promoCode: string
  setPromoCode(val: string): void
  exchangeAddress: string
  setExchangeAddress(val: string): void
  finish(): void
  goBack(): void
}

const StepFee = (props: TStepFeeProps): JSX.Element => {
  const [copiyng, setCopiyng] = useState<boolean>(false)

  // maybe it would be better to load this list from somewhere
  const centralizedExs: TCentralizedExchangeEntity[] = [
    {
      name: 'Gemini.com',
    },
    {
      name: 'Kucoin.com',
    },
    {
      name: 'Bitcoin.com',
    },
  ]

  const onChangePayPlatform = (platformName: string, state: boolean) => {
    if (!state) {
      return
    }
    props.setCentralizedExchangeName(platformName)

    const addr = '3984372472874823794723897498237947' // demo
    props.setExchangeAddress(addr)
  }

  const toClipboard = () => {
    setCopiyng(true) // animate icon
    setTimeout(() => setCopiyng(false), 200)

    navigator.clipboard.writeText(props.exchangeAddress)
  }

  const nextActive =
    (props.paymentMethod === PaymentMethods.AirdropPromoCode &&
      props.promoCode.length > 0) ||
    (props.paymentMethod === PaymentMethods.CentralizedExchange &&
      props.centralizedExchangeName &&
      props.centralizedExchangeName.length > 0) ||
    props.paymentMethod === PaymentMethods.DecentralizedExchange ||
    props.paymentMethod === PaymentMethods.PslAddress

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow flex flex-col justify-center'>
        {props.paymentMethod !== PaymentMethods.AirdropPromoCode && (
          <>
            <h1 className='text-gray-23 text-xl font-black'>
              Choose Exchange to Purchase PSL
            </h1>
            <h2 className='text-gray-77 text-sm font-normal'>Copy address</h2>

            <div className='mt-7'>
              <div className='w-full flex justify-between items-center border border-gray-200 rounded px-4 py-2'>
                <span>{props.exchangeAddress}</span>
                <img
                  src={icoClipboard}
                  className={cn(
                    'w-4 cursor-pointer transition-transform duration-100 ease-in-out',
                    copiyng ? 'transform scale-150' : '',
                  )}
                  onClick={() => toClipboard()}
                />
              </div>
            </div>

            {props.paymentMethod === PaymentMethods.CentralizedExchange && (
              <div className='mt-5'>
                <div className='text-sm text-gray-77 mb-4'>
                  Choose platform and pay
                </div>

                {centralizedExs.map((item, i) => (
                  <Radio
                    key={i}
                    checked={props.centralizedExchangeName === item.name}
                    onChange={val => onChangePayPlatform(item.name, val)}
                  >
                    {item.name}
                  </Radio>
                ))}
              </div>
            )}
          </>
        )}

        {props.paymentMethod === PaymentMethods.AirdropPromoCode && (
          <>
            <h1 className='text-gray-23 text-xl font-black'>
              Airdrop Promo Code
            </h1>
            <h2 className='text-gray-77 text-sm font-normal'>
              To Request a code, please fill in the form{' '}
              <Link to='#' className='text-gray-77 underline'>
                here
              </Link>
            </h2>

            <div className='mt-4'>
              <Input
                className='w-full'
                type='text'
                placeholder='Paste your promo code here'
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  props.setPromoCode(e.currentTarget.value)
                }
              />
            </div>
          </>
        )}
      </div>

      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          className='min-w-160px'
          onClick={() => props.finish()}
          text={
            props.paymentMethod === PaymentMethods.AirdropPromoCode
              ? 'Apply'
              : 'Proceed to 1,000 PSL Payment'
          }
          active={nextActive}
        />
      </div>
    </div>
  )
}

export default StepFee
