import Dots from '../../common/components/Icons/Dots'
import React from 'react'

export default function Notification({
  message,
}: {
  message: string
}): JSX.Element {
  return (
    <div className='h-14 border border-gray-e7 rounded-lg flex items-center pl-5 pr-2 mb-3'>
      <div className='text-sm font-extrabold text-gray-4a'>{message}</div>
      <div className='text-xs text-gray-a0 ml-auto'>
        04/04/2021
        <span className='mx-1'>·</span>
        16:01
      </div>
      <button type='button' className='ml-5 text-gray-b0 focus-visible'>
        <Dots size={16} vertical />
      </button>
    </div>
  )
}
