import React from 'react'

import ChangePassword from './changePassword/Password'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'

type TSecurity = {
  info?: {
    currencyName: string
  }
}

const MySecurity = (props: TSecurity): JSX.Element => {
  const { info } = props

  return (
    <div className='w-full flex justify-center py-30px px-60px bg-background-main'>
      <div className='grid grid-cols-3 gap-5 min-h-672px'>
        <ChangePassword />
        <QRCode />
        <CryptoKey currencyName={info?.currencyName} />
      </div>
    </div>
  )
}

export default MySecurity
