import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'

import { video } from '../../../constants/ServeStatic'

type TCreateVideoProps = {
  qrcodeData: string[]
  setVideoUrl: (val: string) => void
}

export default function CreateVideo({
  qrcodeData,
  setVideoUrl,
}: TCreateVideoProps): JSX.Element {
  const [imagesData, setImagesData] = useState<string[]>([])

  useEffect(() => {
    if (!imagesData.length) {
      convertQRCodeToImages()
    }

    let timer: ReturnType<typeof setTimeout>
    const getVideoUrl = () => {
      const iframe = document.getElementById(
        'qrCodeIframe',
      ) as HTMLIFrameElement
      if (iframe) {
        const videoUrl = iframe?.contentWindow?.document?.getElementById(
          'videourl',
        )?.innerText
        if (videoUrl && videoUrl !== 'inprocess') {
          setVideoUrl(videoUrl)
        } else {
          timer = setTimeout(() => getVideoUrl(), 10000)
        }
      } else {
        timer = setTimeout(() => getVideoUrl(), 10000)
      }
    }

    if (imagesData.length) {
      getVideoUrl()
    }
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const convertQRCodeToImages = () => {
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

  return (
    <div className='hidden'>
      {qrcodeData?.map((item: string, idx: number) => (
        <QRCode
          value={`${idx}::${qrcodeData.length}::${item}`}
          className='qrCodeData h-1.5px w-1.5px'
          size={1024}
          key={idx}
        />
      ))}
      {imagesData.length ? (
        <iframe
          id='qrCodeIframe'
          src={`http://localhost:${video.staticPort}/`}
          className='h-1.5px w-1.5px'
          data-images={JSON.stringify(imagesData)}
        />
      ) : null}
    </div>
  )
}
