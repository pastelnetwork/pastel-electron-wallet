import * as React from 'react'

import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../theme/colors'

import * as Styles from './Tooltip.styles'

interface TooltipProps {
  content: string
  variant?: 'top' | 'left' | 'right' | 'bottom'
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  variant = 'top',
}) => {
  return (
    <Styles.Container>
      {children}
      <Styles.Content $variant={variant}>
        <Typography variant='body3' color={colors.custom.white}>
          {content}
        </Typography>
      </Styles.Content>
    </Styles.Container>
  )
}

export default Tooltip
