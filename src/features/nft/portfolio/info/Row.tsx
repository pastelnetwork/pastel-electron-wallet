import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

type TRowProps = {
  title: string
  children: React.ReactNode
  link?: string
  className?: string
}

export default function Row({
  title,
  children,
  link,
  className,
}: TRowProps): JSX.Element {
  return (
    <div className='flex items-center text-sm font-extrabold'>
      <div className='text-gray-a0 w-20 font-medium text-sm'>{title}:</div>
      {link && (
        <Link to={link} className='link'>
          <div className={cn('flex items-center', className)}>{children}</div>
        </Link>
      )}
      {!link && <div className='text-gray-2d'>{children}</div>}
    </div>
  )
}
