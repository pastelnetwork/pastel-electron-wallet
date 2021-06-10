import React from 'react'
import { TNFT } from 'features/nft/Nft.types'
import { useToggle } from 'react-use'
import cn from 'classnames'
import style from 'features/nft/portfolio/description/Description.module.css'

type TDescriptionProps = {
  nft: TNFT
}

export default function Description({ nft }: TDescriptionProps): JSX.Element {
  const [showFullText, toggleFullText] = useToggle(false)

  return (
    <div>
      <div className='font-extrabold text-sm text-gray-900'>Description</div>
      <div
        className={cn(
          'my-3 font-medium text-sm text-gray-700',
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
        {showFullText ? 'show less' : 'read more'}
      </button>
    </div>
  )
}
