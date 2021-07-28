import React, { ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'

export type TScrollBar = {
  maxHeight?: number | string
  hasPageHeader?: boolean
  className?: string
  autoHide?: boolean
  [x: string]: ReactNode | string | undefined
}

const Scrollbar = ({
  children,
  maxHeight,
  className,
  autoHide = false,
  hasPageHeader,
  ...otherProps
}: TScrollBar): JSX.Element => {
  const classes = cn(
    {
      'custom-scroll': true,
    },
    className,
  )
  const calcMaxHeight = maxHeight
    ? maxHeight
    : hasPageHeader
    ? 'calc(100vh - 186px)'
    : 'calc(100vh - 86px)'
  return (
    <SimpleBar
      className={classes}
      style={{ maxHeight: `${calcMaxHeight}px`, height: calcMaxHeight }}
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
