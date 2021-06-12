import React from 'react'
import { Link } from 'react-router-dom'

type TRowProps = {
  title: string
  children: React.ReactNode
  link?: string
}

export default function Row({ title, children, link }: TRowProps): JSX.Element {
  return (
    <div className='flex items-center text-sm font-extrabold'>
      <div className='text-gray-a0 w-20'>{title}:</div>
      {link && (
        <Link to={link} className='link'>
          {children}
        </Link>
      )}
      {!link && <div className='text-gray-2d'>{children}</div>}
    </div>
  )
}
