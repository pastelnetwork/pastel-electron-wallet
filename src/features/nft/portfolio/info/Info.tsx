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

  return (
    <div className='flex-shrink-0 w-1/3 md:w-auto'>
      <div className='space-y-30px'>
        <div className='flex space-x-4 lg:space-x-6'>
          <OutlineButton
            className={liked ? pinkButtonClass : grayButtonClass}
            onClick={toggleLiked}
          >
            <HeartFilled size={18} className='mr-2 lg:mr-3' />
            {nft.likes} likes
          </OutlineButton>
          <OutlineButton className={grayButtonClass}>
            <Eye size={20} className='mr-2 lg:mr-3 text-gray-8e' />
            {nft.views} views
          </OutlineButton>
        </div>
        <div className='space-y-3'>
          <Row title='Sale Type' link='#'>
            {nft.type ? nft.type : 'None'}
          </Row>
          {nft.type ? (
            <>
              <Row title='Status' link='#'>
                <span className='text-black-12 mr-1'>Currently Listed</span>
                <span onClick={toggleBidsModal}>({nft.status} bids)</span>
              </Row>
              <Row title='Remaining'>
                {formatDatesDistance(dayjs(), nft.time)} left
              </Row>
              <Row title='Min. Price' link='#'>
                {formatNumber(nft.price)} {currencyName}
              </Row>
              <Row title='Last bid' link='#'>
                <span className='flex mr-3 text-gradient'>
                  {formatNumber(nft.bids)} {currencyName}
                </span>
                <Tooltip
                  type='top'
                  content={getTooltip('Minimum Price Meet')}
                  width={142}
                >
                  <Checkmark size={14} className='text-green-6d' />
                </Tooltip>
              </Row>
            </>
          ) : (
            <>
              <Row title='Price'>
                <span className='text-gradient'>NA</span>
              </Row>
              {isOwner ? (
                <div className='flex item-center gap-3'>
                  <Button className='w-full font-extrabold'>Buy it Now</Button>
                  <Button className='w-full font-extrabold'>
                    Live Auction
                  </Button>
                </div>
              ) : (
                <Button className='w-full font-extrabold'>Make an Offer</Button>
              )}
            </>
          )}
          {!isOwner && (
            <Button className='w-full font-extrabold'>Bid now</Button>
          )}
        </div>
        <hr />
        <div className='space-y-3'>
          <Row title='Creator' link='#'>
            <div className='flex-center'>
              <div className='rounded-full overflow-hidden mr-2 w-6 h-6'>
                <img src={nft.author.avatar} className='object-contain' />
              </div>
              {nft.author.name}
            </div>
          </Row>
          <Row title='Copies' link='#'>
            {nft.copies === 1 ? 'One-of-a-Kind (1 of 1)' : nft.copies}
          </Row>
          <Row title='Copies' link='#'>
            <div className='flex-center'>
              {nft.owner}
              <ChatDots
                size={13}
                className='text-blue-3f ml-2 relative -top-0.5'
              />
            </div>
          </Row>
          <Row title='Royalty' link='#'>
            {nft.royalty ? nft.royalty : 'None'}
          </Row>
          {isOwner && (
            <Button
              className='w-full font-extrabold border border-blue-3f'
              variant='transparent'
              prepend={<Key size={24} />}
            >
              Transfer Ownership
            </Button>
          )}
          {isOwner && nft.royalty && (
            <Button
              className='w-full font-extrabold border border-blue-3f'
              variant='transparent'
              prepend={<Crown size={14} />}
            >
              Transfer Perpetual Royalty
            </Button>
          )}
        </div>
        <hr />
        <div className='space-y-3'>
          <Row title='Collection' link='#'>
            {nft.collection}
          </Row>
          <Row title='Category' link='#'>
            {nft.category}
          </Row>
          <Row title='Tag' link='#'>
            {nft.tags.join(', ')}
          </Row>
          {!isOwner && (
            <Button
              className='w-full font-extrabold border border-gray-a0'
              variant='transparent'
              disabled
              prepend={<Warning size={14} />}
            >
              Claim
            </Button>
          )}
        </div>
      </div>
      <BidsModal isOpen={isBidsModal} handleClose={toggleBidsModal} />
    </div>
  )
}
