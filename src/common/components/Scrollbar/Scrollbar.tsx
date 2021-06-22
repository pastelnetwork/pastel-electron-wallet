import React, { ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'

export type TScrollbar = {
  maxHeight?: string
  className?: string
  autoHide?: boolean
  children?: ReactNode
  hasPageHeader?: boolean
}

const Scrollbar = ({
  children,
  maxHeight,
  className,
  autoHide = true,
  hasPageHeader,
}: TScrollbar): JSX.Element => {
  const classes = cn({
    'custom-scroll': true,
    ...(typeof className === 'string' ? { [className]: true } : {}),
  })
  const calcMaxHeight = maxHeight
    ? maxHeight
    : hasPageHeader
    ? 'calc(100vh - 186px)'
    : 'calc(100vh - 86px)'

  return (
    <SimpleBar
      className={classes}
      style={{ maxHeight: `${calcMaxHeight}px`, height: calcMaxHeight }}
      autoHide={autoHide}
    >
      {children}
    </SimpleBar>
  )
}

export default Scrollbar
