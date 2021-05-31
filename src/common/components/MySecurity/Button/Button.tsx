import React from 'react'

import * as Styles from './Button.style'

interface ButtonProps {
  type?: 'submit' | 'button'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  ...restProps
}) => {
  return (
    <Styles.Button type={type} {...restProps} onClick={onClick}>
      {children}
    </Styles.Button>
  )
}

export default Button
