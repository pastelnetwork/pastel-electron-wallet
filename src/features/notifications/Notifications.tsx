import React from 'react'
import cn from 'classnames'
import dayjs, { Dayjs } from 'dayjs'

import Notification from '../dashboard/Notification'
import styles from './Notifications.module.css'

type TNotificationsProps = {
  isOpen: boolean
}

type TNotification = {
  message: string
  date: Dayjs
  read: boolean
}

export default function Notifications({
  isOpen,
}: TNotificationsProps): JSX.Element {
  return (
    <div
      className={cn(
        !isOpen && 'hidden',
        'ml-2 w-371px absolute top-38px transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div
        className={cn(
          'absolute -top-8 left-208px transform -translate-x-2/4 translate-y-full w-0 h-0 z-10',
          styles.triangle,
        )}
      />
      <div className='max-h-526px overflow-auto z-50 pt-8 bg-white relative z'>
        <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
          <div className='font-black text-lg text-gray-2d'>
            Latest Notifications
          </div>
          <div className='font-extrabold text-gray-71 text-sm'>1 unread</div>
        </div>
        <div
          className={
            notifications.length > 0
              ? 'pl-8 pr-3.5 mr-18px overflow-y-auto h-full md:h-[258px]'
              : 'flex justify-center'
          }
        >
          {notifications.map((notification, i) => (
            <Notification key={i} {...notification} className='h-[52px]' />
          ))}
          {notifications.length === 0 && (
            <div className='text-gray-71 text-base mt-[86px]'>
              You have no Notifications
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const date = dayjs('2021-04-04')
let notifications: Array<TNotification> = [
  {
    message: '1 new listing',
    date,
    read: false,
  },
  {
    message: '1 new sale',
    date,
    read: true,
  },
  {
    message: '1 new transfer',
    date,
    read: true,
  },
  {
    message: '1 new sale',
    date,
    read: true,
  },
]
notifications = [...notifications, ...notifications, ...notifications]
