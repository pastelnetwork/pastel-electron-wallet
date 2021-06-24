import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import Slider from 'react-slick'
import Modal from 'react-modal'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Link from '../../../../common/components/Link'
import Card from '../../components/Card'
import { TRPCConfig } from '../../Profile'
import {
  fetchPastelIDAndPrivateKeys,
  splitStringIntoChunks,
} from '../common/utils'
import { video } from '../../../constants/ServeStatic'

type TQRProps = {
  rpcConfig: TRPCConfig
}

const QR = ({ rpcConfig }: TQRProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [qrcodeData, setQRcodeData] = useState<string[]>([])
  const [
    pastelIDAndPrivateKeysData,
    setPastelIDAndPrivateKeysData,
  ] = useState<string>('')
  const chunkQuantity = 500

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchPastelIDAndPrivateKeys(rpcConfig)
      if (results) {
        const chunks = splitStringIntoChunks(results, chunkQuantity)
        setQRcodeData(chunks)
        setPastelIDAndPrivateKeysData(results)
      }
    }
    fetchData()
  }, [])

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
      <div className='flex w-full h-full bg-background-onboarding rounded-md justify-center items-center shadow-64px  min-w-118px border border-solid border-gray-e6'>
        <QRCode
          id='qrcode'
          value='https://explorer.pastel.network/'
          size={118}
        />
      </div>
    </div>
  )

  const footer = (
    <>
      {/* <Button
        variant='secondary'
        className='w-full font-extrabold'
      >
        Download QR Code Video
      </Button> */}
      <iframe
        src={`http://localhost:${video.staticPort}/?page=download-video&chunks=${chunkQuantity}&val=${pastelIDAndPrivateKeysData}`}
        className='w-full h-40px'
      />
    </>
  )

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    afterChange: (slick: number) => {
      setCurrentSlide(slick)
    },
  }
  const totalQRCode = qrcodeData.length

  return (
    <>
      <Card
        title='Generate a QR Code Video'
        description={description}
        content={content}
        footer={footer}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {modalIsOpen ? (
          <div className='h-540px w-540px mx-auto'>
            <Slider {...settings}>
              {qrcodeData?.map((item, idx) => (
                <div key={idx} className='d-block'>
                  <QRCode
                    value={`${idx}::${totalQRCode}::${item}`}
                    renderAs='svg'
                    className='h-full w-full'
                  />
                </div>
              ))}
            </Slider>
            <h4 className='text-center mt-10px'>
              {currentSlide + 1}/{totalQRCode}
            </h4>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

export default QR
