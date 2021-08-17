import React from 'react'
// Components
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import { InputNumberFormat } from 'common/components/Inputs'
import { Fire } from 'common/components/Icons'

type TBidAutionType = 'MakeOffer' | 'Buy' | 'Bid'

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
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-lg px-10 w-[430px]'
    >
      <h2 className={`${type === 'MakeOffer' ? 'mb-6' : 'mb-2.5'}`}>
        {type === 'MakeOffer'
          ? 'Make an offer'
          : type === 'Buy'
          ? 'Buy It Now'
          : 'Place an Auction Bid'}
      </h2>
      {type === 'MakeOffer' ? (
        <p className='mb-6 text-base'>
          You are making an offer for{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          by <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      ) : type === 'Bid' ? (
        <p className='mb-6 text-base'>
          You are buying{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          from <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      ) : (
        <p className='mb-6 text-base'>
          You are placing a bid for{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          from <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      )}

      <div className='mb-6'>
        <InputNumberFormat
          hint={
            type === 'MakeOffer' ? (
              <div className='font-medium'>
                Note: Your offer must be higher then the current asking price{' '}
                <br />
                (if any), and might not be accepted by the seller
              </div>
            ) : type === 'Buy' ? (
              <div className='font-medium'>
                3 copies available at the price listed below
              </div>
            ) : (
              <div className='font-medium'>
                Your bid must be higher than the current high bid.
              </div>
            )
          }
          type='text'
          label={
            type === 'MakeOffer' ? (
              'Your Offered Price'
            ) : type === 'Buy' ? (
              'Enter Desired Quantity'
            ) : (
              <div className='text-base'>
                Current bid 12,000 PSL. Enter 12,100 or more:
              </div>
            )
          }
          value={bid}
          labelClassName='pb-1 text-lg text-gray-71 font-medium'
          onChange={handleBid}
          append={<span className='text-gray-a0'>{info?.currencyName}</span>}
        />
      </div>
      {type === 'Buy' && (
        <div className='mb-[18px]'>
          <p className='text-lg text-gray-71 font-medium'>Price</p>
          <p className='text-gray-2d font-extrabold text-h3 mt-1.5'>
            12,000 {info?.currencyName}
          </p>
        </div>
      )}
      <div className='text-sm mb-[26px]'>
        <div className='flex justify-between'>
          <p className='font-normal text-gray-4a'>Your Current PSL Balance</p>
          <p className='text-right font-extrabold text-h6 text-gray-2d'>
            21,000 {info?.currencyName}
          </p>
        </div>
        <div className='flex justify-between mt-2.5'>
          <p className='font-normal text-gray-4a'>Transaction Fee(burned)</p>
          <p className='text-right font-extrabold text-h6 text-gray-2d flex items-center'>
            <Fire size={18} />
            ~500 {info?.currencyName}
          </p>
        </div>
        <div className='flex justify-between mt-2.5'>
          <p className='font-normal text-gray-4a'>Total NFT Offer with Fee</p>
          <p className='text-right font-extrabold text-h6 text-gray-2d'>
            13,450 {info?.currencyName}
          </p>
        </div>
        <div className='flex justify-between mt-2.5'>
          <p className='font-normal text-gray-4a'>
            Remaining Balance if Accepted
          </p>
          <p className='text-right font-extrabold text-h6 text-gray-2d'>
            7,550 {info?.currencyName}
          </p>
        </div>
      </div>
      {type === 'MakeOffer' ? (
        <Button variant='default' className='w-full'>
          Bid now
        </Button>
      ) : type === 'Buy' ? (
        <div>
          <Button variant='default' className='w-full'>
            Proceed to Payment
          </Button>
          <Button variant='secondary' className='w-full mt-4'>
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Button variant='default' className='w-full'>
            Submit Bid
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default BidAuctionModal
