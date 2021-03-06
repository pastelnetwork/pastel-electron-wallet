import React, { ReactNode } from 'react'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

export type TLink = {
  children?: string | ReactNode
  className?: string
  to?: string
  variant?: string
  useATag?: boolean
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

function Link({
  to,
  className,
  children,
  variant,
  useATag,
  ...otherProps
}: TLink): JSX.Element {
  const strVariant: string = variant || ''
  const classes = cn(
    {
      'link focus:outline-none hover:text-link-hover active:text-link-active transition duration-300': true,
      'cursor-pointer': !to,
      [`text-${strVariant}`]: variant,
    },
    className,
  )

  if (to) {
    if (useATag) {
      return (
        <a href={to} className={classes} {...otherProps}>
          {children}
        </a>
      )
    }

    return (
      <RouterLink to={to} className={classes} {...otherProps}>
        {children}
      </RouterLink>
    )
  }

  return (
    <button className={classes} {...otherProps} type='button'>
      {children}
    </button>
  )
}

export default Link
