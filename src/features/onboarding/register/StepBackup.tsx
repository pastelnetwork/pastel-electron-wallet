import React, { useState } from 'react'
import cn from 'classnames'
import QRCode from 'qrcode.react'

import icoPdf from 'common/assets/icons/ico-pdf.svg'
import icoDownload from 'common/assets/icons/ico-download-2.svg'
import { PrevButton, NextButton } from './Buttons'
import Tooltip from 'common/components/Tooltip'
import { BackupMethods } from './Regiser.state'

export type TStepBackupMethodProps = {
  backupMethod: BackupMethods
  setBackupMethod(val: BackupMethods): void
  goToNextStep(): void
  goBack(): void
}

const StepBackupMethod = (props: TStepBackupMethodProps): JSX.Element => {
  const [pdfPrepareProgress, setPdfPrepareProgress] = useState<number>(0)

  const nextActive = true
  const methods = [
    {
      name: 'Download PDF',
      method: BackupMethods.PDF,
    },
    {
      name: 'QR-code',
      method: BackupMethods.QR,
    },
  ]

  const onDownloadPdf = () => {
    // prepare PDF
    setPdfPrepareProgress(65)
  }

  return (
    <div className='pt-16 flex flex-col h-full'>
      <div>
        <div className='rounded-full border border-gray-eb p-1 inline-flex'>
          {methods.map((item, i) => (
            <div
              key={i}
              className={cn(
                'font-extrabold text-sm rounded-full px-3 py-1.5 cursor-pointer transition-colors',
                props.backupMethod === item.method
                  ? 'bg-gray-35 text-white'
                  : 'text-gray-71',
              )}
              onClick={() => props.setBackupMethod(item.method)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className='flex-grow'>
        {props.backupMethod === BackupMethods.PDF && (
          <div className='mt-14'>
            <h1 className='text-gray-23 text-xl font-black'>
              Crypt keys backup method
            </h1>
            <h2 className='text-gray-77 text-sm font-normal'>
              Download PDF “paper wallet” file with keys for your PastelID
            </h2>

            <div className='mt-6 px-6 py-4 border border-gray-e1 flex items-center rounded-lg'>
              <img src={icoPdf} className='w-14' />

              <div className='ml-4 mr-4'>
                <div className='text-base font-medium text-gray-1f'>
                  Crypto keys
                </div>
                <div className='text-sm font-medium text-gray-8e'>0.5mb</div>
              </div>

              {pdfPrepareProgress === 0 && (
                <div className='flex-grow flex justify-end'>
                  <Tooltip
                    type='bottom'
                    width={110}
                    content='Download PDF'
                    vPosPercent={120}
                    classnames='font-extrabold'
                  >
                    <button
                      className='w-12 h-12 rounded-full bg-gray-ebf2 flex justify-center items-center cursor-pointer'
                      onClick={() => onDownloadPdf()}
                    >
                      <img src={icoDownload} className='w-5 cursor-pointer' />
                    </button>
                  </Tooltip>
                </div>
              )}

              {pdfPrepareProgress > 0 && (
                <div className='flex-grow flex items-center justify-end'>
                  <div className='h-1.5 w-20 rounded-full bg-green-e4 mr-3 overflow-hidden'>
                    <div
                      className='h-1.5 rounded-full bg-green-77'
                      style={{ width: pdfPrepareProgress + '%' }}
                    ></div>
                  </div>
                  <span className='font-extrabold text-sm'>
                    {pdfPrepareProgress}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {props.backupMethod === BackupMethods.QR && (
          <div className='mt-14'>
            <h1 className='text-gray-23 text-xl font-black'>
              QR-Code Backup Method
            </h1>
            <h2 className='text-gray-77 text-sm font-normal'>
              Save QR Code Video to a Secure Place, or Take a Video
              <br />
              of Changing Code with your Smartphone:
            </h2>

            <div className='mt-5 p-5 border border-gray-e1 flex rounded-md justify-center shadow-textbox'>
              <QRCode
                size={180}
                value='sa98d7samd21m7382713987128n37n9821n73981273987128nb37982173bn98172b397828b13798721b3987218b47847b982b1n9c87nb9821nb492871498127sa98d7samd21m7382713987128n37n9821n73981273987128nb37982173bn98172b397828b13798721b3987218b47847b982b1n9c87nb9821nb492871498127sa98d7samd21m7382713987128n37n9821n73981273987128nb37982173bn98172b397828b13798721b3987218b47847b982b1n9c87nb9821nb492871498127sa98d7samd21m7382713987128n37n9821n73981273987128nb37982173bn98172b397828b13798721b3987218b47847b982b1n9c87nb9821nb492871498127'
              />
            </div>
          </div>
        )}
      </div>

      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          onClick={() => props.goToNextStep()}
          text='Next step 3'
          disabled={!nextActive}
        />
      </div>
    </div>
  )
}

export default StepBackupMethod
