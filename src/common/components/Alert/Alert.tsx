import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TAlert = {
  variant: 'success' | 'warning' | 'error'
  children?: string | ReactNode
  className?: string
}

const classesByCase = {
  success: 'border-success bg-success-background',
  warning: 'border-warning bg-warning-background',
  error: 'border-error bg-error-background',
}

const Alert = ({ variant, className, children }: TAlert): JSX.Element => {
  const classes = cn(
    'border-l-4 px-4 py-3 rounded',
    classesByCase[variant],
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
