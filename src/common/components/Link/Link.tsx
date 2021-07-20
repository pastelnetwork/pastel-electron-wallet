import React, { ReactNode } from 'react'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

export type TLink = {
  children?: string | ReactNode
  className?: string
  href?: string
  variant?: string
  useATag?: boolean
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Link = ({
  href,
  className,
  children,
  variant,
  useATag,
  ...otherProps
}: TLink): JSX.Element => {
  const classes = cn(
    {
      'link focus:outline-none hover:text-link-hover active:text-link-active transition duration-300': true,
      'cursor-pointer': !href,
      [`text-${variant}`]: variant,
    },
    className,
  )

  if (href) {
    if (useATag) {
      return (
        <a href={href} className={classes} {...otherProps}>
          {children}
        </a>
      )
    }

    return (
      <RouterLink to={href} className={classes} {...otherProps}>
        {children}
      </RouterLink>
    )
  }

  return (
    <button className={classes} {...otherProps}>
      {children}
    </button>
  )
}

export default Link
