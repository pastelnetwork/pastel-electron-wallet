import * as React from 'react'
import * as Styles from './Icon.styles'

export interface IIconProps {
  variant?: string
  src: string
  [x: string]: React.ReactNode | string | undefined
}

const Icon: React.FC<IIconProps> = ({
  variant = 'default',
  src,
  ...restProps
}) => (
  <Styles.IconContainer $variant={variant}>
    <Styles.Image {...restProps} src={src} />
    {variant === 'noti' && <Styles.NotificationBadge />}
  </Styles.IconContainer>
)

export default Icon
