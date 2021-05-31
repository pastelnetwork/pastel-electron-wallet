import * as React from 'react'
import QRCode from 'qrcode.react'

import Button from '../../../../common/components/Button/Button'
import Typography from '../../../../common/components/Typography/Typography'
import { colors } from '../../../../common/theme/colors'
import * as Styles from './QRCode.style'
import { DescriptionContainer, BodyContainer } from '../MySecurity.style'

const downloadQR = () => {
  const canvas = document.getElementById('qrcode') as HTMLCanvasElement

  const pngUrl = canvas
    ?.toDataURL('image/png')
    .replace('image/png', 'image/octet-stream')
  const downloadLink = document.createElement('a')
  downloadLink.href = pngUrl
  downloadLink.download = 'qrcode.png'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

const QR: React.FC = () => {
  return (
    <>
      <Typography variant='h3' weight={800} lineHeight={40}>
        Make a photo of QR-code
      </Typography>
      <DescriptionContainer>
        <Typography
          color={colors.text.secondary}
          lineHeight={26}
          variant='body2'
          weight={500}
        >
          Take a photo of this with your smartphone to use as a backup in case
          you forget your password
        </Typography>
      </DescriptionContainer>
      <BodyContainer>
        <Styles.QrBackground>
          <Styles.QrContainer>
            <QRCode id='qrcode' value='https://explorer.pastel.network/' />
          </Styles.QrContainer>
        </Styles.QrBackground>
      </BodyContainer>
      <Button
        variant='transparent'
        style={{ width: '100%' }}
        onClick={downloadQR}
      >
        Download QR-code
      </Button>
    </>
  )
}

export default QR
