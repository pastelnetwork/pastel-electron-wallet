import React, { useState, useEffect } from 'react'
import path from 'path'
import jsQR from 'jsqr'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import { Button } from '../../../../common/components/Buttons'
import Link from '../../../../common/components/Link'

type TRestoreByUploadProps = {
  rpcConfig: TRPCConfig
  onBack: () => void
}

export default function RestoreByUpload({
  rpcConfig,
  onBack,
}: TRestoreByUploadProps): JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [qrCodeData, setQRCodeData] = useState<string[]>([])
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    const doImport = async () => {
      const result = await doImportPrivKeys(qrCodeData.join(''), rpcConfig)
      if (result) {
        setCurrentStatus('done')
      } else {
        setCurrentStatus('error')
      }
    }
    if (qrCodeData.length) {
      doImport()
    }
  }, [qrCodeData])

  const handleRestoreByUpload = () => {
    if (fileSelected) {
      try {
        setCurrentStatus('restoring')
        const qrCode: string[] = []
        const videoPath = path.join(fileSelected.path)
        VideoToImages.getFrames(
          'file://' + videoPath,
          12,
          VideoToFramesMethod.totalFrames,
        )
          .then(async frames => {
            let totalQRCode = 0
            for (let i = 0; i < frames.length; i++) {
              const frame = frames[i]
              const result = jsQR(frame?.data, frame.width, frame.height)
              if (result?.data) {
                const qr = parseQRCodeFromString(result?.data)
                if (qr && qr?.qrCode && !qrCode.includes(qr.qrCode)) {
                  qrCode.push(qr.qrCode)
                  totalQRCode = qr.total
                }
              }
            }

            if (qrCode.length === totalQRCode) {
              setQRCodeData(qrCode)
            } else {
              setCurrentStatus('error')
            }
          })
          .catch(() => {
            setCurrentStatus('error')
          })
      } catch {
        setCurrentStatus('error')
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList) {
      setFileSelected(fileList[0])
    }
  }

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  if (currentStatus === 'error') {
    return <RestoreError />
  }

  return (
    <div className='m-4'>
      <div className='text-gray-800 text-2xl font-extrabold mb-3'>
        Select QR Code Video
      </div>
      <div className='font-medium text-sm text-gray-33 opacity-50'>
        Please select your video key
      </div>
      <div className='mt-4'>
        <label className='bg-gray-71 w-full relative overflow-hidden px-2 h-10 flex items-center text-white font-medium'>
          <span className='truncate max-w-full'>
            {fileSelected ? fileSelected.name : 'Choose File'}
          </span>
          <input
            type='file'
            name='upload'
            accept='video/mp4'
            onChange={handleImageChange}
            className='hidden'
          />
        </label>
      </div>
      <div className='mt-4'>
        <Button
          className='w-full font-extrabold'
          onClick={handleRestoreByUpload}
          disabled={currentStatus === 'restoring'}
        >
          {currentStatus === 'restoring' ? 'Restoring' : 'Restore'}
        </Button>
      </div>
      <div className='mt-4 text-center'>
        <Link onClick={() => onBack()}>Or try another restore method</Link>
      </div>
    </div>
  )
}
