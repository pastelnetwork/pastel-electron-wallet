import React from 'react'
import cn from 'classnames'

type TProps = {
  title: string
  className?: string
  children: React.ReactNode
}

const PortfolioColumn = ({
  title,
  children,
  className,
}: TProps): JSX.Element => {
  return (
    <div className={cn('flex-grow md:w-1/3', className)}>
      <div className='h-5 text-gray-71 text-sm font-extrabold mb-3'>
        {title}
      </div>
      {children}
    </div>
  )
}

export default PortfolioColumn
