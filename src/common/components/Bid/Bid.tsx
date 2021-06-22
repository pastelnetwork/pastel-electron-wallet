import React from 'react'
import cn from 'classnames'
import Avatar from '../Avatar'

export type TBid = {
  avatar: string
  name: string
  bid: string | number
  date: string
  className?: string
}

const Bid = ({ avatar, name, bid, date, className }: TBid): JSX.Element => {
  const classes = cn('flex flex-wrap', className)

  return (
    <div className={classes}>
      <Avatar avatarSrc={avatar} className='w-10 h-10 mr-2' />
      <div className='flex justify-between flex-wrap items-end flex-1'>
        <div className='mr-3'>
          <h6 className='font-extrabold'>{name}</h6>
          <span className='text-14px'>
            Bid <span className='text-link font-extrabold'>{bid}</span>
          </span>
        </div>
        <span className='text-12px leading-5 text-gray-a6'>at {date}</span>
      </div>
    </div>
  )
}

export default Bid
