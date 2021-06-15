import React from 'react'
import cn from 'classnames'

import verifiedIcon from '../../common/assets/images/verified-icon.svg'

export type TMemberCard = {
  avatar: string
  name: string
  followers: number | string
  role?: string
  isVerified: boolean
  followedByUser: boolean
}

const MemberCard = ({
  avatar,
  name,
  followers,
  isVerified,
  followedByUser,
}: TMemberCard): JSX.Element => {
  return (
    <div className='px-5 py-7 bg-background-main rounded-2xl overflow-visible h-142px'>
      <div className='flex space-x-4 relative'>
        <img src={avatar} className='w-88px h-88px' />
        {isVerified && (
          <img
            src={verifiedIcon}
            className='w-6 h-6 absolute top-63px left-12'
          />
        )}
        <div className='flex flex-col justify-between w-111px'>
          <h5 className='text-gray-1a font-semibold truncate'>{name}</h5>
          <h6 className='text-gray-a0 text-12px pb-3'>{followers} followers</h6>

          <button
            className={cn('rounded-3xl border py-3px px-3 w-max font-medium', {
              'border-blue-3f text-blue-3f': !followedByUser,
              'border-button-text text-button-text': followedByUser,
            })}
          >
            {followedByUser ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
