import React from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/Buttons'
import { InputNumberFormat } from '../../../common/components/Inputs'

type TBidAutionType = 'MakeOffer' | 'Bid'

export type TBidAuctionModal = {
  type: TBidAutionType
  username?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  info: {
    currencyName: string
  }
}

const BidAuctionModal = ({
  type,
  username,
  isOpen,
  handleClose,
  info,
}: TBidAuctionModal): JSX.Element => {
  const [bid, setBid] = React.useState<string>('12950')
  const handleBid = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBid(event.target.value)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>
        {type === 'MakeOffer' ? 'Make an offer' : 'Your bid'}
      </h2>
      <p className='mb-6'>
        You are place a bid for{' '}
        <span className='font-medium text-blue-3f'>
          Super Nfty Floating Head Professional
        </span>{' '}
        by <span className='font-medium text-blue-3f'>{username}</span>
      </p>
      <div className='mb-6'>
        <InputNumberFormat
          hint='Your bid must be higher then current one'
          type='text'
          label='Your bid'
          value={bid}
          onChange={handleBid}
          append={<span className='text-gray-a0'>{info?.currencyName}</span>}
        />
      </div>
      <div className='grid grid-cols-2 gap-1 justify-between mb-6'>
        <span className='text-h6 text-gray-2d'>Your bidding balance</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          13,500 {info?.currencyName}
        </span>
        <span className='text-h6 text-gray-2d'>Your balance</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          21,000 {info?.currencyName}
        </span>
        <span className='text-h6 text-gray-2d'>Service fee</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          ~500 {info?.currencyName}
        </span>
        <span className='text-h6 text-gray-2d'>Total bid amount</span>
        <span className='text-right font-extrabold text-h6 text-gray-2d'>
          13,450 {info?.currencyName}
        </span>
      </div>
      <Button variant='default' className='w-full'>
        Bid now
      </Button>
    </Modal>
  )
}

export default BidAuctionModal
