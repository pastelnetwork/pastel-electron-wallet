import React, { CSSProperties } from 'react'

import * as Styles from './Button.styles'

export interface IButtonProps {
  variant?: 'default' | 'transparent' | 'navigation'
  type?: 'submit' | 'button'
  style?: CSSProperties
  onClick?: () => void
}

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'default',
  type = 'button',
  onClick,
  ...restProps
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return variant === 'navigation' ? (
    <Styles.NavigationButton onClick={handleClick}>
      {children}
    </Styles.NavigationButton>
  ) : (
    <Styles.Button
      type={type}
      $variant={variant}
      {...restProps}
      onClick={handleClick}
    >
      {children}
    </Styles.Button>
  )
}

export default Button
