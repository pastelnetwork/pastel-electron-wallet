import React from 'react'

import error from '../../../../common/assets/icons/ico-error.svg'

export default function RestoreError(): JSX.Element {
  return (
    <div className='text-center'>
      <div>
        <img
          src={error}
          alt='Restore failed'
          className='w-54px h-54px mx-auto'
        />
      </div>
      <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
        Restore failed!
      </div>
    </div>
  )
}
