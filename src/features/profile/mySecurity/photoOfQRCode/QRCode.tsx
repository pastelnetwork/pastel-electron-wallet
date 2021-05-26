import * as React from 'react'
import QRCode from 'qrcode.react'

import Button from '../../../../common/components/Button/Button'
import Typography from '../../../../common/components/Typography/Typography'
import { colors } from '../../../../common/theme/colors'
import * as Styles from './QRCode.style'

const QR: React.FC = () => {
  return (
    <>
      <Typography variant='h3' weight={800} lineHeight={40}>
        Make a photo of QR-code
      </Typography>
      <Styles.DescriptionContainer>
        <Typography
          color={colors.text.secondary}
          lineHeight={26}
          variant='body2'
          weight={500}
        >
          Take a photo of this with your smartphone to use as a backup in case
          you forget your password
        </Typography>
      </Styles.DescriptionContainer>
      <Styles.QRContainer>
        <Styles.QrBackground>
          <Styles.QrContainer>
            <QRCode value='https://explorer.pastel.network/' />
          </Styles.QrContainer>
        </Styles.QrBackground>
      </Styles.QRContainer>
      <Button variant='transparent' style={{ width: '100%' }}>
        Download QR-code
      </Button>
    </>
  )
}

export default QR
