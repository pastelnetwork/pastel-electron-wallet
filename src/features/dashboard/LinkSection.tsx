import cn from 'classnames'
import React from 'react'

import Link from 'common/components/Link'

type TLinkSectionProps = {
  to: string
  children: React.ReactNode
  absolute?: boolean
  gradient?: boolean
  className?: string
}

export default function LinkSection({
  to,
  children,
  absolute,
  gradient,
  className = 'pt-22px pb-5',
}: TLinkSectionProps): JSX.Element {
  return (
    <div
      className={cn('text-center rounded-b-md leading-none', className, {
        'absolute left-0 bottom-0 right-0': absolute,
        'bg-gradient-to-b from-transparent via-white to-white': gradient,
      })}
    >
      <Link
        href={to}
        className='text-blue-3f text-sm font-medium inline-block h-3'
      >
        {children}
      </Link>
    </div>
  )
}
