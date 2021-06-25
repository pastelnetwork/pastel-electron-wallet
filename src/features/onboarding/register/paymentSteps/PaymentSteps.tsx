import * as React from 'react'
import Radio from 'common/components/Radio/Radio'
// import Tooltip from 'common/components/Tooltip'
import { PaymentMethods } from '../Regiser.state'
import { PrevButton, NextButton } from '../Buttons'
import infoIco from 'common/assets/icons/ico-info.svg'

export type TStepPaymentMethodProps = {
  paymentMethod: PaymentMethods
  setPaymentMethod(val: PaymentMethods): void
  goToNextStep(): void
  goBack(): void
}

const StepPaymentMethod = (props: TStepPaymentMethodProps): JSX.Element => {
  const methods = [
    {
      name: 'Centralized exchange (Coinbase, Binance etc.)',
      method: PaymentMethods.CentralizedExchange,
    },
    {
      name: 'Decentralized exchange (Uniwap etc.)',
      method: PaymentMethods.DecentralizedExchange,
    },
    {
      name: 'PSL Address Private Key Import',
      method: PaymentMethods.PslAddress,
    },
    {
      name: 'Airdrop promotion code',
      method: PaymentMethods.AirdropPromoCode,
    },
  ]

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow flex flex-col justify-center'>
        <h1 className='text-gray-23 text-xl font-black'>
          Choose payment method
        </h1>
        <h2 className='text-gray-77 text-sm font-normal'>
          1,000 PSL fee (worth ~$5.20 at current PSL price)
        </h2>
        <div className='mt-7'>
          {methods.map((m, i) => (
            <div className='flex items-center'>
              <Radio
                key={i}
                checked={props.paymentMethod === m.method}
                onChange={() => props.setPaymentMethod(m.method)}
              >
                {m.name}
              </Radio>
              <img
                src={infoIco}
                className='w-4 ml-4 inline-block flex-shrink-0'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          onClick={() => props.goToNextStep()}
          text='Proceed to the Payment Method'
          active={true}
        />
      </div>
    </div>
  )
}

export default StepPaymentMethod
