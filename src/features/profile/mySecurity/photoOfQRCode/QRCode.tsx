import React from 'react'
import QRCode from 'qrcode.react'

import Button from '../../../../common/components/MySecurity/Button/Button'
import Card from '../../../../common/components/MySecurity/Card'

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

const QR: React.FC = () => {
  const content = (
    <div className='flex justify-center h-348px rounded-8px py-33px px-42px bg-tab-hover'>
      <div className='flex w-full h-full bg-background-onboarding rounded-md justify-center items-center  min-w-128px'>
        <QRCode id='qrcode' value='https://explorer.pastel.network/' />
      </div>
    </div>
  )

  const footer = <Button onClick={downloadQR}>Download QR-code</Button>

  return (
    <Card
      title='Make a photo of QR-code'
      description='Take a photo of this with your smartphone to use as a backup in case you forget your password'
      content={content}
      footer={footer}
    />
  )
}

export default QR
