import React from 'react'

import { translate } from 'features/app/translations'
import congratulations from '../../../../common/assets/icons/ico-congratulations.svg'

export default function RestoreSuccess(): JSX.Element {
  return (
    <div className='text-center'>
      <div>
        <img
          src={congratulations}
          alt={translate('congratulations')}
          className='w-54px h-54px mx-auto'
        />
      </div>
      <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
        {translate('congratulations')}!
        <br />
        {translate('yourKeysHaveBeenRestored')}!
      </div>
    </div>
  )
}
