import React from 'react'
import { TNFT } from '../../Nft.types'
import {
  HeartFilled,
  Eye,
  Money,
  Copyright,
  ChatDots,
} from 'common/components/Icons'
import dayjs from 'dayjs'
import { formatDatesDistance } from 'common/utils/format'
import OutlineButton from './Button'
import Row from './Row'
import { Button } from 'common/components/Buttons'
import { useToggle } from 'react-use'
import Modal3 from 'features/nft/nftModals/TransferAuthorshipModal'
import Modal4 from 'features/nft/nftModals/AuthorshipClaimModal'
import Modal5 from 'features/nft/nftModals/ClaimTicketModal'
import Modal6 from 'features/nft/nftModals/CopiesDetailsModal'
import Modal7 from 'features/nft/nftModals/PricePlanModal'
import Modal8 from 'features/nft/nftModals/OwnershipHistoryModal'

type TInfoProps = {
  nft: TNFT
}

const grayButtonClass = 'text-gray-77 border-gray-e6 hover:border-gray-cd'
const pinkButtonClass =
  'text-pink-46 border-pink-46 hover:text-pink-61 hover:border-pink-61'

export default function Info({ nft }: TInfoProps): JSX.Element {
  const [liked, toggleLiked] = useToggle(nft.liked)
  const [isShowModal3, toggleShowModal3] = useToggle(false)
  const [isShowModal4, toggleShowModal4] = useToggle(false)
  const [isShowModal5, toggleShowModal5] = useToggle(false)
  const [isShowModal6, toggleShowModal6] = useToggle(false)
  const [isShowModal7, toggleShowModal7] = useToggle(false)
  const [isShowModal8, toggleShowModal8] = useToggle(false)

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
          <Row title='Status' link='#'>
            {nft.status}
          </Row>
          <Row title='Price' link='#'>
            {nft.price} {nft.currencyName}
          </Row>
          <Row title='Remaining'>
            {formatDatesDistance(dayjs(), nft.time)} left
          </Row>
          <Row title='Last bid' link='#'>
            {nft.bids} PSL
          </Row>
          <Button className='w-full font-extrabold'>Bid now</Button>
          <div className='flex flex-row w-120px space-x-3'>
            <Button onClick={toggleShowModal3}>Modal3</Button>
            <Button onClick={toggleShowModal4}>Modal4</Button>
            <Button onClick={toggleShowModal5}>Modal5</Button>
          </div>
          <div className='flex flex-row w-120px space-x-3'>
            <Button onClick={toggleShowModal6}>Modal6</Button>
            <Button onClick={toggleShowModal7}>Modal7</Button>
            <Button onClick={toggleShowModal8}>Modal8</Button>
          </div>
        </div>
        <hr />
        <div className='space-y-3'>
          <Row title='Author' link='#'>
            <div className='flex-center'>
              <div className='rounded-full overflow-hidden mr-2 w-6 h-6'>
                <img src={nft.author.avatar} className='object-contain' />
              </div>
              {nft.author.name}
              <Money
                size={14}
                className='text-blue-3f ml-2 relative -top-0.5'
              />
              <Copyright
                size={13}
                className='text-blue-3f ml-2 relative -top-0.5'
              />
            </div>
          </Row>
          <Row title='Exclusive'>
            {nft.copies === 1 ? 'One of a Kind (1 of 1)' : nft.copies}
          </Row>
          <Row title='Owner' link='#'>
            <div className='flex-center'>
              {nft.owner}
              <ChatDots
                size={13}
                className='text-blue-3f ml-2 relative -top-0.5'
              />
            </div>
          </Row>
        </div>
        <hr />
        <div className='space-y-3'>
          <Row title='Collection' link='#'>
            {nft.collection}
          </Row>
          <Row title='Category'>{nft.category}</Row>
          <Row title='Tag' link='#'>
            {nft.tags.join(', ')}
          </Row>
        </div>
      </div>
      <Modal3 isOpen={isShowModal3} handleClose={toggleShowModal3} />
      <Modal4 isOpen={isShowModal4} handleClose={toggleShowModal4} />
      <Modal5 isOpen={isShowModal5} handleClose={toggleShowModal5} />
      <Modal6 isOpen={isShowModal6} handleClose={toggleShowModal6} />
      <Modal7 isOpen={isShowModal7} handleClose={toggleShowModal7} />
      <Modal8 isOpen={isShowModal8} handleClose={toggleShowModal8} />
    </div>
  )
}
