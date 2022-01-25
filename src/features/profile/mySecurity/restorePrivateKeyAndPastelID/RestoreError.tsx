import React from 'react'

import { translate } from 'features/app/translations'

import error from '../../../../common/assets/icons/ico-error.svg'

export default function RestoreError(): JSX.Element {
  return (
    <div className='text-center'>
      <div>
        <img
          src={error}
          alt={translate('restoreFailed')}
          className='w-54px h-54px mx-auto'
        />
      </div>
      <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
        {translate('restoreFailed')}!
      </div>
    </div>
  )
}
