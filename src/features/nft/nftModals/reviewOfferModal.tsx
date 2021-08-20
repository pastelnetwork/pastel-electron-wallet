import React from 'react'
import cn from 'classnames'
import NumberFormat from 'react-number-format'
// Components
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'
import { useCurrencyName } from 'common/hooks/appInfo'

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

const ReviewOfferModal = ({
  title,
  offers,
  isOpen,
  handleClose,
}: TReviewOfferModal): JSX.Element => {
  const currencyName = useCurrencyName()
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-3xl'>
      <h2 className='mb-6'>Review an offer for “{title}”</h2>
      <div className='mb-10'>
        {offers?.map(({ id, user, price }, idx) => (
          <div
            key={id}
            className={cn(
              'flex flex-wrap align-center justify-between',
              idx !== offers.length - 1 && 'mb-4',
            )}
          >
            <h4 className='font-medium flex items-center'>
              <span className='text-gray-2d font-extabold'>
                <NumberFormat
                  value={price / 1000}
                  decimalScale={2}
                  displayType='text'
                  thousandSeparator={true}
                />
                k {currencyName}{' '}
              </span>
              <span className='text-gray-a0'>was offered by</span>{' '}
              <span className='text-link'>{user}</span>
            </h4>
            <div className='flex'>
              <Button variant='secondary' className='w-24 mr-2'>
                Decline
              </Button>
              <Button variant='default' className='w-24'>
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <Link size='h5' variant='blue-3f'>
          Previous sales price comparison
        </Link>
      </div>
    </Modal>
  )
}

export default ReviewOfferModal
