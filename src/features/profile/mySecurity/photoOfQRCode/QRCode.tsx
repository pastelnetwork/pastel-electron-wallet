import * as React from 'react'
import QRCode from 'qrcode.react'

import Button from '../../../../common/components/MySecurity/Button/Button'
import {
  Title,
  Description,
} from '../../../../common/components/MySecurity/Typography/Typography'
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
      <Title>Make a photo of QR-code</Title>
      <DescriptionContainer>
        <Description>
          Take a photo of this with your smartphone to use as a backup in case
          you forget your password
        </Description>
      </DescriptionContainer>
      <BodyContainer>
        <Styles.QrBackground>
          <Styles.QrContainer>
            <QRCode id='qrcode' value='https://explorer.pastel.network/' />
          </Styles.QrContainer>
        </Styles.QrBackground>
      </BodyContainer>
      <Button onClick={downloadQR}>Download QR-code</Button>
    </>
  )
}

export default QR
