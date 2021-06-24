import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import RestoreByUpload from '../restorePrivateKeyAndPastelID/RestoreByUpload'
import RestoreByCamera from '../restorePrivateKeyAndPastelID/RestoreByCamera'
import Link from '../../../../common/components/Link'
import Modal from '../../../../common/components/AnimatedModal'
import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'
import { TRPCConfig } from '../../Profile'

type TQRProps = {
  rpcConfig: TRPCConfig
  qrcodeData: string[]
}

type TQRCodeSliderProps = {
  qrcodeData: string[]
}

function QRCodeSlider({ qrcodeData }: TQRCodeSliderProps): JSX.Element | null {
  if (!qrcodeData.length) {
    return null
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  }

  return (
    <Slider {...settings}>
      {qrcodeData.map((item, idx) => (
        <div key={idx} className='d-block'>
          <QRCode
            value={`${idx}::${qrcodeData.length}::${item}`}
            className='h-full w-full'
            renderAs='svg'
          />
        </div>
      ))}
    </Slider>
  )
}

const QR = ({ rpcConfig, qrcodeData }: TQRProps): JSX.Element => {
  const [selectedRestoreType, setSelectedRestoreType] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleSelectedRestoreType = (type: string) => {
    setSelectedRestoreType(type)
  }

  const description = (
    <div className='max-w-330px'>
      As a more convenient way to backup your secrets, you can either click the
      button below to download a QR Code video, or make a video of the code on
      your smartphone camera. Then to restore, you can play the video on your
      phone and hold the phone screen up to your webcam. You can test that it
      worked by clicking{' '}
      <Link href='#' className='underline' onClick={() => setModalIsOpen(true)}>
        here
      </Link>
      .
    </div>
  )

  const content = (
    <div className='flex justify-center h-270px rounded-lg py-33px px-42px bg-tab-hover'>
      <div className='w-full h-118px rounded-md shadow-64px border border-solid border-gray-e6 relative'>
        <QRCodeSlider qrcodeData={qrcodeData} />
      </div>
    </div>
  )

  const footer = (
    <Button variant='secondary' className='w-full font-extrabold relative'>
      Download QR Code Video
    </Button>
  )

  console.log(111111, 'Generate a QR Code Video')

  return (
    <>
      <Card
        title='Generate a QR Code Video'
        description={description}
        content={content}
        footer={footer}
      />
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        closeButton
        render={() => (
          <div className='paper p-10 w-[690px]'>
            <div className='py-5'>
              {!selectedRestoreType ? (
                <>
                  <div>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => handleSelectedRestoreType('upload')}
                    >
                      Upload QR Code Video
                    </Button>
                  </div>
                  <div className='mt-5'>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => handleSelectedRestoreType('scan')}
                    >
                      Scan QR Code Video
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {selectedRestoreType === 'upload' ? (
                    <RestoreByUpload
                      rpcConfig={rpcConfig}
                      onBack={handleSelectedRestoreType}
                    />
                  ) : null}
                  {selectedRestoreType === 'scan' ? (
                    <RestoreByCamera
                      rpcConfig={rpcConfig}
                      onBack={handleSelectedRestoreType}
                    />
                  ) : null}
                </>
              )}
            </div>
          </div>
        )}
      />
    </>
  )
}

export default QR
