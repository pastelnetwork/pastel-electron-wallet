import React, { useCallback } from 'react'
import Avatar from '../../../common/components/Avatar'
import { Link } from 'react-router-dom'
import cn from 'classnames'

export type TMemberBoardProps = {
  id: number
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
  onClick: (index: number) => void
}

export default function MemberCard({
  id,
  name,
  avatarSrc,
  time,
  description,
  productURL,
  iconType = 'comment',
  iconPosition = 'top',
  behaviour = 'commented',
  object = 'Collab.',
  active = false,
  onClick,
}: TMemberBoardProps): JSX.Element {
  const handleClick = useCallback(() => {
    onClick(id)
  }, [])

  const renderLinkComment = () => (
    <Link to='#'>
      <span className='text-blue-3f ml-2'>{object}</span>
    </Link>
  )

  const renderCommentContent = () => (
    <div className='ml-6 font-medium lg:w-372px flex-grow'>
      <div className='text-gray-11 text-base'>{name}</div>
      <div className='text-13px'>
        {behaviour == 'commented' && (
          <span className='text-gray-80'>Commented on</span>
        )}
        {renderLinkComment()}
        <span className='text-gray-80 ml-2'>{time}</span>
      </div>
      <div className='mt-4 text-gray-80 text-h5 font-normal'>{description}</div>
      <div className='mt-13px flex'>
        <textarea
          placeholder='reply'
          className='border border-gray-f2 w-full px-4 py-[7px] h-10'
        />
      </div>
    </div>
  )

  const renderCommentAvatar = () => (
    <div className='flex-none'>
      <Avatar
        iconType={iconType}
        position={iconPosition}
        avatarSrc={avatarSrc}
      />
    </div>
  )

  return (
    <button
      type='button'
      className={cn(
        'flex justify-between w-full py-8 gap-2',
        active
          ? 'bg-white rounded-xl pr-2.5 md:pr-33px pl-4'
          : 'border-b border-gray-e0',
      )}
      onClick={handleClick}
    >
      <div className='flex flex-grow'>
        {renderCommentAvatar()}

        {renderCommentContent()}
      </div>
      <div className='w-104px h-104px flex-none'>
        <img
          className='object-fill w-104px h-104px rounded-xl shadow-lg'
          src={productURL}
          alt='Product Image'
        />
      </div>
    </button>
  )
}
