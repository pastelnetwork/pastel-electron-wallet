import React from 'react'
import StarRate from './StarRate'
import svg_card from '../../common/assets/icons/card.svg'
import svg_avatar from '../../common/assets/icons/avatar.svg'
import svg_copy from '../../common/assets/icons/copy.svg'
import svg_plus from '../../common/assets/icons/plus_white.svg'
import svg_envelope from '../../common/assets/icons/envelope.svg'
import svg_location from '../../common/assets/icons/location.svg'
import svg_flag from '../../common/assets/icons/flag.svg'
import svg_facebook from '../../common/assets/icons/facebook.svg'
import svg_twitter from '../../common/assets/icons/twitter.svg'

const ProfileCard = (): JSX.Element => {
  return (
    <div className='flex flex-col pb-4 rounded-md shadow-sm bg-white w-315px'>
      <div className='bg-blue-300 h-32 rounded-t-md'>
        <img src={svg_card} />
      </div>
      <div className='-mt-8 px-4 flex'>
        <div className='rounded-full border-4 border-white bg-pink-200 w-24 h-24'>
          <img src={svg_avatar} className='rounded-full' />
        </div>
        <div className='mt-12 pl-3 text-sm'>
          <div className='px-1 pt-1 text-gray-71'>@zndrson</div>
          <div className='px-1 pt-2 text-blue-3f flex'>
            {truncateMiddle('0xc4c16a645aaaa4123b21a', 11, 4, '...')}
            <img
              src={svg_copy}
              className='pl-10px cursor-pointer filter hover:contrast-200'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col px-5'>
        <div className='text-xs text-gray-71 pt-2'>
          <div className='flex items-center'>
            <StarRate />
            <div className='pl-1 text-gray-71'>4.89 reputation</div>
          </div>
        </div>
        <div className='font-bold text-2xl py-2'>Katy Jaison</div>
        <div className='text-sm text-gray-71 py-1'>
          Cosmic Perspective: Galactic Arch
        </div>
        <div className='text-sm text-gray-4a flex'>
          <img
            src={svg_location}
            className='cursor-pointer pr-14px filter hover:contrast-200'
          />
          New York, US
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
        <div className='cursor-pointer text-xs text-blue-3f pt-2 flex items-center justify-center filter hover:contrast-200'>
          <img src={svg_flag} className='mr-2 mt-1' />
          report
        </div>
      </div>
    </div>
  )
}

function truncateMiddle(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr: string,
) {
  if (str === null) {
    return ''
  }
  const strLen = str.length
  // Setting default values
  frontLen = ~~frontLen // will cast to integer
  backLen = ~~backLen
  truncateStr = truncateStr || '&hellip;'
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  }
  return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
}

export default ProfileCard