import React, { useState } from 'react'
import dayjs from 'dayjs'

import ChangePassword from './changePassword/Password'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'

import { TRPCConfig } from '../Profile'
import { ffmpegwasm } from '../../constants/ServeStatic'

type TSecurity = {
  info?: {
    currencyName: string
  }
  rpcConfig: TRPCConfig
  qrcodeData: string[]
}

const MySecurity = (props: TSecurity): JSX.Element => {
  const { info, rpcConfig, qrcodeData } = props

  const [videoUrl, setVideoUrl] = useState<string>('')
  const [currentStatus, setCurrentStatus] = useState<string>('')

  const saveFile = async (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = generateFileName()
    a.dispatchEvent(new MouseEvent('click'))
    setCurrentStatus('downloaded')
    a.remove()
  }

  const generateFileName = () => {
    const title = `${info?.currencyName}_QR_Code_Video`
    return `${title}_${dayjs().format('MM_DD_YYYY__HH_mm')}.mp4`
  }

  const handleDownloadVideo = () => {
    if (videoUrl) {
      saveFile(videoUrl)
    } else {
      setCurrentStatus('downloading')
      const canvas = document.querySelectorAll('.qrCodeData')
      if (canvas.length) {
        const images: string[] = []
        for (let i = 0; i < canvas.length; i++) {
          const item = canvas[i] as HTMLCanvasElement
          const img = item.toDataURL('')
          if (!images.includes(img)) {
            images.push(img)
          }
        }
        if (images.length && !videoUrl) {
          try {
            const iframe = document.getElementById(
              'qrCodeIframe',
            ) as HTMLIFrameElement
            if (iframe && !videoUrl) {
              iframe?.contentWindow?.postMessage(
                images,
                `http://localhost:${ffmpegwasm.staticPort}/`,
              )
              const handleReReceivedMessage = (evt: MessageEvent) => {
                if (evt.data?.videoUrl && !videoUrl) {
                  setVideoUrl(evt.data.videoUrl)
                  saveFile(evt.data.videoUrl)
                  window.removeEventListener(
                    'message',
                    handleReReceivedMessage,
                    false,
                  )
                }
              }
              window.addEventListener('message', handleReReceivedMessage, false)
            }
          } catch (error) {
            console.log(
              `feature/profile/mySecurity handleDownloadVideo error: ${error.message}`,
              error,
            )
            setCurrentStatus('downloading')
          }
        }
      }
    }
  }

  return (
    <div className='w-full justify-center py-30px px-60px bg-background-main'>
      <div className='grid grid-cols-3 gap-5 min-h-672px'>
        <ChangePassword />
        <QRCode
          rpcConfig={rpcConfig}
          qrcodeData={qrcodeData}
          handleDownloadVideo={handleDownloadVideo}
          currentStatus={currentStatus}
        />
        <CryptoKey rpcConfig={rpcConfig} currencyName={info?.currencyName} />
      </div>
      <div className='hidden'>
        <iframe
          id='qrCodeIframe'
          src={`http://localhost:${ffmpegwasm.staticPort}/`}
          className='h-1.5px w-1.5px'
        />
      </div>
    </div>
  )
}

export default MySecurity
