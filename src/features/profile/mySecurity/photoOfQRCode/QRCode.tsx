import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import Slider from 'react-slick'
import Modal from 'react-modal'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Link from '../../../../common/components/Link'
import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'
import { TRPCConfig } from '../../Profile'
import { fetchPastelIDAndPrivateKeys, splitStringIntoChunks } from '../utils'

type TQRProps = {
  rpcConfig: TRPCConfig
}

const downloadQR = () => {
  const canvas = document.getElementById('qrcode') as HTMLCanvasElement

  const pngUrl = canvas
    ?.toDataURL('image/png')
    .replace('image/png', 'image/octet-stream')
  const downloadLink = document.createElement('a')
  downloadLink.href = pngUrl
  downloadLink.download = 'qrcode.png'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

const handleDownloadQRCodeVideo = () => {
  const svgs = document.querySelectorAll('.qrcode')
  const images = []
  for (let i = 0; i < svgs.length; i++) {
    const str = new XMLSerializer().serializeToString(svgs[i])
    images.push(window.btoa(str))
  }
  downloadQR()
}

const QR = ({ rpcConfig }: TQRProps): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [qrcodeData, setQRcodeData] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchPastelIDAndPrivateKeys(rpcConfig)
      if (results) {
        const chunks = splitStringIntoChunks(results, 300)
        setQRcodeData(chunks)
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
    <Button
      variant='secondary'
      className='w-full font-extrabold'
      onClick={handleDownloadQRCodeVideo}
    >
      Download QR Code Video
    </Button>
  )

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  }
  const totalQRCode = qrcodeData?.length
  const qrcodeList = (qrcodeClassName: string) =>
    qrcodeData?.map((item, idx) => (
      <div key={idx} className='d-block'>
        <QRCode
          value={`${idx}::${totalQRCode}::${item}`}
          renderAs='svg'
          className={qrcodeClassName}
        />
      </div>
    ))

  return (
    <>
      <Card
        title='Generate a QR Code Video'
        description={description}
        content={content}
        footer={footer}
      />
      <div className='hidden'>{qrcodeList('qrcode w-1px h-1px')}</div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {modalIsOpen ? (
          <div className='h-540px w-540px mx-auto'>
            <Slider {...settings}>{qrcodeList('h-full w-full')}</Slider>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

export default QR
