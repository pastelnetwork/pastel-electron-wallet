import React from 'react'
// Components
import Modal from '../../../common/components/modal'
import BidInput from '../../../common/components/bid-input'
import Button from '../../../common/components/button'

export interface BidsBuyModalProps {
  isOpen: boolean
  handleClose: any
  children?: any
}

const BidsBuyModal: React.FC<BidsBuyModalProps> = ({ isOpen, handleClose }) => {
  const [bid, setBid] = React.useState('')
  const onBidChange = (value: string) => setBid(value)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='lg'>
      <h2 className='mb-6 font-roman'>
        Buy-it-now listing: “Diamonds in the sky”
      </h2>
      <div className='flex justify-between mb-6'>
        <span className='text-gray-500'>Listed price</span>
        <span className='text-success-default font-heavy'>
          1,000,000,000 PSL
        </span>
      </div>
      <BidInput bid={bid} onBidChange={onBidChange} />
      <Button variant='primary' onClick={handleClose} fluid disabled={!bid}>
        Submit offer
      </Button>
    </Modal>
  )
}

export default BidsBuyModal
