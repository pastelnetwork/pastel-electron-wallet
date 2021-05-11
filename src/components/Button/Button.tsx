import * as React from 'react'

import * as Styles from './Button.styles'

interface IButtonProps {
  variant?: 'default' | 'transparent'
}

const Button: React.FC<IButtonProps> = ({ children, variant = 'default' }) => (
  <Styles.Button $variant={variant}>{children}</Styles.Button>
)

export default Button
