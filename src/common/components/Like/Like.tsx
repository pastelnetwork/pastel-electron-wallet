import React from 'react'
import IconHeart from '../../assets/icons/ico-heart.svg'

export type TLike = {
  count: number
}

const Like = ({ count }: TLike): JSX.Element => {
  return (
    <div className='flex items-center'>
      <span className='mr-2'>{count}</span>
      <span className='text-error-pressed'>
        <img src={IconHeart} className='w-4' />
      </span>
    </div>
  )
}

export default Like
