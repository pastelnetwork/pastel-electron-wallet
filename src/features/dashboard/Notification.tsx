import Dots from '../../common/components/Icons/Dots'
import React from 'react'
import { Dayjs } from 'dayjs'
import DateTimeWithDot from '../../common/components/Format/DateTimeWithDot/DateTimeWithDot'

export type TNotificationProps = {
  message: string
  date: Dayjs
}

export default function Notification({
  message,
  date,
}: TNotificationProps): JSX.Element {
  return (
    <div className='h-14 border border-gray-e7 rounded-lg flex items-center pl-5 pr-2 mb-3'>
      <div className='text-sm font-extrabold text-gray-4a'>{message}</div>
      <DateTimeWithDot value={date} className='text-xs text-gray-a0 ml-auto' />
      <button type='button' className='ml-5 text-gray-b0 focus-visible'>
        <Dots size={16} vertical />
      </button>
    </div>
  )
}
