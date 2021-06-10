import cn from 'classnames'
import { Link } from 'react-router-dom'
import React from 'react'

type TLinkSectionProps = {
  to: string
  children: React.ReactNode
  absolute?: boolean
  gradient?: boolean
}

export default function LinkSection({
  to,
  children,
  absolute,
  gradient,
}: TLinkSectionProps): JSX.Element {
  return (
    <div
      className={cn('pt-22px pb-6 text-center rounded-b-md leading-none', {
        'absolute left-0 bottom-0 right-0': absolute,
        'bg-gradient-to-b from-transparent via-white to-white': gradient,
      })}
    >
      <Link
        to={to}
        className='text-blue-3f text-xs font-extrabold inline-block h-3'
      >
        {children}
      </Link>
    </div>
  )
}
