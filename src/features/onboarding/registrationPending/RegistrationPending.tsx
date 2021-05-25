import * as React from 'react'
import { Link } from 'react-router-dom'

import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../../common/theme/colors'

import registerImage from '../../../common/assets/images/registration-fee-pending.png'
import Button from '../../../common/components/Button/Button'
import * as ROUTES from '../../../common/utils/constants/routes'
import * as Styles from './RegistrationPending.styles'

const RegistrationPending: React.FC = () => {
  return (
    <Styles.Container>
      <Typography variant='h1'>Registration fee pending</Typography>
      <Styles.TitleContainer>
        <Typography variant='body2' color={colors.text.secondary}>
          It can take 10-30 minutes after you made a payment
        </Typography>
      </Styles.TitleContainer>
      <Styles.Image src={registerImage}></Styles.Image>
      <Link to={ROUTES.REGISTER_SUCCESSFUL}>
        <Button>Check payment status</Button>
      </Link>
    </Styles.Container>
  )
}

export default RegistrationPending
