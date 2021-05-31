import * as React from 'react'

import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../../common/theme/colors'

import successImage from '../../../common/assets/images/registration-successful.png'
import * as Styles from './registrationSuccessful.styles'

const RegistrationSuccessful: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Image src={successImage} />
      <Styles.TitleContainer>
        <Typography variant='h1'>Registration successful</Typography>
        <Typography variant='body2' color={colors.text.secondary}>
          Welcome to Pastel Network
        </Typography>
      </Styles.TitleContainer>
    </Styles.Container>
  )
}

export default RegistrationSuccessful
