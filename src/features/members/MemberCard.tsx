import React from 'react'
import cn from 'classnames'
import parse from 'html-react-parser'

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

function MemberCard({
  avatar,
  name,
  followers,
  isVerified,
  followedByUser,
  searchText,
}: TMemberCard): JSX.Element {
  const renderContent = () => (
    <div className='flex flex-col justify-between w-115px'>
      <h5 className='text-gray-1a font-semibold truncate'>
        {searchText ? (
          <div>
            {parse(
              name.replace(
                new RegExp(searchText, 'gi'),
                (match: string) =>
                  `<mark class='bg-blue-9b py-1'>${match}</mark>`,
              ),
            )}
          </div>
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
        type='button'
      >
        {followedByUser ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )

  return (
    <div className='px-4 py-7 bg-background-main rounded-2xl overflow-visible h-142px'>
      <div className='flex space-x-4 relative'>
        <img src={avatar} className='w-88px h-88px rounded-full' alt='Avatar' />
        {isVerified && (
          <DiamondInHexagon className='w-6 h-6 absolute top-63px left-12 text-blue-3f' />
        )}
        {renderContent()}
      </div>
    </div>
  )
}

export default MemberCard
