import * as React from 'react'

import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../theme/colors'

import * as Styles from './Tooltip.styles'

interface TooltipProps {
  content: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <Styles.Container>
      {children}
      <Styles.Content>
        <Typography variant='body3' color={colors.text.gray700}>
          {content}
        </Typography>
      </Styles.Content>
    </Styles.Container>
  )
}

export default Tooltip
