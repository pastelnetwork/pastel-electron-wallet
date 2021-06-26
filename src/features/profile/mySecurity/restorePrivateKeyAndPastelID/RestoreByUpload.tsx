import React, { useState, useEffect } from 'react'
import { scanImageData } from 'zbar.wasm'
import fs from 'fs'
import path from 'path'

import Link from '../../../../common/components/Link'
import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import { restoreVideo } from '../../../constants/ServeStatic'
import { Button } from '../../../../common/components/Buttons'
import { useAppSelector } from '../../../../redux/hooks'
import RestoreSuccess from './RestoreSuccess'

type TRestoreByUploadProps = {
  rpcConfig: TRPCConfig
  onBack: (type: string) => void
}

export default function RestoreByUpload({
  rpcConfig,
  onBack,
}: TRestoreByUploadProps): JSX.Element {
  const { isPackaged } = useAppSelector(state => state.profile)
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
        const oldpath = path.join(fileSelected.path)
        let newpath = path.join(
          `${process.cwd()}/static/videos/${fileSelected.name}`,
        )
        if (isPackaged) {
          newpath = path.join(
            `${process.resourcesPath}/videos/${fileSelected.name}`,
          )
        }

        fs.copyFileSync(oldpath, newpath)
        const qrCode: string[] = []
        const videoPath = `http://localhost:${restoreVideo.staticPort}/${fileSelected.name}`
        console.log(1111, 'videoPath', videoPath)
        VideoToImages.getFrames(videoPath, VideoToFramesMethod.totalFrames)
          .then(async frames => {
            console.log(1111, 'getFrames', frames)
            let currentQRCode = 0
            let totalQRCode = 0
            for (let i = 0; i < frames.length; i++) {
              const res = await scanImageData(frames[i])
              console.log(1111, 'scanImageData', res)
              if (res[0]) {
                const qr = parseQRCodeFromString(res[0].decode())
                if (qr && !qrCode.includes(qr.qrCode)) {
                  if (currentQRCode < qr.index) {
                    currentQRCode = qr.index
                  }

                  qrCode.push(qr.qrCode)
                  if (totalQRCode < qr.total) {
                    totalQRCode = qr.total
                  }
                }
              }
            }

            if (currentQRCode === totalQRCode - 1) {
              setQRCodeData(qrCode)
            }
          })
          .catch(err => {
            setCurrentStatus('error')
            console.log(
              `feature/profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByUpload handleRestoreByUpload error: ${err}`,
              err,
            )
          })
      } catch (error) {
        setCurrentStatus('error')
        console.log(
          `feature/profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByUpload handleRestoreByUpload error: ${error}`,
          error,
        )
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (!fileList) {
      return
    }

    setFileSelected(fileList[0])
  }

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  return (
    <div className='m-4'>
      <div className='text-gray-800 text-2xl font-extrabold mb-3'>
        Upload QR Code Video
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
        <Link href='#' onClick={() => onBack('')}>
          Or try another restore method
        </Link>
      </div>
    </div>
  )
}
