import React, { ReactNode } from 'react'
import cn from 'classnames'

export interface LinkProps {
  children?: string | ReactNode
  className?: string
  href?: string
  variant?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Link: React.FC<LinkProps> = ({
  href,
  className,
  children,
  variant,
  ...otherProps
}) => {
  const Tag = href ? 'a' : 'button'

  const classes = cn(
    {
      'text-button-default focus:outline-none hover:text-button-hover active:text-button-active transition duration-300': true,
      'cursor-pointer': !href,
      [`text-${variant}`]: variant,
    },
    className,
  )

  return (
    <Tag href={href} className={classes} {...otherProps}>
      {children}
    </Tag>
  )
}

export default Link
