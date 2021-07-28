import React from 'react'
import cn from 'classnames'

export type TNotification = {
  type: string
  title: string
  status: 'read' | 'unread'
}

const Notification = ({ type, title, status }: TNotification): JSX.Element => {
  const classes = cn(
    'relative flex align-center rounded-lg px-5 py-3 cursor-pointer grid grid-cols-12',
    status === 'read' && 'bg-gray-f3',
    status === 'unread' && 'border border-gray-cd',
  )

  return (
    <div className={classes}>
      {status === 'unread' && (
        <span className='absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-blue-3f'></span>
      )}
      <span
        className={cn(
          'font-medium text-h5 col-span-2',
          status === 'unread' ? 'text-gray-71' : 'text-gray-a0',
        )}
      >
        {type}
      </span>
      <p
        className={cn(
          'text-h5 col-span-10',
          status === 'unread'
            ? 'font-extrabold text-gray-2d'
            : 'font-medium text-gray-4a',
        )}
      >
        {title}
      </p>
    </div>
  )
}

export default Notification
