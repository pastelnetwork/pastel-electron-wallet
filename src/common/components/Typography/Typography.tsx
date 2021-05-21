import * as React from 'react'

import { typography } from '../../theme/typography'
import * as Styles from './Typography.styles'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'body3'
type TypographyWeight = 400 | 500 | 800

export interface TypographyProps {
  children: string
  variant?: TypographyVariant
  weight?: TypographyWeight
  uppercase?: boolean
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  weight = 400,
  uppercase = false,
}) => (
  <Styles.Typography
    size={typography[variant].size}
    lineHeight={typography[variant].lineHeight}
    weight={weight}
    uppercase={uppercase}
  >
    {children}
  </Styles.Typography>
)

export default Typography
