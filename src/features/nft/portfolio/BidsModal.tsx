import React from 'react'
import Modal from '../nftModals/modal'
import avatar1 from 'common/assets/images/mock/avatar-1.png'
import avatar2 from 'common/assets/images/mock/avatar-2.png'
import avatar3 from 'common/assets/images/mock/avatar-3.png'
import dayjs from 'dayjs'

export type TBidsModal = {
  isOpen: boolean
  handleClose: () => void
}

const BidsModal = ({ isOpen, handleClose }: TBidsModal): JSX.Element => {
  const comments = [
    {
      id: 1,
      author: {
        avatar: avatar1,
        name: 'Ben Mingo',
        username: '@zndrson',
      },
      bidPrice: '12,000PSL',
      publishedAt: new Date(),
    },
    {
      id: 2,
      author: {
        avatar: avatar2,
        name: 'The Noc Design',
        username: '@zndrson',
      },
      bidPrice: '12,000PSL',
      publishedAt: new Date(),
    },
    {
      id: 3,
      author: {
        avatar: avatar3,
        name: 'Michael Brewer',
        username: '@zndrson',
      },
      bidPrice: '12,000PSL',
      publishedAt: new Date(),
    },
    {
      id: 4,
      author: {
        avatar: avatar2,
        name: 'The Noc Design',
        username: '@zndrson',
      },
      bidPrice: '12,000PSL',
      publishedAt: new Date(),
    },
    {
      id: 5,
      author: {
        avatar: avatar3,
        name: 'Michael Brewer',
        username: '@zndrson',
      },
      bidPrice: '12,000PSL',
      publishedAt: new Date(),
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='564px'
      title={
        <div>
          <div className='text-h2 tracking-0.01'>Bids activity (8 bids)</div>
          <div className='text-base text-gray-71 font-medium'>
            NFT ID 230456346
          </div>
        </div>
      }
      infoIcon={false}
    >
      {comments.map((comment, index) => (
        <div
          className='flex py-4 border-t border-gray-f2 justify-between'
          key={index}
        >
          <div className='flex space-x-2'>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
              <img src={comment.author.avatar} className='object-cover' />
            </div>
            <div className='leading-5'>
              <div className='text-extrabold text-black text-h4'>
                {comment.author.name}{' '}
                <span className='text-gray-71 text-h5'>
                  {comment.author.username}
                </span>
              </div>

              <div className='flex text-sm space-x-18px'>
                <div className='text-gray-71 leading-5'>
                  make a bid{' '}
                  {dayjs(comment.publishedAt).format(
                    'MMM DD, YYYY [at] HH:mm a',
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='text-blue-3f text-j4'>{comment.bidPrice}</div>
        </div>
      ))}
    </Modal>
  )
}

export default BidsModal
