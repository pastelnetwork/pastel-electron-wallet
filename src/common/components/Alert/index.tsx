import React, { ReactNode } from 'react'

export type AlertProps = {
  variant: 'success' | 'warning' | 'error'
  children?: string | ReactNode
}

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const classes = `bg-${variant}-background border-l-4 border-${variant} px-4 py-3 rounded`

  return (
    <div className={classes}>
      <p className='text-${variant}'>{children}</p>
    </div>
  )
}

Alert.defaultProps = {
  variant: 'success',
}

export default Alert
