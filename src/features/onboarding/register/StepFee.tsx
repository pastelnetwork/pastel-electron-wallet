import React, { useState, FormEvent } from 'react'
import cn from 'classnames'
import { PaymentMethods, TCentralizedExchangeEntity } from './Regiser.state'
import { PrevButton, NextButton } from './Buttons'
import Radio from 'common/components/Radio/Radio'
import { Input } from 'common/components/Inputs'
import icoClipboard from 'common/assets/icons/ico-clipboard2.svg'
import Link from 'common/components/Link'
import styles from './Register.module.css'

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
  const [copying, setCopying] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

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

    const addr = '' + BigInt(Math.random() * 1e60) // demo
    props.setExchangeAddress(addr)
    setCopied(false)
  }

  const toClipboard = () => {
    setCopying(true) // animate icon
    setTimeout(() => setCopying(false), 200)

    navigator.clipboard.writeText(props.exchangeAddress)
    setCopied(true)
  }

  const showWarn =
    !copied &&
    ((props.paymentMethod === PaymentMethods.CentralizedExchange &&
      props.centralizedExchangeName) ||
      props.paymentMethod === PaymentMethods.DecentralizedExchange ||
      props.paymentMethod === PaymentMethods.PslAddress)

  const nextActive =
    (props.paymentMethod === PaymentMethods.AirdropPromoCode &&
      props.promoCode.length > 0) ||
    (props.paymentMethod === PaymentMethods.CentralizedExchange &&
      props.centralizedExchangeName &&
      props.centralizedExchangeName.length > 0 &&
      copied) ||
    (props.paymentMethod === PaymentMethods.DecentralizedExchange && copied) ||
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
              <div
                className={cn(
                  'w-full flex justify-between items-center border rounded px-4 py-2',
                  showWarn ? 'border-orange-63' : 'border-gray-200',
                )}
              >
                <div className='mr-3 overflow-hidden overflow-ellipsis h-5'>
                  {props.exchangeAddress}
                </div>
                <img
                  src={icoClipboard}
                  className={cn(
                    'w-4 cursor-pointer transition-transform duration-100 ease-in-out',
                    copying ? 'transform scale-150' : '',
                  )}
                  onClick={() => toClipboard()}
                />
              </div>
              <div className='text-sm font-medium text-orange-63 h-4'>
                {showWarn ? 'copy your address first' : ''}
              </div>
            </div>

            {props.paymentMethod === PaymentMethods.CentralizedExchange && (
              <div className='mt-3'>
                <div className='text-sm text-gray-77'>
                  Choose platform and pay
                </div>

                {centralizedExs.map((item, i) => (
                  <div className='mt-18px' key={i}>
                    <Radio
                      key={i}
                      checked={props.centralizedExchangeName === item.name}
                      onChange={val => onChangePayPlatform(item.name, val)}
                    >
                      <span
                        className={cn(
                          props.centralizedExchangeName === item.name
                            ? 'text-gray-700'
                            : 'text-gray-a0',
                        )}
                      >
                        {item.name}
                      </span>
                    </Radio>
                  </div>
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

            <div className={cn('mt-4 airdrop', styles.airdrop)}>
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
          disabled={!nextActive}
        />
      </div>
    </div>
  )
}

export default StepFee
