import * as React from 'react'
import QRCode from 'qrcode.react'

import Typography from '../../../../common/components/Typography/Typography'
import { colors } from '../../../../common/theme/colors'

import icoPdf from '../../../../common/assets/icons/ico-pdf.svg'
import icoDownload from '../../../../common/assets/icons/ico-download-2.svg'

import * as Styles from './BackupSteps.styles'

const BackupSteps: React.FC = () => {
  const [isPdfPage, setIsPdfPage] = React.useState(true)

  return (
    <Styles.Container>
      <Styles.SwitcherContainer>
        <Styles.SwitchElement
          active={isPdfPage}
          onClick={() => setIsPdfPage(true)}
        >
          Download PDF
        </Styles.SwitchElement>
        <Styles.SwitchElement
          active={!isPdfPage}
          onClick={() => setIsPdfPage(false)}
        >
          QR-code
        </Styles.SwitchElement>
      </Styles.SwitcherContainer>
      <Typography variant='h3' weight={800}>
        Crypto-keys backup method
      </Typography>
      <Typography variant='body3' color={colors.text.secondary}>
        Download PDF file with keys
      </Typography>
      <Styles.ContentContainer>
        {isPdfPage ? (
          <>
            <Styles.PdfContainer>
              <img src={icoPdf} />
              <Styles.PdfDetails>
                <Typography variant='body2'>Crypto-keys</Typography>
                <Typography variant='body3' color={colors.text.secondary}>
                  6mb
                </Typography>
              </Styles.PdfDetails>
            </Styles.PdfContainer>
            <Styles.PdfDownload src={icoDownload} />
          </>
        ) : (
          <Styles.QRContainer>
            <QRCode value='https://explorer.pastel.network/' />
          </Styles.QRContainer>
        )}
      </Styles.ContentContainer>
    </Styles.Container>
  )
}

export default BackupSteps
