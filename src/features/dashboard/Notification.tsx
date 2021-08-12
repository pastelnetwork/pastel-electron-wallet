import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import cn from 'classnames'

export type TNotificationProps = {
  message: string
  date: Dayjs
  read: boolean
  className?: string
}

const now = dayjs()

export default function Notification({
  message,
  date,
  read,
  className,
}: TNotificationProps): JSX.Element {
  const [minute, setMinute] = useState<number>(0)
  const [hour, setHour] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  useEffect(() => {
    const tempDay = now.diff(date, 'day')
    let tempHour = 0
    let tempMinute = 0
    if (tempDay > 0) {
      tempHour = now.diff(date, 'hour') - 24 * tempDay
      if (tempHour > 0) {
        tempMinute = now.diff(date, 'minute') - 60 * now.diff(date, 'hour')
      }
    }
    setDay(tempDay)
    setHour(tempHour)
    setMinute(tempMinute)
  }, [])
  return (
    <div
      className={cn(
        'h-14 rounded-lg flex justify-between items-center pl-5 pr-5 mb-3 relative border border-gray-ec',
        read ? 'bg-gray-f8' : 'bg-white',
        className,
      )}
    >
      <div className='text-base text-gray-2d font-medium'>{message}</div>
      <div className='text-gray-4a text-sm'>
        {day !== 0 && <span>{day}d</span>} {hour !== 0 && <span>{hour}h</span>}{' '}
        {minute !== 0 && <span>{minute}m</span>} <span>ago</span>
      </div>
      {!read && (
        <div className='w-5px h-5px rounded-full bg-blue-3f absolute top-[7px] left-[7px]'></div>
      )}
    </div>
  )
}
