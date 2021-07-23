import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TButton = {
  children?: ReactNode | string
  variant?: 'default' | 'secondary' | 'transparent' | 'navigation'
  disabled?: boolean
  disabledBule?: boolean
  href?: string
  className?: string
  prepend?: ReactNode
  append?: ReactNode
  type?: 'button' | 'submit'
  width?: number
  secondary?: true
  childrenClassName?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Button = ({
  children,
  secondary,
  variant = secondary ? 'secondary' : 'default',
  href,
  disabled,
  prepend,
  append,
  type,
  className,
  childrenClassName,
  ...otherProps
}: TButton): JSX.Element => {
  const Tag = href ? 'a' : 'button'

  const classes = cn(
    {
      'button flex items-center px-2 h-10 justify-center rounded-2xl transition duration-300 focus:outline-none active:shadow-none focus:shadow-btnOutline max-w-full leading-none': true,
      'bg-button hover:bg-button-hover active:bg-button-pressed text-white':
        variant === 'default' && !disabled,
      'bg-blue-9b text-white cursor-not-allowed':
        variant === 'default' && disabled,
      'border border-button hover:bg-button-hover-secondary hover:text-button-hover active:bg-button-pressed-secondary active:text-button-pressed text-button text-button':
        variant === 'secondary' && !disabled,
      'border border-blue-9b cursor-not-allowed bg-button-hover-secondary text-blue-9b':
        variant === 'secondary' && disabled,
      'bg-white hover:bg-button-hover-secondary hover:text-button-hover active:bg-button-pressed-secondary active:text-button-pressed text-button':
        variant === 'transparent' && !disabled,
      'bg-white text-button-text cursor-not-allowed':
        variant === 'transparent' && disabled,
    },
    className,
  )

  const navButtonClasses = cn({
    'w-10 h-10 flex items-center justify-center bg-gray-f8 rounded-full focus:outline-none': true,
  })

  return (
    <>
      {variant === 'navigation' ? (
        <button className={navButtonClasses} {...otherProps}>
          {children}
        </button>
      ) : (
        <Tag
          type={type}
          className={classes}
          disabled={disabled}
          {...otherProps}
        >
          {prepend && <span className='pr-2'>{prepend}</span>}
          <span className={cn(childrenClassName)}>{children}</span>
          {append && <span className='pl-2'>{append}</span>}
        </Tag>
      )}
    </>
  )
}

export default Button
