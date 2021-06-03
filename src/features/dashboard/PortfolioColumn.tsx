import React from 'react'
import cn from 'classnames'

type TProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export default function PortfolioColumn({
  title,
  children,
  className,
}: TProps): JSX.Element {
  return (
    <div className={cn('flex-grow md:w-1/3 px-6', className)}>
      <div className='h-5 text-gray-71 text-sm font-medium mb-3'>{title}</div>
      {children}
    </div>
  )
}
