import React, { useCallback } from 'react'

import { translate } from 'features/app/translations'

export type TResultShearchProps = {
  name: string
  image?: string
  followers?: number
  handleClick?: (param: string) => void
}

function ResultSearchRow({
  name,
  image,
  followers,
  handleClick,
}: TResultShearchProps): JSX.Element {
  const onClick = useCallback(() => {
    if (handleClick) {
      handleClick(name)
    }
  }, [name])

  return (
    <button
      className='cursor-pointer flex items-center mb-4 justify-between'
      onClick={onClick}
      type='button'
    >
      <div className='flex items-center'>
        {image && (
          <img
            src={image}
            className='w-[34px] h-[34px] rounded-full mr-5'
            alt={name}
          />
        )}
        <div className='text-base font-black text-gray-23'>{name}</div>
      </div>
      <div className='text-gray-a0 text-sm font-medium pr-[42px]'>
        {followers} {translate('followers')}followers
      </div>
    </button>
  )
}

export default ResultSearchRow
