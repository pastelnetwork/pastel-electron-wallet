import React, { useState, useEffect } from 'react'
import path from 'path'
import jsQR from 'jsqr'
import cn from 'classnames'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { Video, Refresh } from 'common/components/Icons'
import { formatFileSize } from 'common/utils/format'
import Tooltip from 'common/components/Tooltip'

type TRestoreByUploadProps = {
  onHideHeader: (status: boolean) => void
}

export default function RestoreByUpload({
  onHideHeader,
}: TRestoreByUploadProps): JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [qrCodeData, setQRCodeData] = useState<string[]>([])
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    const doImport = async () => {
      const result = await doImportPrivKeys(qrCodeData.join(''))
      if (result) {
        setCurrentStatus('done')
      } else {
        setCurrentStatus('error')
      }
      onHideHeader(true)
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
              onHideHeader(true)
            }
          })
          .catch(() => {
            setCurrentStatus('error')
            onHideHeader(true)
          })
      } catch {
        setCurrentStatus('error')
        onHideHeader(true)
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
          <div className='w-3/4'>
            <label className='relative overflow-hidden flex'>
              <div className='w-[55px] cursor-pointer'>
                <Video size={55} />
              </div>
              <div className='flex flex-col justify-center max-w-278px cursor-pointer'>
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
          </div>
          <div className='w-14'>
            <Tooltip
              type='top'
              content={
                <div className='p-2 text-xs font-medium'>
                  Restore your keys.
                </div>
              }
              width={130}
              vPosPercent={110}
            >
              <span
                onClick={handleRestoreByUpload}
                className={cn(
                  fileSelected ? 'cursor-pointer' : 'cursor-not-allowed',
                )}
              >
                <Refresh
                  size={44}
                  className={cn(
                    'transition duration-300',
                    !fileSelected
                      ? 'text-blue-9b'
                      : 'text-blue-e7 hover:text-blue-fa',
                  )}
                  pathColor={fileSelected ? '#3F9AF7' : '#fff'}
                />
              </span>
            </Tooltip>
          </div>
        </div>
        {currentStatus === 'restoring' && (
          <div className='font-normal text-h5 leading-6 text-gray-71 mt-28px text-center'>
            Restoring ...
          </div>
        )}
      </div>
    </div>
  )
}
