import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from 'swiper/core'

import RestoreModal from '../restorePrivateKeyAndPastelID/RestoreModal'
import Link from '../../../../common/components/Link'
import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'
import { TRPCConfig } from '../../Profile'

import 'swiper/swiper.min.css'

type TQRProps = {
  rpcConfig: TRPCConfig
  qrcodeData: string[]
  handleDownloadVideo: () => void
  currentStatus?: string
}

type TQRCodeSliderProps = {
  qrcodeData: string[]
}

function QRCodeSlider({ qrcodeData }: TQRCodeSliderProps): JSX.Element | null {
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
        <SwiperSlide key={idx} className='d-block h-205px'>
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

const QR = ({
  rpcConfig,
  qrcodeData,
  handleDownloadVideo,
  currentStatus,
}: TQRProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const description = (
    <div className='max-w-330px'>
      As a more convenient way to backup your secrets, you can either click the
      button below to download a QR Code video, or make a video of the code on
      your smartphone camera. Then to restore, you can play the video on your
      phone and hold the phone screen up to your webcam. You can test that it
      worked by clicking{' '}
      <Link
        href='#'
        className='underline'
        variant='gray-77'
        onClick={() => setModalIsOpen(true)}
      >
        here
      </Link>
      .
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
        ? 'Creating QR Code Video'
        : 'Download QR Code Video'}
    </Button>
  )

  return (
    <>
      <Card
        title='Generate a QR Code Video'
        description={description}
        content={content}
        footer={footer}
      />
      <RestoreModal
        rpcConfig={rpcConfig}
        modalIsOpen={modalIsOpen}
        onCloseModal={setModalIsOpen}
      />
    </>
  )
}

export default QR
