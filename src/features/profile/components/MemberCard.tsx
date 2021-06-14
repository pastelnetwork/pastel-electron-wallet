import React from 'react'
import Avatar from '../../../common/components/Avatar'
import VoteIcon from '../../../common/components/Icons/Vote'
import ChatIcon from '../../../common/components/Icons/Chat'
import { Link } from 'react-router-dom'
import cn from 'classnames'

export type TMemberBoardProps = {
  name: string
  avatarSrc: string
  time: string
  description: string
  productURL: string
  iconType: 'comment' | 'key' | 'heart' | 'none'
  iconPosition: 'top' | 'bottom'
  object: string
  behaviour: 'commented' | 'purchased' | 'liked'
  active: boolean
  onClickChat?: (event: React.MouseEvent<SVGSVGElement>) => void
  onClickVote?: (event: React.MouseEvent<SVGSVGElement>) => void
}

const MemberCard = ({
  name,
  avatarSrc,
  time,
  description,
  productURL,
  iconType = 'comment',
  iconPosition = 'top',
  behaviour = 'commented',
  object = 'Collab.',
  onClickChat,
  onClickVote,
  active = false,
}: TMemberBoardProps): JSX.Element => {
  return (
    <div
      className={cn(
        'flex justify-between w-full py-8 pr-2 pr-10px md:pr-33px pl-4',
        active ? 'bg-white rounded-xl' : 'border-b border-gray-e0',
      )}
    >
      <div className='flex'>
        <div className='flex-none'>
          <Avatar
            iconType={iconType}
            position={iconPosition}
            avatarSrc={avatarSrc}
          />
        </div>

        <div className='ml-6 font-medium lg:w-372px'>
          <div className='text-gray-11 text-base'>{name}</div>
          <div className='text-13px'>
            {behaviour == 'commented' && (
              <span className='text-gray-80'>Commented on</span>
            )}
            <Link to='#'>
              <span className='text-blue-3f ml-2'>{object}</span>
            </Link>
            <span className='text-gray-80 ml-2'>{time}</span>
          </div>
          <div className='mt-4 text-gray-80 text-h6 font-normal'>
            {description}
          </div>
          <div className='mt-13px flex'>
            <ChatIcon
              size={30}
              clickHandler={onClickChat}
              className='text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400 mr-3 cursor-pointer'
            />
            <VoteIcon
              size={30}
              clickHandler={onClickVote}
              className='text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400 cursor-pointer'
            />
          </div>
        </div>
      </div>
      <div className='w-103px h-104px flex-none'>
        <img
          className='object-fill w-103px h-104px rounded-xl shadow-lg'
          src={productURL}
          alt='Product Image'
        />
      </div>
    </div>
  )
}

export default MemberCard
