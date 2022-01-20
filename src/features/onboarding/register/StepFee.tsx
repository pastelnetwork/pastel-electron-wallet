import React, { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { PrevButton } from './Buttons'
import PromoCode from './PromoCode'
import { PaymentMethods, useRegisterStore } from './Register.store'
import { translate } from 'features/app/translations'

export default function StepFee(): JSX.Element {
  const store = useRegisterStore(
    state => ({
      paymentMethod: state.paymentMethod,
      goBack: state.goBack,
    }),
    shallow,
  )

  const handleBack = useCallback(() => {
    store.goBack()
  }, [])

  return (
    <div className='flex flex-col h-full'>
      {store.paymentMethod === PaymentMethods.PastelPromoCode ||
      store.paymentMethod === PaymentMethods.PslAddress ? (
        <PromoCode />
      ) : (
        <>
          <div className='flex-grow pt-28'>
            <h3 className='text-gray-4a text-h3 font-extrabold'>
              {translate('comingSoon')}...
            </h3>
          </div>
          <div className='mt-7 flex justify-between'>
            <PrevButton onClick={handleBack} />
          </div>
        </>
      )}
    </div>
  )
}
