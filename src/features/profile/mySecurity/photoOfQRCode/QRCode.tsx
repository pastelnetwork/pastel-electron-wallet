import React from 'react'
import QRCode from 'qrcode.react'

import Link from '../../../../common/components/Link'
import { Button } from '../../../../common/components/Buttons'
import Card from '../../components/Card'

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

const QR = (): JSX.Element => {
  const description = (
    <div className='max-w-330px'>
      As a more convenient way to backup your secrets, you can either click the
      button below to download a QR Code video, or make a video of the code on
      your smartphone camera. Then to restore, you can play the video on your
      phone and hold the phone screen up to your webcam. You can test that it
      worked by clicking{' '}
      <Link href='#' className='underline' variant='gray-77'>
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
      onClick={downloadQR}
    >
      Download QR Code Video
    </Button>
  )

  return (
    <Card
      title='Generate a QR Code Video'
      description={description}
      content={content}
      footer={footer}
    />
  )
}

export default QR
