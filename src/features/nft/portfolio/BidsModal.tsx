import React, { useCallback } from 'react'
import dayjs from 'dayjs'

import Modal from '../nftModals/modal'
import avatar1 from 'common/assets/images/mock/avatar-1.png'
import avatar2 from 'common/assets/images/mock/avatar-2.png'
import avatar3 from 'common/assets/images/mock/avatar-3.png'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatPrice } from 'common/utils/format'
import { translate } from 'features/app/translations'

export type TBidsModal = {
  isOpen: boolean
  handleClose: () => void
}

type TCommentProps = {
  id: number
  author: {
    avatar: string
    name: string
    username: string
  }
  bidPrice: string
  publishedAt: Date
}

function BidsModal({ isOpen, handleClose }: TBidsModal): JSX.Element {
  const currencyName = useCurrencyName()
  const comments = [
    {
      id: 1,
      author: {
        avatar: avatar1,
        name: 'Ben Mingo',
        username: '@zndrson',
      },
      bidPrice: formatPrice(12000, currencyName),
      publishedAt: new Date(),
    },
    {
      id: 2,
      author: {
        avatar: avatar2,
        name: 'The Noc Design',
        username: '@zndrson',
      },
      bidPrice: formatPrice(12000, currencyName),
      publishedAt: new Date(),
    },
    {
      id: 3,
      author: {
        avatar: avatar3,
        name: 'Michael Brewer',
        username: '@zndrson',
      },
      bidPrice: formatPrice(12000, currencyName),
      publishedAt: new Date(),
    },
    {
      id: 4,
      author: {
        avatar: avatar2,
        name: 'The Noc Design',
        username: '@zndrson',
      },
      bidPrice: formatPrice(12000, currencyName),
      publishedAt: new Date(),
    },
    {
      id: 5,
      author: {
        avatar: avatar3,
        name: 'Michael Brewer',
        username: '@zndrson',
      },
      bidPrice: formatPrice(12000, currencyName),
      publishedAt: new Date(),
    },
  ]

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderCommentContent = (comment: TCommentProps) => (
    <div className='leading-5'>
      <div className='text-extrabold text-black text-h4'>
        {comment.author.name}{' '}
        <span className='text-gray-71 text-h5'>{comment.author.username}</span>
      </div>

      <div className='flex text-sm space-x-18px'>
        <div className='text-gray-71 leading-5'>
          {translate('makeABid')}{' '}
          {dayjs(comment.publishedAt).format('MMM DD, YYYY [at] HH:mm a')}
        </div>
      </div>
    </div>
  )

  const renderCommentAvatar = (avatar: string) => (
    <div className='w-8 h-8 rounded-full overflow-hidden'>
      <img src={avatar} className='object-cover' alt='Avatar' />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='564px'
      title={
        <div>
          <div className='text-h2 tracking-0.01'>
            {translate('bidsActivity')} (8 {translate('bids')})
          </div>
          <div className='text-base text-gray-71 font-medium'>
            {translate('NFTID')} 230456346
          </div>
        </div>
      }
      infoIcon={false}
    >
      {comments.map(comment => (
        <div
          className='flex py-4 border-t border-gray-f2 justify-between'
          key={comment.id}
        >
          <div className='flex space-x-2'>
            {renderCommentAvatar(comment.author.avatar)}
            {renderCommentContent(comment)}
          </div>
          <div className='text-blue-3f text-j4'>{comment.bidPrice}</div>
        </div>
      ))}
    </Modal>
  )
}

export default BidsModal
