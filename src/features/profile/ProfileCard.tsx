import React from 'react'
import styles from './Profile.module.css'
import cx from 'classnames'
import Rate from 'rc-rate'

const ProfileCard = (): JSX.Element => {
  return (
    <div
      className={cx('flex flex-col pb-4 rounded-md shadow-medium', styles.card)}
    >
      <div className='bg-blue-300 h-32 rounded-t-md'></div>
      <div className='-mt-10 px-4 flex'>
        <div className='rounded-full border-4 border-white bg-pink-200 w-24 h-24'></div>
        <div className='mt-11 pl-3 text-sm'>
          <div className='px-1 text-gray-300'>@zndrson</div>
          <div className='pt-2 text-blue-400'>
            {truncateMiddle('0xc419234152312145', 8, 4, '...')}
            <i className='ml-2 fas fa-clone text-gray-400 cursor-pointer'></i>
          </div>
        </div>
      </div>
      <div className='flex flex-col px-5'>
        <div className='text-xs text-gray-600 pt-2'>
          <div className='flex items-center'>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='pl-1 text-gray-400'>4.89 reputation</div>
          </div>
        </div>
        <div className='font-bold text-2xl py-2'>Katy Jaison</div>
        <div className='text-xs text-gray-600 py-1'>
          Cosmic Perspective: Galactic Arch
        </div>
        <div className='text-xs text-gray-600'>
          <i className='mr-2 fas fa-map-marker-alt'></i>
          New York, US
        </div>
        <div className='py-2 flex'>
          <i className='text-xs w-5 h-5 flex items-center justify-center text-gray-400 border-gray-400 border rounded-full fab fa-facebook mr-2'></i>
          <i className='text-xs w-5 h-5 flex items-center justify-center text-gray-400 border-gray-400 border rounded-full fab fa-twitter'></i>
        </div>
        <div className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-4 bg-blue-400 text-white h-10'>
          <i className='mr-2 fas fa-plus'></i>
          Follow
        </div>
        <div className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 text-blue-400 h-10 border-blue-400'>
          <i className='mr-2 fas fa-envelope'></i>
          Message
        </div>
        <div className='cursor-pointer text-xs text-blue-400 text-center pt-2'>
          <i className='mr-2 fas fa-flag'></i>
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
