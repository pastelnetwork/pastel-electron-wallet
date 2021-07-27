import React, { ReactNode, useState } from 'react'
import cn from 'classnames'

export type TAlert = {
  variant: 'success' | 'warning' | 'error'
  children?: string | ReactNode
  className?: string
  onShowing?: boolean
  showClose?: boolean
}
const classesByCase = {
  success: 'border-success bg-success-background',
  warning: 'border-warning bg-warning-background',
  error: 'border-error bg-error-background',
}
const Alert = ({
  variant,
  className,
  children,
  onShowing = true,
  showClose = false,
}: TAlert): JSX.Element => {
  const [isShowing, setIsShowing] = useState<boolean>(onShowing)
  const classes = cn(
    'border-l-4 px-4 py-3 rounded',
    classesByCase[variant],
    className,
  )
  if (isShowing) {
    return (
      <div className={classes}>
        <div className={`text-${variant}`}>
          {children}
          {showClose && (
            <span
              className='absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer'
              onClick={() => setIsShowing(false)}
            >
              <svg
                className={`fill-current h-6 w-6 text-${variant}`}
                role='button'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <title>Close</title>
                <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
              </svg>
            </span>
          )}
        </div>
      </div>
    )
  }
  return <></>
}

Alert.defaultProps = {
  variant: 'success',
}

export default Alert
