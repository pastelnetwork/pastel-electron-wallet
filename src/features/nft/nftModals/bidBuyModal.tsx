import React from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/Buttons'
import { InputNumberFormat } from '../../../common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TBidBuyModal = {
  username?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const BidBuyModal = ({
  username,
  isOpen,
  handleClose,
}: TBidBuyModal): JSX.Element => {
  const currencyName = useCurrencyName()

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>Buy now</h2>
      <p className='mb-6'>
        You are buy{' '}
        <span className='font-medium text-blue-3f'>
          Super Nfty Floating Head Professional
        </span>{' '}
        from <span className='font-medium text-blue-3f'>{username}</span>
      </p>
      <div className='mb-6'>
        <InputNumberFormat
          label='Enter quantity'
          hint='3 available'
          type='text'
          placeholder='Number'
          append={<span className='text-gray-a0'>{currencyName}</span>}
        />
      </div>
      <div className='mb-6'>
        <h4 className='text-gray-71 mb-1'>Price</h4>
        <h3>12,000 {currencyName}</h3>
      </div>
      <div className='grid grid-cols-2 gap-1 justify-between mb-6'>
        <span className='text-h6 text-gray-2d'>Your balance</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          13,500 {currencyName}
        </span>
        <span className='text-h6'>Service fee</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          ~500 {currencyName}
        </span>
        <span className='text-h6'>You will pay</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          12,500 {currencyName}
        </span>
      </div>
      <Button variant='default' className='w-full mb-2'>
        Proceed to payment
      </Button>
      <Button variant='secondary' className='w-full'>
        Cancel
      </Button>
    </Modal>
  )
}

export default BidBuyModal
