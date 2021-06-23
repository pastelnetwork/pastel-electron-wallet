import React from 'react'

import ChangePassword from './changePassword/Password'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'
import { TRPCConfig } from '../Profile'

type TSecurity = {
  info?: {
    currencyName: string
  }
  rpcConfig: TRPCConfig
}

const MySecurity = (props: TSecurity): JSX.Element => {
  const { info, rpcConfig } = props

  return (
    <div className='w-full flex justify-center py-30px px-60px bg-background-main'>
      <div className='grid grid-cols-3 gap-5 min-h-672px'>
        <ChangePassword />
        <QRCode rpcConfig={rpcConfig} />
        <CryptoKey rpcConfig={rpcConfig} currencyName={info?.currencyName} />
      </div>
    </div>
  )
}

export default MySecurity
