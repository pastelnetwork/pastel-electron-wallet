import * as React from 'react'

import Typography from '../../../../common/components/Typography/Typography'
import { colors } from '../../../../common/theme/colors'

import * as Styles from './PromotionSteps.styles'

const PromotionSteps: React.FC = () => {
  return (
    <Styles.Container>
      <Typography variant='h3' weight={800}>
        Airdrop promotion code
      </Typography>
      <Typography variant='body3' color={colors.text.secondary}>
        and copy promotion code
      </Typography>
      <Styles.DownloadContainer>
        <Styles.Container>
          <Typography variant='body2' color={colors.text.gray500}>
            Your promotion code
          </Typography>
        </Styles.Container>
      </Styles.DownloadContainer>
      <Typography variant='body3' color={colors.text.secondary}>
        copy Pastel wallet address
      </Typography>
    </Styles.Container>
  )
}

export default PromotionSteps
