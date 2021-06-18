import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TAlert = {
  variant: 'success' | 'warning' | 'error'
  children?: string | ReactNode
  className?: string
}

const classes = {
  success: 'border-success bg-success-background',
  warning: 'border-warning bg-warning-background',
  error: 'border-error bg-error-background',
}

const Alert: React.FC<TAlert> = ({ variant, className, children }) => {
  return (
    <div
      className={cn(
        'border-l-4 px-4 py-3 rounded',
        classes[variant],
        className,
      )}
    >
      <p className={`text-${variant}`}>{children}</p>
    </div>
  )
}

Alert.defaultProps = {
  variant: 'success',
}

export default Alert
