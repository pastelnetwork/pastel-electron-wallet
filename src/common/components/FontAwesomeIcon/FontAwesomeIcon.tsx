import React from 'react'

import * as Styles from './FontAwesomeIcon.styles'

type TFontAwesomeIconProps = {
  className: string
  color: string
  size: number
}

const FontAwesomeIcon: React.FC<TFontAwesomeIconProps> = ({
  className,
  color,
  size,
}) => {
  return (
    <Styles.Icon className={className} color={color} size={size}></Styles.Icon>
  )
}

export default FontAwesomeIcon
