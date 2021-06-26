import React from 'react'

import congratulations from '../../../../common/assets/icons/ico-congratulations.svg'

export default function RestoreSuccess(): JSX.Element {
  return (
    <div className='text-center'>
      <div>
        <img
          src={congratulations}
          alt='Congratulations'
          className='w-54px h-54px mx-auto'
        />
      </div>
      <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
        Congratulations!
        <br />
        Your keys have been restored!
      </div>
    </div>
  )
}
