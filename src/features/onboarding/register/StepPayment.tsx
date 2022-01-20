import * as React from 'react'
import cn from 'classnames'
import shallow from 'zustand/shallow'

import Radio from 'common/components/Radio/Radio'
import { Fire } from 'common/components/Icons/Fire'
import { PrevButton, NextButton } from './Buttons'
import { useCurrencyName } from 'common/hooks/appInfo'
import { PaymentMethods, useRegisterStore } from './Register.store'
import { translate } from 'features/app/translations'

function PaymentMethodItem({
  method,
  onChangePayMethod,
}: {
  method: {
    name: string
    method: PaymentMethods
  }
  onChangePayMethod: (method: PaymentMethods, val: boolean) => void
}): JSX.Element {
  const store = useRegisterStore(
    state => ({
      paymentMethod: state.paymentMethod,
    }),
    shallow,
  )

  const onClick = React.useCallback((val: boolean) => {
    onChangePayMethod(method.method, val)
  }, [])

  return (
    <div className='flex items-center mt-4'>
      <Radio
        checked={store.paymentMethod === method.method}
        onChange={onClick}
        variant='secondary'
      >
        <span
          className={cn(
            'text-base leading-5',
            store.paymentMethod === method.method
              ? 'text-gray-4a font-extrabold'
              : 'text-gray-4a text-opacity-50 font-medium',
          )}
        >
          {method.name}
        </span>
      </Radio>
    </div>
  )
}

export default function StepPaymentMethod(): JSX.Element {
  const store = useRegisterStore(
    state => ({
      paymentMethod: state.paymentMethod,
      setPaymentMethod: state.setPaymentMethod,
      exchangeAddress: state.exchangeAddress,
      setExchangeAddress: state.setExchangeAddress,
      goBack: state.goBack,
      goToNextStep: state.goToNextStep,
    }),
    shallow,
  )

  const currencyName = useCurrencyName()
  const methods = [
    {
      name: translate('centralizedExchange'),
      method: PaymentMethods.CentralizedExchange,
    },
    {
      name: translate('decentralizedExchange'),
      method: PaymentMethods.DecentralizedExchange,
    },
    {
      name: translate('pslAddressPrivateKeyImport', { currencyName }),
      method: PaymentMethods.PslAddress,
    },
    {
      name: translate('airdropPromoCode'),
      method: PaymentMethods.AirdropPromoCode,
    },
    {
      name: translate('pastelPromoCode'),
      method: PaymentMethods.PastelPromoCode,
    },
  ]

  const onChangePayMethod = React.useCallback(
    (method: PaymentMethods, state: boolean) => {
      if (!state) {
        return
      }

      // not sure if this right
      // get & save exchange addres for decentralized & PSL addr private key
      switch (method) {
        case PaymentMethods.DecentralizedExchange:
          store.setExchangeAddress('4jh4kj54lkj5lj4l5j4j54lj5l4j454')
          break

        case PaymentMethods.PslAddress:
          store.setExchangeAddress('lkj3432hghg41hg32hg1h3g2h1g3g21')
          break

        default:
          store.setExchangeAddress('')
      }

      store.setPaymentMethod(method)
    },
    [store],
  )

  const handleNext = React.useCallback(() => {
    store.goToNextStep()
  }, [])

  const handleBack = React.useCallback(() => {
    store.goBack()
  }, [])

  const renderPaymentIntro = () => {
    return (
      <h2 className='text-gray-71 text-base font-normal'>
        {translate('pslCoinsAreRequiredToCreateAPastelIdentity', {
          currencyName,
        })}
        &nbsp;
        <Fire size={18} className='inline-block' />
        )&nbsp;
        {translate('andToRegisterOrPurchaseNFTsOnPastel')}
      </h2>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow flex flex-col justify-center'>
        <h1 className='text-gray-4a text-xl font-extrabold flex items-center text-h3'>
          {translate('choosePaymentMethod')}
        </h1>
        {renderPaymentIntro()}
        <div className='mt-6'>
          {methods.map(method => (
            <PaymentMethodItem
              key={method.method}
              method={method}
              onChangePayMethod={onChangePayMethod}
            />
          ))}
        </div>
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={handleBack} />
        <NextButton
          onClick={handleNext}
          text={translate('proceedToThePaymentMethod')}
        />
      </div>
    </div>
  )
}
