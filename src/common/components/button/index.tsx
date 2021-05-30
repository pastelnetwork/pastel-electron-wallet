import React, { ReactNode } from 'react'
import cn from 'classnames'
import './styles.css'

export interface ButtonProps {
  children?: ReactNode
  variant?: string
  disabled?: boolean
  withLightning?: boolean
  href?: string
  className?: string
  fluid?: boolean
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  href,
  disabled,
  withLightning,
  fluid,
  className,
  ...otherProps
}) => {
  const Tag = href ? 'a' : 'button'

  const classes = cn(
    'button inline-flex items-center px-2 h-10 justify-center rounded-2xl transition-colors duration-300 focus:outline-none',
    {
      'w-full': fluid,
      'bg-button-default hover:bg-button-hover active:bg-button-pressed':
        variant === 'primary' && !disabled,
      'bg-button-default opacity-50 cursor-not-allowed':
        variant === 'primary' && disabled,
      'border-button-default border hover:border-button-hover active:border-button-pressed':
        variant === 'secondary' && !disabled,
      'border-button-default border opacity-50 cursor-not-allowed':
        variant === 'secondary' && disabled,
    },
    className,
  )

  const textClasses = cn('px-1.5 text-h5 leading-none', {
    'text-white': variant === 'primary',
    'button-secondary-text': variant === 'secondary' && !disabled,
    'text-button-secondary': variant === 'secondary' && disabled,
  })

  const iconClasses = cn({
    'fill-white': variant === 'primary',
    'button-secondary-icon': variant === 'secondary',
  })

  const icon = withLightning && (
    <svg
      className={iconClasses}
      width='10'
      height='16'
      viewBox='0 0 10 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.16667 0.666748L0.5 9.33341H4.5V15.3334L9.16667 6.66675H5.16667V0.666748Z' />
    </svg>
  )

  return (
    <Tag className={classes} disabled={disabled} {...otherProps}>
      {icon}
      <span className={textClasses}>{children}</span>
      {icon}
    </Tag>
  )
}

export default Button
