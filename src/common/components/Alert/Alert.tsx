import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TAlert = {
  variant: 'success' | 'warning' | 'error'
  children?: string | ReactNode
  className?: string
}

const Alert: React.FC<TAlert> = ({ variant, className, children }) => {
  const classes = cn(
    {
      'border-l-4 px-4 py-3 rounded': true,
      [`border-${variant}`]: variant,
      [`bg-${variant}-background`]: variant,
    },
    className,
  )

  return (
    <div className={classes}>
      <p className={`text-${variant}`}>{children}</p>
    </div>
  )
}

Alert.defaultProps = {
  variant: 'success',
}

export default Alert
