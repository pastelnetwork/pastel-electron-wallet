import * as React from 'react'

import * as Styles from './Button.styles'

export interface IButtonProps {
  variant?: 'default' | 'transparent'
  type?: 'submit' | 'button'
}

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'default',
  type = 'button',
  ...restProps
}) => (
  <Styles.Button type={type} $variant={variant} {...restProps}>
    {children}
  </Styles.Button>
)

export default Button
