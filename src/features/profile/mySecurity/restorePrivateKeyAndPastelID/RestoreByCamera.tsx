import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import Link from '../../../../common/components/Link'

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
  const [currentStatus, setCurrentStatus] = useState<string>('')

  const handleScan = async (result: string | null) => {
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
          try {
            setShowQrReader(false)
            const finalData = data.map(q => q.qrCode).join('')
            const result = await doImportPrivKeys(finalData, rpcConfig)
            if (result) {
              setCurrentStatus('done')
            } else {
              setCurrentStatus('error')
            }
          } catch (err) {
            setCurrentStatus('error')
          }
        }
      }
    }
  }

  const handleError = () => {
    setCurrentStatus('error')
  }

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  if (currentStatus === 'error') {
    return <RestoreError />
  }

  const previewStyle = {
    height: 400,
    width: 400,
  }

  return (
    <div className='m-4'>
      <div className='text-gray-800 text-2xl font-extrabold mb-3'>
        Scan Your QR Code
      </div>
      <div className='font-medium text-sm text-gray-33 opacity-50'>
        Move your QR code to the red square to restore your keys.{' '}
        {results.length ? (
          <span>
            Restoring ... {results.length}/{results[0].total}
          </span>
        ) : null}
      </div>
      <div className='mt-4 mx-auto p-5'>
        {showQrReader ? (
          <QrReader
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            className='bg-gray-71 mx-auto'
          />
        ) : (
          <div className='text-gray-800 text-lg font-extrabold'>Restoring</div>
        )}
      </div>
      <div className='mt-4 text-center'>
        <Link
          href='#'
          onClick={() => {
            onBack('')
            setShowQrReader(false)
          }}
        >
          Or try another restore method
        </Link>
      </div>
    </div>
  )
}
