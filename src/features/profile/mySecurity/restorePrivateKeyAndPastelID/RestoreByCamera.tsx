import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { TRPCConfig } from '../../Profile'

type TQRReader = {
  index: number
  total: number
  qrCode: string
}

type TRestoreByCameraProps = {
  rpcConfig: TRPCConfig
  turnOffCamera?: boolean
  onHideHeader: (status: boolean) => void
}

export default function RestoreByCamera({
  rpcConfig,
  turnOffCamera,
  onHideHeader,
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
        setResults([...data])
        if (data.length === data[0]?.total) {
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
          onHideHeader(true)
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
    height: 292,
    width: 292,
  }

  return (
    <div className='w-full'>
      <div className='w-[476px] h-[350px] mx-auto bg-gray-f8 rounded-lg py-29px'>
        <div className='w-[292px] h-[292px] mx-auto bg-gray-71 rounded-md shadow-lg overflow-hidden'>
          {showQrReader && !turnOffCamera ? (
            <QrReader
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
              className='bg-gray-71 mx-auto'
            />
          ) : (
            <div className='text-gray-800 text-lg font-extrabold bg-gray-71 min-h-400px min-w-400px'></div>
          )}
        </div>
      </div>
      <div className='font-normal text-h5 leading-6 text-gray-71 mt-28px text-center'>
        Holding your phone up to your computer's webcam.{' '}
        {results.length ? (
          <span>
            Restoring ... {results.length}/{results[0].total}
          </span>
        ) : null}
      </div>
    </div>
  )
}
