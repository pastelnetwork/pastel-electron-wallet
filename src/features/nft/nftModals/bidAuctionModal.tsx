import React, { useCallback } from 'react'
import parse from 'html-react-parser'
// Components
import { Modal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import { InputNumberFormat } from 'common/components/Inputs'
import { Fire } from 'common/components/Icons'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

type TBidAutionType = 'MakeOffer' | 'Buy' | 'Bid'

export type TBidAuctionModal = {
  type: TBidAutionType
  username?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function BidAuctionModal({
  type,
  username,
  isOpen,
  handleClose,
}: TBidAuctionModal): JSX.Element {
  const currencyName = useCurrencyName()
  const [bid, setBid] = React.useState<string>('12950')
  const handleBid = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setBid(event.target.value),
    [bid],
  )

  const renderTransactionFeeContent = () => (
    <p className='text-right font-extrabold text-h6 text-gray-2d flex items-center'>
      <Fire size={18} />
      ~500 {currencyName}
    </p>
  )

  const renderCurrentBalance = () => (
    <div className='text-sm mb-[26px]'>
      <div className='flex justify-between'>
        <p className='font-normal text-gray-4a'>
          {translate('yourCurrentPSLBalance', { currencyName })}
        </p>
        <p className='text-right font-extrabold text-h6 text-gray-2d'>
          21,000 {currencyName}
        </p>
      </div>
      <div className='flex justify-between mt-2.5'>
        <p className='font-normal text-gray-4a'>
          {translate('transactionFeeBurned')}
        </p>
        {renderTransactionFeeContent()}
      </div>
      <div className='flex justify-between mt-2.5'>
        <p className='font-normal text-gray-4a'>
          {translate('totalNFTOfferWithFee')}
        </p>
        <p className='text-right font-extrabold text-h6 text-gray-2d'>
          13,450 {currencyName}
        </p>
      </div>
      <div className='flex justify-between mt-2.5'>
        <p className='font-normal text-gray-4a'>
          {translate('remainingBalanceIfAccepted')}
        </p>
        <p className='text-right font-extrabold text-h6 text-gray-2d'>
          7,550 {currencyName}
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-lg px-10 w-[430px]'
    >
      <h2 className={`${type === 'MakeOffer' ? 'mb-6' : 'mb-2.5'}`}>
        {type === 'MakeOffer'
          ? translate('makeAnOfferButton')
          : type === 'Buy'
          ? translate('buyItNowButton')
          : translate('placeAnAuctionBid')}
      </h2>
      {type === 'MakeOffer' ? (
        <p className='mb-6 text-base'>
          {translate('youAreMakingAnOffer')}{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          {translate('by')}{' '}
          <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      ) : type === 'Bid' ? (
        <p className='mb-6 text-base'>
          {translate('youAreBuying')}{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          {translate('from')}{' '}
          <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      ) : (
        <p className='mb-6 text-base'>
          {translate('youArePlacingABid')}{' '}
          <span className='font-extrabold text-blue-3f'>
            Super Nfty Floating Head Professional
          </span>{' '}
          {translate('from')}{' '}
          <span className='font-extrabold text-blue-3f'>{username}</span>
        </p>
      )}

      <div className='mb-6'>
        <InputNumberFormat
          hint={
            type === 'MakeOffer' ? (
              <div className='font-medium'>
                {parse(translate('makeOfferNote'))}
              </div>
            ) : type === 'Buy' ? (
              <div className='font-medium'>
                {translate('numberCopiesAvailable', { number: 3 })}
              </div>
            ) : (
              <div className='font-medium'>
                {translate('yourBidMustBeHigherThanTheCurrentHighBid')}
              </div>
            )
          }
          type='text'
          label={
            type === 'MakeOffer' ? (
              translate('yourOfferedPrice')
            ) : type === 'Buy' ? (
              translate('enterDesiredQuantity')
            ) : (
              <div className='text-base'>
                {translate('currentBidAndEnter', {
                  currencyName,
                  bid: '12,000',
                  enter: '12,100',
                })}
                :
              </div>
            )
          }
          value={bid}
          labelClassName='pb-1 text-lg text-gray-71 font-medium'
          onChange={handleBid}
          append={<span className='text-gray-a0'>{currencyName}</span>}
        />
      </div>
      {type === 'Buy' && (
        <div className='mb-[18px]'>
          <p className='text-lg text-gray-71 font-medium'>
            {translate('price')}
          </p>
          <p className='text-gray-2d font-extrabold text-h3 mt-1.5'>
            12,000 {currencyName}
          </p>
        </div>
      )}
      {renderCurrentBalance()}
      {type === 'MakeOffer' ? (
        <Button variant='default' className='w-full'>
          {translate('bidNow')}
        </Button>
      ) : type === 'Buy' ? (
        <div>
          <Button variant='default' className='w-full'>
            {translate('proceedToPayment')}
          </Button>
          <Button variant='secondary' className='w-full mt-4'>
            {translate('cancel')}
          </Button>
        </div>
      ) : (
        <div>
          <Button variant='default' className='w-full'>
            {translate('submitBid')}
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default BidAuctionModal
