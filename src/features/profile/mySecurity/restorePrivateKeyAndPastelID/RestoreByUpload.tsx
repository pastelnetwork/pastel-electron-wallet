import React, { useState, useEffect } from 'react'
import { scanImageData } from 'zbar.wasm'
import fs from 'fs'
import path from 'path'

import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys, parseQRCodeFromString } from '../common/utils'

import { TRPCConfig } from '../../Profile'

import { Button } from '../../../../common/components/Buttons'

type TRestoreByUploadProps = {
  rpcConfig: TRPCConfig
  onBack: (type: string) => void
}

export default function RestoreByUpload({
  rpcConfig,
  onBack,
}: TRestoreByUploadProps): JSX.Element {
  const [qrCodeData, setQRCodeData] = useState<string[]>([])
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    if (qrCodeData.length) {
      doImportPrivKeys(qrCodeData.join(''), rpcConfig)
    }
  }, [qrCodeData])

  const handleRestoreByUpload = () => {
    if (fileSelected) {
      try {
        const oldpath = fileSelected.path
        const newpath = path.join(
          `${process.cwd()}/static/videos/${fileSelected.name}`,
        )
        fs.copyFileSync(oldpath, newpath)
        const qrCode: string[] = []
        VideoToImages.getFrames(
          `local-video://static/videos/${fileSelected.name}`,
          VideoToFramesMethod.totalFrames,
        )
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
            console.log(1111, 'Error', err)
          })
      } catch (error) {
        console.log(1111, 'Error', error)
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

  return (
    <div className='m-4'>
      <div className='mb-5'>
        <a href='#' className='underline' onClick={() => onBack('')}>
          Back
        </a>
      </div>
      <div className='mb-3 max-w-690px'>
        <div>
          <input
            type='file'
            name='upload'
            accept='video/mp4'
            onChange={handleImageChange}
          />
        </div>
        <div className='w-300px mt-5'>
          <Button
            className='w-full font-extrabold'
            onClick={handleRestoreByUpload}
          >
            Start Restore
          </Button>
        </div>
      </div>
    </div>
  )
}
