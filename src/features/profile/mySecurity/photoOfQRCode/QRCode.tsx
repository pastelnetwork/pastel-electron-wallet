import React from 'react'
import QRCode from 'qrcode.react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from 'swiper/core'

import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'
import { translate } from 'features/app/translations'

import 'swiper/swiper.min.css'

type TQRProps = {
  qrcodeData: string[]
  handleDownloadVideo: () => void
  currentStatus?: string
}

type TQRCodeSliderProps = {
  qrcodeData: string[]
}

export function QRCodeSlider({
  qrcodeData,
}: TQRCodeSliderProps): JSX.Element | null {
  if (!qrcodeData.length) {
    return null
  }

  SwiperCore.use([Autoplay, EffectFade])

  const settings = {
    autoplay: {
      disableOnInteraction: false,
      delay: 2000,
    },
    navigation: false,
    pagination: false,
    speed: 1,
    mousewheel: false,
  }

  return (
    <Swiper
      {...settings}
      effect='fade'
      slidesPerView={1}
      fadeEffect={{ crossFade: true }}
    >
      {qrcodeData.map((item, idx) => (
        <SwiperSlide key={item} className='d-block h-205px'>
          <div className='flex items-center h-205px w-205px max-w-205px mx-auto'>
            <QRCode
              value={`${idx}::${qrcodeData.length}::${item}`}
              className='canvasQRCodeData h-full w-full max-h-190px max-w-full'
              size={1024}
              includeMargin
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default function QR({
  qrcodeData,
  handleDownloadVideo,
  currentStatus,
}: TQRProps): JSX.Element {
  const description = (
    <div className='max-w-330px'>
      {translate('asAMoreConvenientWayToBackupYourSecrets')}
    </div>
  )

  const content = (
    <div className='flex justify-center h-270px rounded-lg py-33px px-42px bg-tab-hover'>
      <div className='w-full h-205px rounded-md shadow-64px border border-solid border-gray-e6 relative cursor-not-allowed'>
        <QRCodeSlider qrcodeData={qrcodeData} />
      </div>
    </div>
  )

  const footer = (
    <Button
      variant='secondary'
      className='w-full font-extrabold relative'
      onClick={handleDownloadVideo}
      disabled={currentStatus === 'downloading'}
    >
      {currentStatus === 'downloading'
        ? translate('creatingQRCodeVideo')
        : translate('downloadQRCodeVideo')}
    </Button>
  )

  return (
    <Card
      title={translate('generateAQRCodeVideo')}
      description={description}
      content={content}
      footer={footer}
    />
  )
}

QR.defaultProps = {
  currentStatus: '',
}
