import React from 'react'
import verifiedIcon from '../../common/assets/images/verified-icon.svg'

export type TMemberCard = {
  avatar: string
  name: string
  followers: number | string
  role?: string
  isVerified: boolean
}

const MemberCard: React.FC<TMemberCard> = props => {
  const { avatar, name, followers, isVerified } = props
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
          <h5 className='text-gray-1a font-semibold whitespace-nowrap truncate'>
            {name}
          </h5>
          <h6 className='text-gray-a0 text-12 pb-3'>{followers} followers</h6>

          <button className='rounded-3xl border-blue-450 text-blue-450 border py-3px px-3 w-max font-medium'>
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
