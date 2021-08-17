import React from 'react'
import { TNFT } from '../../Nft.types'
import { useToggle } from 'react-use'
import cn from 'classnames'
import style from './Description.module.css'

type TDescriptionProps = {
  nft: TNFT
}

export default function Description({ nft }: TDescriptionProps): JSX.Element {
  const [showFullText, toggleFullText] = useToggle(false)

  return (
    <div>
      <div className='font-extrabold text-sm text-gray-1a'>Description</div>
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
        {showFullText ? 'Show Less' : 'Read More'}
      </button>
    </div>
  )
}
