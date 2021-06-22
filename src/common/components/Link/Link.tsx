import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TLink = {
  children?: string | ReactNode
  className?: string
  href?: string
  variant?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Link = ({
  href,
  className,
  children,
  variant,
  ...otherProps
}: TLink): JSX.Element => {
  const Tag = href ? 'a' : 'button'

  const classes = cn(
    {
      'link focus:outline-none hover:text-button-hover active:text-button-active transition duration-300': true,
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
