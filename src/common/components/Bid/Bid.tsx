import React from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'

import { translate } from 'features/app/translations'
import Avatar from '../Avatar'

export type TBid = {
  avatar: string
  name: string
  bid: string | number
  date: Date
  className?: string
}

function Bid({ avatar, name, bid, date, className }: TBid): JSX.Element {
  const classes = cn('flex flex-wrap', className)
  const renderBidNumber = () => (
    <span className='text-sm text-gray-71'>
      {translate('bid')} <span className='text-link font-normal'>{bid}</span>
    </span>
  )

  const renderBidInfo = () => (
    <div className='flex justify-between flex-wrap items-center flex-1'>
      <div className='mr-3'>
        <h6 className='font-extrabold text-gray-2d'>{name}</h6>
        {renderBidNumber()}
      </div>
      <div className='text-12px leading-5 text-gray-a0'>
        {dayjs(date).format('on DD/MM/YYYY [at] h:m A')}
      </div>
    </div>
  )

  return (
    <div className={classes}>
      <Avatar avatarSrc={avatar} className='w-10 h-10 mr-2' />
      {renderBidInfo()}
    </div>
  )
}

export default Bid
