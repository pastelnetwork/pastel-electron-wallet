import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
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
import { translate } from 'features/app/translations'

type TRestoreByUploadProps = {
  onHideHeader?: (status: boolean) => void
  setPastelId?: (pastelId: string) => void
  callback?: () => void
}

function UploadVideoControl({
  fileSelected,
  handleImageChange,
}: {
  fileSelected?: File
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e)
  }, [])

  return (
    <label className='relative overflow-hidden flex'>
      <div className='w-[55px] cursor-pointer'>
        <Video size={55} />
      </div>
      <div className='flex flex-col justify-center max-w-278px cursor-pointer'>
        <p className='text-base font-medium text-gray-4a mb-0 truncate max-w-full'>
          {fileSelected
            ? fileSelected.name
            : translate('selectYourQRCodeVideo')}
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
        onChange={onChange}
        className='hidden'
      />
    </label>
  )
}

export default function RestoreByUpload({
  onHideHeader,
  setPastelId,
  callback,
}: TRestoreByUploadProps): JSX.Element | null {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [qrCodeData, setQRCodeData] = useState<string[]>([])
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    const doImport = async () => {
      const result = await doImportPrivKeys(qrCodeData.join(''), setPastelId)
      if (result) {
        if (callback) {
          callback()
          return
        }
        setCurrentStatus('done')
      } else {
        setCurrentStatus('error')
      }
      if (onHideHeader) {
        onHideHeader(true)
      }
    }
    if (qrCodeData.length) {
      doImport()
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }
  }, [qrCodeData])

  const handleRestoreByUpload = useCallback(() => {
    if (fileSelected) {
      try {
        setCurrentStatus('restoring')
        const qrCode: string[] = []
        const videoPath: string = path.join(fileSelected.path).toString()
        VideoToImages.getFrames(
          'file://' + videoPath,
          12,
          VideoToFramesMethod.totalFrames,
        )
          .then(frames => {
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
              if (onHideHeader) {
                onHideHeader(true)
              }
            }
          })
          .catch(() => {
            setCurrentStatus('error')
            if (onHideHeader) {
              onHideHeader(true)
            }
          })
      } catch {
        setCurrentStatus('error')
        if (onHideHeader) {
          onHideHeader(true)
        }
      }
    }
  }, [fileSelected])

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files

      if (fileList) {
        setFileSelected(fileList[0])
      }
    },
    [],
  )

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  if (currentStatus === 'error') {
    return <RestoreError />
  }

  const renderRefreshIcon = () => {
    return (
      <Tooltip
        type='top'
        content={
          <div className='p-2 text-xs font-medium'>
            {translate('restoreYourKeys')}
          </div>
        }
        width={130}
        vPosPercent={110}
      >
        <button
          onClick={handleRestoreByUpload}
          className={cn(
            'inline-block',
            fileSelected ? 'cursor-pointer' : 'cursor-not-allowed',
          )}
          type='button'
          tabIndex={0}
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
        </button>
      </Tooltip>
    )
  }

  const renderRestoreUploadForm = () => (
    <div
      className={cn(
        'flex items-center justify-between w-full rounded-lg border border-gray-ec py-15px px-20px',
        currentStatus === 'restoring' && 'cursor-not-allowed',
      )}
    >
      <div className='w-3/4'>
        <UploadVideoControl
          fileSelected={fileSelected}
          handleImageChange={handleImageChange}
        />
      </div>
      <div className='w-14'>{renderRefreshIcon()}</div>
    </div>
  )

  return (
    <div>
      <div className='font-normal text-h5 leading-6 text-gray-71'>
        {translate('pleaseSelectYourQRCodeVideo')}
      </div>
      <div className='mt-3'>
        {renderRestoreUploadForm()}
        {currentStatus === 'restoring' && (
          <div className='font-normal text-h5 leading-6 text-gray-71 mt-28px text-center'>
            {translate('restoring')} ...
          </div>
        )}
      </div>
    </div>
  )
}

RestoreByUpload.defaultProps = {
  onHideHeader: undefined,
  setPastelId: undefined,
  callback: undefined,
}

UploadVideoControl.defaultProps = {
  fileSelected: undefined,
}
