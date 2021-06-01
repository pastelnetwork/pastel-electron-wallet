import React from 'react'
// Components
import Modal from '../../../common/components/Modal'
import BidInput from '../../../common/components/BidInput'
import Button from '../../../common/components/Button'

export interface BidBuyModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler
}

const BidBuyModal: React.FC<BidBuyModalProps> = ({ isOpen, handleClose }) => {
  const [bid, setBid] = React.useState('')
  const onBidChange = (value: string) => setBid(value)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='lg'>
      <h2 className='mb-6 font-roman'>
        Buy-it-now listing: “Diamonds in the sky”
      </h2>
      <div className='flex justify-between mb-6'>
        <span className='text-navigation-default'>Listed price</span>
        <span className='text-success-default font-heavy'>
          1,000,000,000 PSL
        </span>
      </div>
      <BidInput bid={bid} onBidChange={onBidChange} />
      <Button variant='default' className='w-full' disabled={!bid}>
        Submit offer
      </Button>
    </Modal>
  )
}

export default BidBuyModal
