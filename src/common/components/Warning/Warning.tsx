import React from 'react'
import cn from 'classnames'

export type TWarningProps = {
  className: string
  children: React.ReactNode
}

const Warning = ({ children, className }: TWarningProps): JSX.Element => {
  return (
    <div className={cn('w-full bg-red-fe flex justify-center', className)}>
      {children}
    </div>
  )
}

export default Warning
