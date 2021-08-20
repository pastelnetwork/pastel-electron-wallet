import * as React from 'react'
import cn from 'classnames'
import Radio from 'common/components/Radio/Radio'
import { Fire } from 'common/components/Icons/Fire'
import { PaymentMethods } from './Regiser.state'
import { PrevButton, NextButton } from './Buttons'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TStepPaymentMethodProps = {
  paymentMethod: PaymentMethods
  setPaymentMethod(val: PaymentMethods): void
  exchangeAddress: string
  setExchangeAddress(val: string): void
  goToNextStep(): void
  goBack(): void
}

const StepPaymentMethod = (props: TStepPaymentMethodProps): JSX.Element => {
  const currencyName = useCurrencyName()
  const methods = [
    {
      name: 'Centralized Exchange (Gemini, Binance, etc.)',
      method: PaymentMethods.CentralizedExchange,
    },
    {
      name: 'Decentralized Exchange (Uniwap)',
      method: PaymentMethods.DecentralizedExchange,
    },
    {
      name: `${currencyName} Address Private Key Import`,
      method: PaymentMethods.PslAddress,
    },
    {
      name: 'Airdrop “Promo Code”',
      method: PaymentMethods.AirdropPromoCode,
    },
  ]

  const onChangePayMethod = (method: PaymentMethods, state: boolean) => {
    if (!state) {
      return
    }

    // not sure if this right
    // get & save exchange addres for decentralized & PSL addr private key
    switch (method) {
      case PaymentMethods.DecentralizedExchange:
        props.setExchangeAddress('4jh4kj54lkj5lj4l5j4j54lj5l4j454')
        break

      case PaymentMethods.PslAddress:
        props.setExchangeAddress('lkj3432hghg41hg32hg1h3g2h1g3g21')
        break

      default:
        props.setExchangeAddress('')
    }

    props.setPaymentMethod(method)
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow flex flex-col justify-center'>
        <h1 className='text-gray-4a text-xl font-extrabold flex items-center text-h3'>
          Choose Payment Method
        </h1>
        <h2 className='text-gray-71 text-base font-normal'>
          {currencyName} coins are required to create a Pastel identity (these
          coins are burned <Fire size={18} className='inline-block' />) and to
          register or purchase NFTs on Pastel
        </h2>
        <div className='mt-6'>
          {methods.map((method, i) => (
            <div className='flex items-center mt-4' key={i}>
              <Radio
                checked={props.paymentMethod === method.method}
                onChange={val => onChangePayMethod(method.method, val)}
                variant='secondary'
              >
                <span
                  className={cn(
                    'text-base leading-5',
                    props.paymentMethod === method.method
                      ? 'text-gray-4a font-extrabold'
                      : 'text-gray-4a text-opacity-50 font-medium',
                  )}
                >
                  {method.name}
                </span>
              </Radio>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          onClick={() => props.goToNextStep()}
          text='Proceed to the Payment Method'
        />
      </div>
    </div>
  )
}

export default StepPaymentMethod
