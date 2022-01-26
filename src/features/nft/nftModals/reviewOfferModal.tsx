import React from 'react'
import cn from 'classnames'
import NumberFormat from 'react-number-format'
// Components
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

export type TOffer = {
  id: number | string
  user: string
  price: number
}

export type TReviewOfferModal = {
  title?: string
  offers?: Array<TOffer>
  isOpen: boolean
  handleClose: () => void
}

function ReviewOfferModal({
  title,
  offers,
  isOpen,
  handleClose,
}: TReviewOfferModal): JSX.Element {
  const currencyName = useCurrencyName()

  const renderReviewOfferContent = (price: number, user: string) => (
    <h4 className='font-medium flex items-center'>
      <span className='text-gray-2d font-extabold'>
        <NumberFormat
          value={price / 1000}
          decimalScale={2}
          displayType='text'
          thousandSeparator
        />
        k {currencyName}{' '}
      </span>
      <span className='text-gray-a0'>{translate('wasOfferedBy')}</span>{' '}
      <span className='text-link'>{user}</span>
    </h4>
  )

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-3xl'>
      <h2 className='mb-6'>
        {translate('reviewAnOfferFor')} “{title}”
      </h2>
      <div className='mb-10'>
        {offers?.map(({ id, user, price }, idx) => (
          <div
            key={id}
            className={cn(
              'flex flex-wrap align-center justify-between',
              idx !== offers.length - 1 && 'mb-4',
            )}
          >
            {renderReviewOfferContent(price, user)}
            <div className='flex'>
              <Button variant='secondary' className='w-24 mr-2'>
                {translate('decline')}
              </Button>
              <Button variant='default' className='w-24'>
                {translate('accept')}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <Link size='h5' variant='blue-3f'>
          {translate('previousSalesPriceComparison')}
        </Link>
      </div>
    </Modal>
  )
}

export default ReviewOfferModal
