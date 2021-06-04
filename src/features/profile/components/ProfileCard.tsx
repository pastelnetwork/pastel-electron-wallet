import React from 'react'
import StarRate from './StarRate'
import svg_card from '../../../common/assets/icons/card.svg'
import svg_avatar from '../../../common/assets/icons/avatar.svg'
import svg_copy from '../../../common/assets/icons/copy.svg'
import svg_plus from '../../../common/assets/icons/plus_white.svg'
import svg_envelope from '../../../common/assets/icons/envelope.svg'
import svg_location from '../../../common/assets/icons/location.svg'
import svg_flag from '../../../common/assets/icons/flag.svg'
import svg_facebook from '../../../common/assets/icons/facebook.svg'
import svg_twitter from '../../../common/assets/icons/twitter.svg'

export type ProfileCardProps = {
  isMyProfile: boolean
  username: string
  walletId: string
  reputation: number
  name: string
  description: string
  address: string
  social: {
    facebook: string
    twitter: string
  }
}

const ProfileCard = ({
  isMyProfile,
  username,
  walletId,
  reputation,
  name,
  description,
  address,
}: ProfileCardProps): JSX.Element => {
  return (
    <div className='flex flex-col pb-8 rounded-md shadow-sm bg-white w-315px'>
      <div className='bg-blue-300 h-32 rounded-t-md'>
        <img src={svg_card} />
      </div>
      <div className='-mt-8 px-5 flex pb-2'>
        <div className='rounded-full border-5px border-white bg-pink-200 w-110px h-110px shadow-xs'>
          <img src={svg_avatar} className='rounded-full' />
        </div>
        <div className='mt-12 pl-10px text-sm'>
          <div className='px-1 pt-1 text-gray-71'>{username}</div>
          <div className='px-1 pt-2 text-blue-3f flex'>
            <div className='underline'>
              {truncateMiddle(walletId, 11, 4, '...')}
            </div>
            <img
              src={svg_copy}
              className='pl-10px cursor-pointer filter hover:contrast-200'
            />
          </div>
        </div>
      </div>
      {isMyProfile && (
        <div className='flex flex-col px-5'>
          <div className='text-xs text-gray-71 pt-6'>
            <div className='flex items-center'>
              <StarRate rate={reputation} />
              <div className='pl-1 text-gray-71'>{reputation} reputation</div>
            </div>
          </div>
          <div className='font-bold text-26 py-2'>{name}</div>
          <div className='text-sm text-gray-71 py-1'>{description}</div>
          <div className='text-sm text-gray-4a flex pt-2'>
            <img
              src={svg_location}
              className='cursor-pointer pr-14px filter hover:contrast-200'
            />
            {address}
          </div>
          <div className='py-4 flex'>
            <img
              src={svg_facebook}
              className='cursor-pointer mr-3 filter hover:contrast-200'
            />
            <img
              src={svg_twitter}
              className='cursor-pointer filter hover:contrast-200'
            />
          </div>
          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-4 h-10 bg-blue-3f text-white hover:bg-blue-500'>
            <img src={svg_plus} className='mr-9px' />
            Follow
          </div>
          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-2 h-10 text-blue-3f border-blue-3f hover:border-blue-600'>
            <img src={svg_envelope} className='mr-9px' />
            Message
          </div>
          <div className='cursor-pointer text-xs text-blue-3f pt-3 flex items-center justify-center filter hover:contrast-200'>
            <img src={svg_flag} className='mr-2 mt-1' />
            report
          </div>
        </div>
      )}
    </div>
  )
}

function truncateMiddle(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr = '&hellip;',
) {
  // Setting default values
  frontLen = Math.floor(frontLen)
  backLen = Math.floor(backLen)
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= str.length ||
    backLen >= str.length ||
    frontLen + backLen >= str.length
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  }
  return str.slice(0, frontLen) + truncateStr + str.slice(str.length - backLen)
}

export default ProfileCard
