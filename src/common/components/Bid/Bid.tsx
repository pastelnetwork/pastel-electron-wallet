import React from 'react'
import cn from 'classnames'
import Avatar from '../Avatar'
import dayjs from 'dayjs'

export type TBid = {
  avatar: string
  name: string
  bid: string | number
  date: Date
  className?: string
}

const Bid = ({ avatar, name, bid, date, className }: TBid): JSX.Element => {
  const classes = cn('flex flex-wrap', className)

  return (
    <div className={classes}>
      <Avatar avatarSrc={avatar} className='w-10 h-10 mr-2' />
      <div className='flex justify-between flex-wrap items-center flex-1'>
        <div className='mr-3'>
          <h6 className='font-extrabold text-gray-2d'>{name}</h6>
          <span className='text-sm text-gray-71'>
            Bid{' '}
            <span className='text-link font-extrabold font-normal'>{bid}</span>
          </span>
        </div>
        <div className='text-12px leading-5 text-gray-a0'>
          {dayjs(date).format('on DD/MM/YYYY [at] h:m A')}
        </div>
      </div>
    </div>
  )
}

export default Bid
