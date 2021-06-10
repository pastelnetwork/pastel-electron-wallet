import React from 'react'
import { TNFT } from 'features/nft/Nft.types'
import { HeartFilled, Eye } from 'common/components/Icons'
import dayjs from 'dayjs'
import { formatDatesDistance } from 'common/utils/format'
import Button from './Button'
import Row from './Row'
import { useToggle } from 'react-use'

type TInfoProps = {
  nft: TNFT
}

const grayButtonClass = 'text-gray-77 border-gray-e6 hover:border-gray-cd'
const pinkButtonClass =
  'text-pink-46 border-pink-46 hover:text-pink-61 hover:border-pink-61'

export default function Info({ nft }: TInfoProps): JSX.Element {
  const [liked, toggleLiked] = useToggle(nft.liked)

  return (
    <div className='flex-shrink-0 w-1/3 md:w-auto'>
      <div className='space-y-30px'>
        <div className='flex space-x-4 lg:space-x-6'>
          <Button
            className={liked ? pinkButtonClass : grayButtonClass}
            onClick={toggleLiked}
          >
            <HeartFilled size={18} className='mr-2 lg:mr-3' />
            {nft.likes} likes
          </Button>
          <Button className={grayButtonClass}>
            <Eye size={20} className='mr-2 lg:mr-3 text-gray-8e' />
            {nft.views} views
          </Button>
        </div>
        <div className='space-y-3'>
          <Row title='Status' link='#'>
            {nft.status}
          </Row>
          <Row title='Price' link='#'>
            {nft.price} {nft.currencyName}
          </Row>
          <Row title='Time'>{formatDatesDistance(dayjs(), nft.time)} left</Row>
          <Row title='Bids' link='#'>
            {nft.bids} PSL
          </Row>
        </div>
        <hr />
        <div className='space-y-3'>
          <Row title='Author' link='#'>
            <div className='flex-center'>
              <div className='rounded-full overflow-hidden mr-2 w-6 h-6'>
                <img src={nft.author.avatar} className='object-contain' />
              </div>
              {nft.author.name}
            </div>
          </Row>
          <Row title='Exclusive'>
            {nft.copies === 1 ? 'exclusive (1 of 1)' : nft.copies}
          </Row>
          <Row title='Owner' link='#'>
            {nft.owner}
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
    </div>
  )
}
