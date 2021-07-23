import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TIconButton = {
  className?: string
  type?: 'border' | 'shadow'
  children: ReactNode | null
  hoverColor?: string
  activeColor?: string
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

export const IconButton = ({
  children,
  className,
  type,
  hoverColor,
  activeColor,
  ...otherProps
}: TIconButton): JSX.Element => {
  const classes = cn(
    {
      'flex items-center justify-center rounded-full transition text-button-text duration-300 focus:outline-none focus:shadow-btnOutline': true,
      'w-12 h-12 border-2 border-blue-3f-text hover:border-gray-300':
        type === 'border',
      'w-11 h-11 bg-white shadow-md': type === 'shadow',
      [`hover:text-${hoverColor}`]: hoverColor,
      [`active:text-${activeColor}`]: activeColor,
    },
    className,
  )

  return (
    <button className={classes} {...otherProps}>
      {React.cloneElement(children as React.ReactElement, {
        className: 'fill-current w-6',
      })}
    </button>
  )
}

IconButton.defaultProps = {
  type: 'border',
}

export default IconButton
