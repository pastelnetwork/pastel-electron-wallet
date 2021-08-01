import React, { useState, useEffect } from 'react'
import path from 'path'
import jsQR from 'jsqr'
import cn from 'classnames'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import { Video, Upload } from 'common/components/Icons'
import { formatFileSize } from 'common/utils/format'
import Tooltip from 'common/components/Tooltip'

type TRestoreByUploadProps = {
  rpcConfig: TRPCConfig
}

export default function RestoreByUpload({
  rpcConfig,
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
    <div>
      <div className='font-normal text-h5 leading-6 text-gray-71'>
        Please select your QR code video.
      </div>
      <div className='mt-3'>
        <div
          className={cn(
            'flex items-center justify-between w-full rounded-lg border border-gray-ec py-15px px-20px',
            currentStatus === 'restoring' && 'cursor-not-allowed',
          )}
        >
          <label
            className={cn(
              'w-3/4 relative overflow-hidden flex',
              !fileSelected && 'cursor-pointer',
            )}
          >
            <div className='w-55px'>
              <Video size={55} />
            </div>
            <div className='flex flex-col justify-center max-w-278px'>
              <p className='text-base font-medium text-gray-4a mb-0 truncate max-w-full'>
                {fileSelected
                  ? fileSelected.name
                  : 'Select your QR code video.'}
              </p>
              {fileSelected ? (
                <p className='mb-0 text-xs font-normal text-gray-a0'>
                  {formatFileSize(fileSelected.size)}
                </p>
              ) : null}
            </div>
            <input
              type='file'
              name='upload'
              accept='video/mp4'
              onChange={handleImageChange}
              className='hidden'
            />
          </label>
          <div className='w-14'>
            <Tooltip
              type='top'
              content={
                <div className='p-2 text-xs font-medium'>
                  Select your QR code video.
                </div>
              }
              width={180}
            >
              <span
                onClick={handleRestoreByUpload}
                className={cn(
                  fileSelected ? 'cursor-pointer' : 'cursor-not-allowed',
                )}
              >
                <Upload size={44} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
