import React, { ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'
import 'simplebar/src/simplebar.css'

export type TScrollBar = {
  children?: ReactNode
  maxHeight?: number
  className?: string
  autoHide?: boolean
  [x: string]: ReactNode | string | undefined
}

const Scrollbar: React.FC<TScrollBar> = ({
  children,
  maxHeight,
  className,
  autoHide,
  ...otherProps
}) => {
  const classes = cn(
    {
      'custom-scroll': true,
    },
    className,
  )

  return (
    <SimpleBar
      className={classes}
      style={{ maxHeight: `${maxHeight}px` }}
      {...otherProps}
      autoHide={autoHide}
    >
      {children}
    </SimpleBar>
  )
}

Scrollbar.defaultProps = {
  autoHide: true,
}

export default Scrollbar
