import React, { ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'

// eslint-disable-next-line
import 'simplebar/src/simplebar.css' //for some reason eslint was not accepting this

export type TScrollBar = {
  maxHeight?: number | string
  hasPageHeader?: boolean
  className?: string
  autoHide?: boolean
  [x: string]: ReactNode | string | undefined
}
const Scrollbar: React.FC<TScrollBar> = ({
  children,
  maxHeight,
  className,
  autoHide = false,
  hasPageHeader,
  ...otherProps
}) => {
  const classes = cn(
    {
      'custom-scroll': true,
    },
    className,
  )
  const calcMaxHeight = maxHeight
    ? maxHeight
    : hasPageHeader
    ? 'calc(100vh - 166px)'
    : 'calc(100vh - 66px)'
  return (
    <SimpleBar
      className={classes}
      style={{ maxHeight: calcMaxHeight }}
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
