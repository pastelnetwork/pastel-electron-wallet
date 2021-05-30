import React from 'react'
// Components
import Modal from '../../../common/components/modal'
import Link from '../../../common/components/link'
import BidInput from '../../../common/components/bid-input'
import Button from '../../../common/components/button'

export interface BidsOfferModalProps {
  isOpen: boolean
  handleClose: any
  children?: any
}

const BidsOfferModal: React.FC<BidsOfferModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [bid, setBid] = React.useState('')
  const onBidChange = (value: string) => setBid(value)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='lg'>
      <h2 className='mb-2 font-roman'>
        Make an offer for “Diamonds in the sky”
      </h2>
      <span className='text-gray-500 inline-block mb-4'>NFT is not listed</span>
      <p className='text-gray-500 font-medium text-center text-h4 mb-4'>
        <span className='text-success-default font-heavy'>1,000,000k</span> was
        offered by SuperDealer23
      </p>
      <div className='text-center mb-4'>
        <Link>Cheack price stats for this NFT</Link>
      </div>
      <BidInput bid={bid} onBidChange={onBidChange} />
      <Button variant='primary' onClick={handleClose} fluid disabled={!bid}>
        Submit offer
      </Button>
    </Modal>
  )
}

export default BidsOfferModal
