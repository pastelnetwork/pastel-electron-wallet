import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import ChangePassword from './changePassword/Password'
import QRCode from './photoOfQRCode/QRCode'
import CryptoKey from './backupCryptoKey/CryptoKey'

import { TRPCConfig } from '../Profile'
import { video } from '../../constants/ServeStatic'

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
  const [imagesData, setImagesData] = useState<string[]>([])
  const threeSecond = 3 * 1000

  useEffect(() => {
    let timerCheckVideoLink: ReturnType<typeof setInterval>
    const getVideoFromIframe = () => {
      const iframe = document.getElementById(
        'qrCodeIframe',
      ) as HTMLIFrameElement
      if (iframe) {
        const videoUrl = iframe?.contentWindow?.document?.getElementById(
          'videourl',
        )?.innerText
        if (videoUrl && videoUrl !== 'inprocess') {
          clearInterval(timerCheckVideoLink)
          setVideoUrl(videoUrl)
          saveFile(videoUrl)
        }
      }
    }

    if (imagesData.length && !videoUrl) {
      timerCheckVideoLink = setInterval(() => {
        getVideoFromIframe()
      }, threeSecond)
    }

    return () => {
      clearInterval(timerCheckVideoLink)
    }
  }, [imagesData])

  const saveFile = async (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = generateFileName()
    a.dispatchEvent(new MouseEvent('click'))
  }

  const generateFileName = () => {
    const title = `${info?.currencyName}_QR_Code_Video`
    return `${title}_${dayjs().format('MM_DD_YYYY__HH_mm')}.mp4`
  }

  const handleDownloadVideo = () => {
    if (videoUrl) {
      saveFile(videoUrl)
    } else {
      const canvas = document.querySelectorAll('.qrCodeData')
      if (canvas.length) {
        const images = []
        for (let i = 0; i < canvas.length; i++) {
          const item = canvas[i] as HTMLCanvasElement
          const img = item.toDataURL('image/png')
          images.push(img)
        }

        if (images.length) {
          setImagesData(images)
        }
      }
    }
  }

  return (
    <div className='w-full flex justify-center py-30px px-60px bg-background-main'>
      <div className='grid grid-cols-3 gap-5 min-h-672px'>
        <ChangePassword />
        <QRCode
          rpcConfig={rpcConfig}
          qrcodeData={qrcodeData}
          handleDownloadVideo={handleDownloadVideo}
        />
        <CryptoKey rpcConfig={rpcConfig} currencyName={info?.currencyName} />
      </div>
      <div className='hidden'>
        {imagesData.length ? (
          <iframe
            id='qrCodeIframe'
            src={`http://localhost:${video.staticPort}/`}
            className='h-1.5px w-1.5px'
            data-images={JSON.stringify(imagesData)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default MySecurity
