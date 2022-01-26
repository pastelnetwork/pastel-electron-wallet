import React from 'react'
import { useToggle } from 'react-use'
import cn from 'classnames'

import { translate } from 'features/app/translations'
import { TNFT } from '../../Nft.types'
import style from './Description.module.css'

type TDescriptionProps = {
  nft: TNFT
}

export default function Description({ nft }: TDescriptionProps): JSX.Element {
  const [showFullText, toggleFullText] = useToggle(false)

  return (
    <div>
      <div className='font-extrabold text-sm text-gray-1a'>
        {translate('description')}
      </div>
      <div
        className={cn(
          'my-3 font-medium text-sm text-gray-4a',
          !showFullText && style.clampText,
        )}
      >
        {nft.description}
      </div>
      <button
        type='button'
        className='block link text-sm font-medium'
        onClick={toggleFullText}
      >
        {showFullText ? translate('showLess') : translate('readMore')}
      </button>
    </div>
  )
}
