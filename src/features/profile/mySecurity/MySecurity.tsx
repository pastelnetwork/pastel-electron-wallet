import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import ChangePassword from './changePassword/Password'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'

import { TRPCConfig } from '../Profile'
import { ffmpegwasm } from '../../../common/constants/ServeStatic'

type TSecurity = {
  currencyName: string
  rpcConfig: TRPCConfig
  qrcodeData: string[]
}

const MySecurity = (props: TSecurity): JSX.Element => {
  const { currencyName, rpcConfig, qrcodeData } = props
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [imagesData, setImagesData] = useState<string[]>([])
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const fileName = `${currencyName}_QR_Code_Video_${dayjs().format(
    'MM_DD_YYYY__HH_mm',
  )}.mp4`

  useEffect(() => {
    if (imagesData.length && !videoUrl) {
      try {
        const iframe = document.getElementById(
          'createVideoIframe',
        ) as HTMLIFrameElement
        if (iframe) {
          iframe?.contentWindow?.postMessage(
            imagesData,
            ffmpegwasm.videoHostURL,
          )
          window.addEventListener('message', handleReReceivedMessage, false)
        } else {
          setCurrentStatus('error')
        }
      } catch {
        setCurrentStatus('error')
      }
    }

    return () => {
      window.removeEventListener('message', handleReReceivedMessage, false)
    }
  }, [imagesData])

  const handleReReceivedMessage = (evt: MessageEvent) => {
    if (!evt.data.error) {
      if (evt.data.videoUrl && !videoUrl) {
        setVideoUrl(evt.data.videoUrl)
        saveFile(evt.data.videoUrl)
      } else {
        setCurrentStatus('error')
      }
    } else {
      setCurrentStatus('error')
    }
  }

  const saveFile = async (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.dispatchEvent(new MouseEvent('click'))
    setCurrentStatus('downloaded')
    a.remove()
  }

  const handleDownloadVideo = () => {
    if (videoUrl) {
      saveFile(videoUrl)
    } else {
      setCurrentStatus('downloading')
      const canvas = document.querySelectorAll('.canvasQRCodeData')
      if (canvas.length) {
        const images: string[] = []
        for (let i = 0; i < canvas.length; i++) {
          const item = canvas[i] as HTMLCanvasElement
          const img = item.toDataURL('')
          if (!images.includes(img)) {
            images.push(img)
          }
        }
        if (images.length) {
          setImagesData(images)
        }
      } else {
        setCurrentStatus('error')
      }
    }
  }

  return (
    <div className='w-full flex justify-center py-30px px-60px bg-background-main'>
      <div className='grid grid-cols-3 gap-5 min-h-672px'>
        <ChangePassword />
        <QRCode
          qrcodeData={qrcodeData}
          handleDownloadVideo={handleDownloadVideo}
          currentStatus={currentStatus}
        />
        <CryptoKey
          rpcConfig={rpcConfig}
          currencyName={currencyName}
          qrcodeData={qrcodeData.join('')}
        />
      </div>
      <div className='hidden'>
        <iframe
          id='createVideoIframe'
          src={ffmpegwasm.videoHostURL}
          className='h-1.5px w-1.5px'
        />
      </div>
    </div>
  )
}

export default MySecurity
