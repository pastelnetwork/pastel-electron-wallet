import React from 'react'
import cn from 'classnames'

import { DiamondInHexagon } from 'common/components/Icons/DiamondInHexagon'

export type TMemberCard = {
  avatar: string
  name: string
  followers: number | string
  role?: string
  isVerified: boolean
  followedByUser: boolean
  searchText?: string
}

const MemberCard = ({
  avatar,
  name,
  followers,
  isVerified,
  followedByUser,
  searchText,
}: TMemberCard): JSX.Element => {
  return (
    <div className='px-5 py-7 bg-background-main rounded-2xl overflow-visible h-142px'>
      <div className='flex space-x-4 relative'>
        <img src={avatar} className='w-88px h-88px' />
        {isVerified && (
          <DiamondInHexagon className='w-6 h-6 absolute top-63px left-12 text-blue-3f' />
        )}
        <div className='flex flex-col justify-between w-111px'>
          <h5 className='text-gray-1a font-semibold truncate'>
            {searchText ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: searchText
                    ? name.replace(
                        new RegExp(searchText, 'gi'),
                        match =>
                          `<mark class='bg-yellow-ff py-1'>${match}</mark>`,
                      )
                    : name,
                }}
              ></div>
            ) : (
              name
            )}
          </h5>
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
