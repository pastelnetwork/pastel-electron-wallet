import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import Slider from 'react-slick'

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
  handleDownloadVideo: () => void
}

type TQRCodeSliderProps = {
  qrcodeData: string[]
}

function QRCodeSlider({ qrcodeData }: TQRCodeSliderProps): JSX.Element | null {
  if (!qrcodeData.length) {
    return null
  }
  let slider: Slider | null
  const settings = {
    dots: false,
    infinite: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    afterChange: (currentSlide: number) => {
      if (currentSlide === qrcodeData.length - 1) {
        slider?.slickGoTo(0)
      }
    },
  }

  return (
    <Slider {...settings} ref={node => (slider = node)}>
      {qrcodeData.map((item, idx) => (
        <div key={idx} className='d-block h-205px'>
          <QRCode
            value={`${idx}::${qrcodeData.length}::${item}`}
            className='qrCodeData h-full w-full max-h-205px max-w-full'
            size={1024}
          />
        </div>
      ))}
    </Slider>
  )
}

const QR = ({
  rpcConfig,
  qrcodeData,
  handleDownloadVideo,
}: TQRProps): JSX.Element => {
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
      <div className='w-full h-205px rounded-md shadow-64px border border-solid border-gray-e6 relative'>
        <QRCodeSlider qrcodeData={qrcodeData} />
      </div>
    </div>
  )

  const footer = (
    <Button
      variant='secondary'
      className='w-full font-extrabold relative'
      onClick={handleDownloadVideo}
    >
      Download QR Code Video
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
