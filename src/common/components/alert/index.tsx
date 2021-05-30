import React, { ReactNode } from 'react'
import cn from 'classnames'

interface AlertProps {
  variant: string
  children?: ReactNode
}

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const classes = cn({
    '': true,
    'bg-success-background border-l-4 border-success-default px-4 py-3 rounded':
      variant === 'success',
  })

  return (
    <div className={classes}>
      <p className='text-success-default'>{children}</p>
    </div>
  )
}

Alert.defaultProps = {
  variant: 'success',
}

export default Alert
