import React from 'react'
import StarRate from './StarRate'
import svg_card from '../../../common/assets/images/profile-card-placeholder.svg'
import svg_avatar from '../../../common/assets/images/avatar.svg'
import svg_copy from '../../../common/assets/icons/ico-copy2.svg'
import svg_plus from '../../../common/assets/icons/ico-plus-white.svg'
import svg_envelope from '../../../common/assets/icons/ico-envelope.svg'
import svg_location from '../../../common/assets/icons/ico-location.svg'
import svg_flag from '../../../common/assets/icons/ico-flag.svg'
import svg_facebook from '../../../common/assets/icons/ico-facebook.svg'
import svg_twitter from '../../../common/assets/icons/ico-twitter.svg'

export type TProfileCard = {
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
}: TProfileCard): JSX.Element => {
  return (
    <div className='flex flex-col pb-28px rounded-md shadow-sm bg-white w-315px'>
      <div className='bg-blue-300 rounded-t-md'>
        <img className='rounded-t-lg w-315px' src={svg_card} />
      </div>
      <div className='-mt-50px px-5 flex pb-2'>
        <div className='rounded-full border-5px border-white bg-pink-200 w-110px h-110px shadow-xs'>
          <img src={svg_avatar} className='rounded-full w-full h-full' />
        </div>
        <div className='mt-54px pl-10px'>
          <div className='px-1 pt-1 text-gray-71  text-base'>{username}</div>
          <div className='px-1 pt-2 text-blue-3f flex text-sm'>
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
          <div className='text-xs text-gray-71 pt-5'>
            <div className='flex items-center'>
              <StarRate rate={reputation} />
              <div className='pl-6px text-gray-71'>{reputation} reputation</div>
            </div>
          </div>
          <div className='font-bold text-26px pt-7px pb-2'>{name}</div>
          <div className='text-sm text-gray-71'>{description}</div>
          <div className='text-sm text-gray-4a flex pt-3'>
            <img
              src={svg_location}
              className='cursor-pointer pr-2 filter hover:contrast-200'
            />
            {address}
          </div>
          <div className='pt-15px flex'>
            <img
              src={svg_facebook}
              className='cursor-pointer mr-3 filter hover:contrast-200'
            />
            <img
              src={svg_twitter}
              className='cursor-pointer filter hover:contrast-200'
            />
          </div>
          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-30px h-10 bg-blue-3f text-white hover:bg-blue-500'>
            <img src={svg_plus} className='mr-9px' />
            Follow
          </div>
          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-10px h-10 text-blue-3f border-blue-3f hover:border-blue-600'>
            <img src={svg_envelope} className='mr-9px' />
            Message
          </div>
          <div className='cursor-pointer text-sm text-blue-3f pt-3 flex items-center justify-center filter hover:contrast-200'>
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
