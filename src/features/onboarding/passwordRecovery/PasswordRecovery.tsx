import * as React from 'react'
import { useHistory } from 'react-router-dom'
import QRCode from 'qrcode.react'

import Typography from '../../../common/components/Typography/Typography'
import { colors } from '../../../common/theme/colors'
import * as ROUTES from '../../../common/utils/constants/routes'

import * as Styles from './PasswordRecovery.styles'

const PasswordRecovery: React.FC = () => {
  const history = useHistory()

  return (
    <Styles.Container>
      <Typography variant='h3' weight={800}>
        Password recovery
      </Typography>
      <Typography variant='body3' color={colors.text.secondary}>
        Choose your recovery method
      </Typography>
      <Styles.SwitchContainer>
        <Styles.SwitchElement active={true}>QR-code</Styles.SwitchElement>
        <Styles.SwitchElement
          active={false}
          onClick={() => history.push(ROUTES.CRYPTO_KEYS)}
        >
          Crypto-keys
        </Styles.SwitchElement>
      </Styles.SwitchContainer>
      <Styles.QrBackground>
        <Styles.QrContainer>
          <QRCode value='https://explorer.pastel.network/' />
        </Styles.QrContainer>
      </Styles.QrBackground>
      <Styles.List onClick={() => history.push(ROUTES.LOGIN)}>
        <Typography variant='body2' color={colors.button.default}>
          Or try to login again
        </Typography>
      </Styles.List>
    </Styles.Container>
  )
}

export default PasswordRecovery
