import React, { useState } from 'react'
import path from 'path'
import pdfjs from 'pdfjs-dist'
import cn from 'classnames'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import { doImportPrivKeys } from '../common/utils'
import { Refresh, PDF } from 'common/components/Icons'
import { formatFileSize } from 'common/utils/format'
import Tooltip from 'common/components/Tooltip'

type TRestoreByPdfProps = {
  onHideHeader: (status: boolean) => void
}

export default function RestoreByPdf({
  onHideHeader,
}: TRestoreByPdfProps): JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [fileSelected, setFileSelected] = useState<File>()

  const doImport = async (value: string) => {
    const result = await doImportPrivKeys(value)
    if (result) {
      setCurrentStatus('done')
    } else {
      setCurrentStatus('error')
    }
    onHideHeader(true)
  }

  const handleRestoreByUpload = async () => {
    if (fileSelected) {
      try {
        setCurrentStatus('restoring')
        const pdfPath = path.join(fileSelected.path)
        if (pdfPath) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            '//mozilla.github.io/pdf.js/build/pdf.worker.js'
          const doc = await pdfjs.getDocument('file://' + pdfPath).promise
          const metaData = await doc.getMetadata()
          doImport(metaData.info?.Keywords)
        }
      } catch {
        setCurrentStatus('error')
        onHideHeader(true)
      }
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList) {
      setFileSelected(fileList[0])
    }
  }

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  if (currentStatus === 'error') {
    return <RestoreError />
  }

  return (
    <div>
      <div className='font-normal text-h5 leading-6 text-gray-71'>
        Please select your crypto keys.
      </div>
      <div className='mt-3'>
        <div
          className={cn(
            'flex items-center justify-between w-full rounded-lg border border-gray-ec py-15px px-20px',
            currentStatus === 'restoring' && 'cursor-not-allowed',
          )}
        >
          <div className='w-3/4'>
            <label className='relative overflow-hidden flex'>
              <div className='w-[55px] cursor-pointer'>
                <PDF variant='secondary' size={55} />
              </div>
              <div className='flex flex-col justify-center max-w-278px cursor-pointer'>
                <p className='text-base font-medium text-gray-4a mb-0 truncate max-w-full'>
                  {fileSelected
                    ? fileSelected.name
                    : 'Select your crypto keys.'}
                </p>
                {fileSelected ? (
                  <p className='mb-0 text-xs font-normal text-gray-a0'>
                    {formatFileSize(fileSelected.size)}
                  </p>
                ) : null}
              </div>
              <input
                type='file'
                name='upload'
                accept='application/pdf'
                onChange={handlePdfChange}
                className='hidden'
              />
            </label>
          </div>
          <div className='w-14'>
            <Tooltip
              type='top'
              content={
                <div className='p-2 text-xs font-medium'>
                  Restore your keys.
                </div>
              }
              width={130}
              vPosPercent={110}
            >
              <span
                onClick={handleRestoreByUpload}
                className={cn(
                  fileSelected ? 'cursor-pointer' : 'cursor-not-allowed',
                )}
              >
                <Refresh
                  size={44}
                  className={cn(
                    'transition duration-300',
                    !fileSelected
                      ? 'text-blue-9b'
                      : 'text-blue-e7 hover:text-blue-fa',
                  )}
                  pathColor={fileSelected ? '#3F9AF7' : '#fff'}
                />
              </span>
            </Tooltip>
          </div>
        </div>
        {currentStatus === 'restoring' && (
          <div className='font-normal text-h5 leading-6 text-gray-71 mt-28px text-center'>
            Restoring ...
          </div>
        )}
      </div>
    </div>
  )
}
