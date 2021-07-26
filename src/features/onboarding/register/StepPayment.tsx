import * as React from 'react'
import cn from 'classnames'
import Radio from 'common/components/Radio/Radio'
import Tooltip from 'common/components/Tooltip'
import { PaymentMethods } from './Regiser.state'
import { PrevButton, NextButton } from './Buttons'
import infoIco from 'common/assets/icons/ico-info.svg'

export type TStepPaymentMethodProps = {
  paymentMethod: PaymentMethods
  setPaymentMethod(val: PaymentMethods): void
  exchangeAddress: string
  setExchangeAddress(val: string): void
  goToNextStep(): void
  goBack(): void
}

const StepPaymentMethod = (props: TStepPaymentMethodProps): JSX.Element => {
  const methods = [
    {
      name: 'Centralized exchange (Coinbase, Binance etc.)',
      method: PaymentMethods.CentralizedExchange,
      tooltipText: 'Tooltip about Centralized exchange',
      tooltipWidth: 150,
    },
    {
      name: 'Decentralized exchange (Uniwap etc.)',
      method: PaymentMethods.DecentralizedExchange,
      tooltipText: 'Tooltip about Decentralized exchange',
      tooltipWidth: 150,
    },
    {
      name: 'PSL Address Private Key Import',
      method: PaymentMethods.PslAddress,
      tooltipText: 'Tooltip about PSL Address Private Key Import',
      tooltipWidth: 150,
    },
    {
      name: 'Airdrop promotion code',
      method: PaymentMethods.AirdropPromoCode,
      tooltipText: 'Tooltip about Airdrop promotion code',
      tooltipWidth: 150,
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
          <Tooltip
            classnames='text-sm'
            wrapperClassNames='ml-2 text-base'
            content={'Payment method tooltip'}
            type='top'
            width={150}
            vPosPercent={120}
          >
            <img src={infoIco} className='w-4 inline-block flex-shrink-0' />
          </Tooltip>
        </h1>
        <h2 className='text-gray-71 text-base font-normal'>
          1,000 PSL fee (worth ~$5.20 at current PSL price)
        </h2>
        <div className='mt-6'>
          {methods.map((method, i) => (
            <div className='flex items-center mt-4' key={i}>
              <Radio
                checked={props.paymentMethod === method.method}
                onChange={val => onChangePayMethod(method.method, val)}
              >
                <span
                  className={cn(
                    props.paymentMethod === method.method
                      ? 'text-gray-4a font-black text-base'
                      : 'text-gray-4a text-opacity-50 text-base font-medium',
                  )}
                >
                  {method.name}
                </span>
              </Radio>
              <div className='ml-4'>
                <Tooltip
                  classnames='text-sm py-1 px-1.5'
                  content={method.tooltipText}
                  type='top'
                  width={method.tooltipWidth}
                  vPosPercent={120}
                >
                  <img
                    src={infoIco}
                    className='w-4 inline-block flex-shrink-0'
                  />
                </Tooltip>
              </div>
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
