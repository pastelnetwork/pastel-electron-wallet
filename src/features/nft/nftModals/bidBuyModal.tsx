import React from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/Buttons'
import { InputNumberFormat } from '../../../common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

export type TBidBuyModal = {
  username?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function BidBuyModal({
  username,
  isOpen,
  handleClose,
}: TBidBuyModal): JSX.Element {
  const currencyName = useCurrencyName()

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>{translate('buyNow')}</h2>
      <p className='mb-6'>
        {translate('youAreBuy')}{' '}
        <span className='font-medium text-blue-3f'>
          Super Nfty Floating Head Professional
        </span>{' '}
        {translate('from')}{' '}
        <span className='font-medium text-blue-3f'>{username}</span>
      </p>
      <div className='mb-6'>
        <InputNumberFormat
          label={translate('enterQuantity')}
          hint={translate('quantityAvailable', { quantity: 3 })}
          type='text'
          placeholder={translate('number')}
          append={<span className='text-gray-a0'>{currencyName}</span>}
        />
      </div>
      <div className='mb-6'>
        <h4 className='text-gray-71 mb-1'>{translate('Price')}</h4>
        <h3>12,000 {currencyName}</h3>
      </div>
      <div className='grid grid-cols-2 gap-1 justify-between mb-6'>
        <span className='text-h6 text-gray-2d'>{translate('yourBalance')}</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          13,500 {currencyName}
        </span>
        <span className='text-h6'>{translate('serviceFee')}</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          ~500 {currencyName}
        </span>
        <span className='text-h6'>{translate('youWillPay')}</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          12,500 {currencyName}
        </span>
      </div>
      <Button variant='default' className='w-full mb-2'>
        {translate('proceedToPayment')}
      </Button>
      <Button variant='secondary' className='w-full'>
        {translate('cancel')}
      </Button>
    </Modal>
  )
}

export default BidBuyModal
