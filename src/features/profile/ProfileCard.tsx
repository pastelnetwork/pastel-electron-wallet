import React from 'react'
import Rate from 'rc-rate'
import svg_card from '../../legacy/assets/img/card.svg'

const ProfileCard = (): JSX.Element => {
  return (
    <div className='psl-flex psl-flex-col psl-pb-4 psl-rounded-md psl-shadow-sm psl-bg-white psl-w-315px'>
      <div className='psl-bg-blue-300 psl-h-32 psl-rounded-t-md'>
        <img src={svg_card} />
      </div>
      <div className='psl--mt-8 psl-px-4 psl-flex'>
        <div className='psl-rounded-full psl-border-4 psl-border-white psl-bg-pink-200 psl-w-24 psl-h-24'></div>
        <div className='psl-mt-12 psl-pl-3 psl-text-sm'>
          <div className='psl-px-1 psl-text-gray-300'>@zndrson</div>
          <div className='psl-pt-2 psl-text-blue-400'>
            {truncateMiddle('0xc419234152312145', 8, 4, '...')}
            <i className='psl-ml-2 fas fa-clone psl-text-gray-400 psl-cursor-pointer'></i>
          </div>
        </div>
      </div>
      <div className='psl-flex psl-flex-col psl-px-5'>
        <div className='psl-text-xs psl-text-gray-600 psl-pt-2'>
          <div className='psl-flex psl-items-center'>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='psl-pl-1 psl-text-gray-400'>4.89 reputation</div>
          </div>
        </div>
        <div className='psl-font-bold psl-text-2xl psl-py-2'>Katy Jaison</div>
        <div className='psl-text-xs psl-text-gray-600 psl-py-1'>
          Cosmic Perspective: Galactic Arch
        </div>
        <div className='psl-text-xs psl-text-gray-600'>
          <i className='psl-mr-2 fas fa-map-marker-alt'></i>
          New York, US
        </div>
        <div className='psl-py-2 psl-flex'>
          <i className='psl-text-xs psl-w-5 psl-h-5 psl-flex psl-items-center psl-justify-center psl-text-gray-400 psl-border-gray-400 psl-border psl-rounded-full psl-fab psl-fa-facebook psl-mr-2'></i>
          <i className='psl-text-xs psl-w-5 psl-h-5 psl-flex psl-items-center psl-justify-center psl-text-gray-400 psl-border-gray-400 psl-border psl-rounded-full psl-fab psl-fa-twitter'></i>
        </div>
        <div className='psl-cursor-pointer psl-border psl-text-center psl-rounded-2xl psl-flex psl-items-center psl-justify-center psl-mt-4 psl-bg-blue-400 psl-text-white psl-h-10'>
          <i className='psl-mr-2 fas fa-plus'></i>
          Follow
        </div>
        <div className='psl-cursor-pointer psl-border psl-text-center psl-rounded-2xl psl-flex psl-items-center psl-justify-center psl-mt-2 psl-text-blue-400 psl-h-10 psl-border-blue-400'>
          <i className='psl-mr-2 fas fa-envelope'></i>
          Message
        </div>
        <div className='psl-cursor-pointer psl-text-xs psl-text-blue-400 psl-text-center psl-pt-2'>
          <i className='psl-mr-2 fas fa-flag'></i>
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
