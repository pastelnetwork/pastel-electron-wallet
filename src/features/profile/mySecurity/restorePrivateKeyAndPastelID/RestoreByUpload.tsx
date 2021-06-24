import React, { useState, useEffect } from 'react'
import { scanImageData } from 'zbar.wasm'
import fs from 'fs'
import path from 'path'

import VideoToImages, { VideoToFramesMethod } from '../common/VideoToImages'
import { doImportPrivKeys } from '../common/utils'

import { TRPCConfig } from '../../Profile'

import { Button } from '../../../../common/components/Buttons'

type TRestoreByUploadProps = {
  rpcConfig: TRPCConfig
}

export default function RestoreByUpload({
  rpcConfig,
}: TRestoreByUploadProps): JSX.Element {
  const [qrCodeData, setQRCodeData] = useState<string[]>([])
  const [fileSelected, setFileSelected] = React.useState<File>()

  useEffect(() => {
    if (qrCodeData.length) {
      console.log(1111, 'doImportPrivKeys')
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
        ).then(frames => {
          console.log(1111, 'frames', frames)
          frames.forEach(async (frame, idx) => {
            const res = await scanImageData(frame)
            console.log(1111, idx, 'scanImageData', res)
            if (res[0] && !qrCode.includes(res[0].decode())) {
              qrCode.push(res[0].decode())
            }
          })
          console.log(9999, 'setQRCodeData')
          setQRCodeData(qrCode)
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
      <div className='mb-3 bg-white max-w-690px p-5'>
        <div>
          <input
            type='file'
            name='upload'
            accept='video/mp4'
            onChange={handleImageChange}
          />
        </div>
        <div className='w-300px mt-4'>
          <Button
            variant='secondary'
            className='w-full font-extrabold'
            onClick={handleRestoreByUpload}
          >
            Start Restore
          </Button>
        </div>
        {qrCodeData ? (
          <div className='mt-4 break-all whitespace-pre-wrap'>
            Result: {qrCodeData?.join('')}
          </div>
        ) : null}
        <div></div>
      </div>
    </div>
  )
}
