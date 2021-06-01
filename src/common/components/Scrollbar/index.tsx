import React, { ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cn from 'classnames'
import './styles.css'

export interface ScrollBarProps {
  children?: ReactNode
  maxHeight?: string
  className?: string
  autoHide?: boolean
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
}

const Scrollbar: React.FC<ScrollBarProps> = ({
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