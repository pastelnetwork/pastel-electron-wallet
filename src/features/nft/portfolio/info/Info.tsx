import React from 'react'
import { useToggle } from 'react-use'
import dayjs from 'dayjs'

import { TNFT } from '../../Nft.types'
import {
  HeartFilled,
  Eye,
  ChatDots,
  Checkmark,
  Key,
  Crown,
  Warning,
} from 'common/components/Icons'
import { formatDatesDistance, formatNumber } from 'common/utils/format'
import OutlineButton from './Button'
import Row from './Row'
import { Button } from 'common/components/Buttons'
import BidsModal from '../BidsModal'
import Tooltip from 'common/components/Tooltip'
import { translate } from 'features/app/translations'

type TInfoProps = {
  nft: TNFT
  currencyName: string
}

const grayButtonClass = 'text-gray-77 border-gray-e6 hover:border-gray-cd'
const pinkButtonClass =
  'text-pink-46 border-pink-46 hover:text-pink-61 hover:border-pink-61'

export default function Info({ nft, currencyName }: TInfoProps): JSX.Element {
  const [liked, toggleLiked] = useToggle(nft.liked)
  const [isBidsModal, toggleBidsModal] = useToggle(false)

  // user mock role
  const isOwner = false

  const getTooltip = (description: string) => (
    <div className='p-2'>
      <p className='text-xs text-left leading-4 text-white whitespace-normal font-medium'>
        {description}
      </p>
    </div>
  )

  const renderCollectionCategoryTagAndClaimButton = () => (
    <div className='space-y-3'>
      <Row title={translate('collection')} link='#'>
        {nft.collection}
      </Row>
      <Row title={translate('category')} link='#'>
        {nft.category}
      </Row>
      <Row title={translate('tag')} link='#'>
        {nft.tags.join(', ')}
      </Row>
      {!isOwner && (
        <Button
          className='w-full font-extrabold border border-gray-a0'
          variant='transparent'
          disabled
          prepend={<Warning size={14} />}
        >
          {translate('claim')}
        </Button>
      )}
    </div>
  )

  const renderStatistics = () => (
    <div className='flex space-x-4 lg:space-x-6'>
      <OutlineButton
        className={liked ? pinkButtonClass : grayButtonClass}
        onClick={toggleLiked}
      >
        <HeartFilled size={18} className='mr-2 lg:mr-3' />
        {nft.likes} {translate('likes').toLowerCase()}
      </OutlineButton>
      <OutlineButton className={grayButtonClass}>
        <Eye size={20} className='mr-2 lg:mr-3 text-gray-8e' />
        {nft.views} {translate('views').toLowerCase()}
      </OutlineButton>
    </div>
  )

  const renderCreatorAvatar = () => (
    <div className='rounded-full overflow-hidden mr-2 w-6 h-6'>
      <img src={nft.author.avatar} className='object-contain' alt='Avatar' />
    </div>
  )

  const renderCreator = () => (
    <Row title={translate('creator')} link='#'>
      <div className='flex-center'>
        {renderCreatorAvatar()}
        {nft.author.name}
      </div>
    </Row>
  )

  const renderCopiesRow = () => (
    <Row title={translate('copies')} link='#'>
      <div className='flex-center'>
        {nft.owner}
        <ChatDots size={13} className='text-blue-3f ml-2 relative -top-0.5' />
      </div>
    </Row>
  )

  const renderCopiesRoyalty = () => (
    <>
      <Row title={translate('copies')} link='#'>
        {nft.copies === 1 ? 'One-of-a-Kind (1 of 1)' : nft.copies}
      </Row>
      {renderCopiesRow()}
      <Row title={translate('royalty')} link='#'>
        {nft.royalty ? nft.royalty : translate('none')}
      </Row>
    </>
  )

  const renderMinimumPriceMeetTooltip = () => (
    <Tooltip
      type='top'
      content={getTooltip(translate('minimumPriceMeetTooltipContent'))}
      width={142}
    >
      <Checkmark size={14} className='text-green-6d' />
    </Tooltip>
  )

  const renderSaleTypeRow = () => (
    <Row title={translate('saleType')} link='#'>
      {nft.type ? nft.type : translate('none')}
    </Row>
  )

  return (
    <div className='flex-shrink-0 w-1/3 md:w-auto'>
      <div className='space-y-30px'>
        {renderStatistics()}
        <div className='space-y-3'>
          {renderSaleTypeRow()}
          {nft.type ? (
            <>
              <Row title={translate('status')} link='#'>
                <span className='text-black-12 mr-1'>
                  {translate('currentlyListed')}
                </span>
                <span
                  onClick={toggleBidsModal}
                  role='button'
                  aria-hidden
                  tabIndex={0}
                >
                  ({nft.status} {translate('bids')})
                </span>
              </Row>
              <Row title={translate('remaining')}>
                {formatDatesDistance(dayjs(), nft.time)} left
              </Row>
              <Row title={translate('minPrice')} link='#'>
                {formatNumber(nft.price)} {currencyName}
              </Row>
              <Row title={translate('lastBid')} link='#'>
                <span className='flex mr-3 text-gradient'>
                  {formatNumber(nft.bids)} {currencyName}
                </span>
                {renderMinimumPriceMeetTooltip()}
              </Row>
            </>
          ) : (
            <>
              <Row title={translate('price')}>
                <span className='text-gradient'>{translate('NA')}</span>
              </Row>
              {isOwner ? (
                <div className='flex item-center gap-3'>
                  <Button className='w-full font-extrabold'>
                    {translate('buyItNowButton')}
                  </Button>
                  <Button className='w-full font-extrabold'>
                    {translate('liveAuction')}
                  </Button>
                </div>
              ) : (
                <Button className='w-full font-extrabold'>
                  {translate('makeAnOfferButton')}
                </Button>
              )}
            </>
          )}
          {!isOwner && (
            <Button className='w-full font-extrabold'>
              {translate('bidNow')}
            </Button>
          )}
        </div>
        <hr />
        <div className='space-y-3'>
          {renderCreator()}
          {renderCopiesRoyalty()}
          {isOwner && (
            <Button
              className='w-full font-extrabold border border-blue-3f'
              variant='transparent'
              prepend={<Key size={24} />}
            >
              {translate('transferOwnership')}
            </Button>
          )}
          {isOwner && nft.royalty && (
            <Button
              className='w-full font-extrabold border border-blue-3f'
              variant='transparent'
              prepend={<Crown size={14} />}
            >
              {translate('transferPerpetualRoyalty')}
            </Button>
          )}
        </div>
        <hr />

        {renderCollectionCategoryTagAndClaimButton()}
      </div>
      <BidsModal isOpen={isBidsModal} handleClose={toggleBidsModal} />
    </div>
  )
}
