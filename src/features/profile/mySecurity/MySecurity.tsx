import * as React from 'react'

import ChangePassword from './changePassword/ChangePassword'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'
import * as Styles from './MySecurity.style'

const MySecurity: React.FC = () => {
  return (
    <Styles.MySecurityContainer>
      <Styles.CardContainer>
        <Styles.Card>
          <ChangePassword />
        </Styles.Card>
        <Styles.Card>
          <QRCode />
        </Styles.Card>
        <Styles.Card>
          <CryptoKey />
        </Styles.Card>
      </Styles.CardContainer>
    </Styles.MySecurityContainer>
  )
}

export default MySecurity
