import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'

import { TRPCConfig } from '../../Profile'

type TQRReader = {
  index: number
  total: number
  qrCode: string
}

type TRestoreByCameraProps = {
  rpcConfig: TRPCConfig
  onBack: (type: string) => void
}

export default function RestoreByCamera({
  rpcConfig,
  onBack,
}: TRestoreByCameraProps): JSX.Element {
  const [results, setResults] = useState<TQRReader[]>([])
  const [showQrReader, setShowQrReader] = useState(true)

  const handleScan = (result: string | null) => {
    if (result) {
      const qr = parseQRCodeFromString(result)
      const qrExist = results.filter(item => item.qrCode === qr?.qrCode)

      if (!qrExist.length && qr) {
        let data: TQRReader[] = results
        data.push({
          index: qr.index,
          total: qr.total,
          qrCode: qr.qrCode,
        })

        data = data.sort((a, b) => a.index - b.index)
        setResults(data)
        const lastItem = data[data.length - 1]
        if (lastItem.index === lastItem.total - 1) {
          setShowQrReader(false)
          const finalData = data.map(q => q.qrCode).join('')
          doImportPrivKeys(finalData, rpcConfig)
        }
      }
    }
  }

  const handleError = (error: Error) => {
    console.log(
      'profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByCamera QrReader error: ',
      error,
    )
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  return (
    <div className='m-4'>
      <div className='mb-5'>
        <a href='#' className='underline' onClick={() => onBack('')}>
          Back
        </a>
      </div>
      <div className='mb-3 mx-auto p-5'>
        {showQrReader ? (
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        ) : (
          <p>Done</p>
        )}
      </div>
    </div>
  )
}
