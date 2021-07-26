import React, { useState } from 'react'
import QRCode from 'qrcode.react'

import { PrevButton, NextButton } from './Buttons'
import Tooltip from 'common/components/Tooltip'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import { BackupMethods } from './Regiser.state'
import { DownloadArrow, PDF } from 'common/components/Icons'

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
    { label: 'Download PDF' },
    { label: 'QR-code' },
    { label: 'My Security', count: 12 },
  ]

  const onDownloadPdf = () => {
    setPdfPrepareProgress(65)
  }

  return (
    <div className='pt-16 flex flex-col h-full'>
      <div>
        <MultiToggleSwitch
          data={methods}
          activeIndex={props.backupMethod}
          onToggle={props.setBackupMethod}
          itemActiveClassName='bg-gray-4a rounded-full text-white'
          countInactiveClassName='bg-warning-hover font-extrabold'
        />
      </div>

      <div className='flex-grow'>
        {props.backupMethod === BackupMethods.PDF && (
          <div className='mt-14'>
            <h1 className='text-gray-4a text-h3 font-extrabold'>
              Crypt Keys backup method
            </h1>
            <h2 className='text-gray-71 text-sm font-normal'>
              Download PDF “paper wallet” file with keys for your PastelID
            </h2>

            <div className='mt-6 px-6 py-4 border border-gray-e1 flex items-center rounded-lg'>
              <PDF size={55} className='text-red-fa' />

              <div className='ml-4 mr-4'>
                <div className='text-base font-medium text-gray-4a'>
                  Crypto Keys
                </div>
                <div className='text-xs font-medium text-gray-a0'>0.5mb</div>
              </div>

              {pdfPrepareProgress === 0 && (
                <div className='flex-grow flex justify-end'>
                  <Tooltip
                    type='bottom'
                    width={98}
                    content='Download PDF'
                    vPosPercent={120}
                    classnames='font-extrabold py-2'
                  >
                    <button
                      className='w-12 h-12 rounded-full bg-gray-ebf2 flex justify-center items-center cursor-pointer'
                      onClick={() => onDownloadPdf()}
                    >
                      <DownloadArrow size={24} className='text-blue-3f' />
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
