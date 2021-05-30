import React from 'react'
// Components
import Modal from '../../../common/components/modal'
import Button from '../../../common/components/button'
import BidInput from '../../../common/components/bid-input'
// Data
import bids from './data'

export interface BidsAuctionModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<Element>
}

const BidsAuctionModal: React.FC<BidsAuctionModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [bid, setBid] = React.useState('')

  const onBidChange = (value: string) => setBid(value)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='2xl'>
      <h2 className='mb-6 font-roman'>Auction bids: “Diamonds in the sky”</h2>
      <div className='mb-6'>
        {bids.map(({ id, time, bid, name }, idx) => (
          <div
            className='grid grid-cols-4 gap-3 border-b border-line-default pb-5 mb-5'
            key={id}
          >
            {idx === 0 ? (
              <h5 className='font-heavy'>Highest bid</h5>
            ) : (
              <h5 className='font-medium text-gray-500'>Previous bid</h5>
            )}
            <span className='text-gray-500'>{time}</span>
            <span
              className={
                idx === 0 ? 'text-success-default font-medium' : 'text-gray-500'
              }
            >
              {bid} PSL
            </span>
            <span className='text-button-default'>{name}</span>
          </div>
        ))}
        <div className='text-center'>
          <span className='font-medium text-gray-500 cursor-pointer'>
            Show more
          </span>
        </div>
      </div>
      <div className='max-w-md mx-auto'>
        <BidInput bid={bid} onBidChange={onBidChange} />
        <Button variant='primary' onClick={handleClose} fluid disabled={!bid}>
          Submit offer
        </Button>
      </div>
    </Modal>
  )
}

export default BidsAuctionModal
