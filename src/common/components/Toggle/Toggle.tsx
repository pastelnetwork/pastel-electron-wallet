import React from 'react'

const Toggle: React.FC = () => {
  return (
    <div>
      <label className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input type='checkbox' id='toggleB' className='sr-only' />
          <div className='block bg-gray-57 bg-opacity-10 w-8 h-21px rounded-full'></div>
          <div className='dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition'></div>
        </div>
        <div className='text-sm text-gray-33 ml-3 text-opacity-50'>
          Hide empty accounts
        </div>
      </label>
    </div>
  )
}

export default Toggle
