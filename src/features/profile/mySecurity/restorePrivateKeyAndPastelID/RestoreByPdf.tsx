import React, { useState } from 'react'
import path from 'path'
import pdfjs from 'pdfjs-dist'
import cn from 'classnames'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import { doImportPrivKeys } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import { Upload, PDF } from 'common/components/Icons'
import { formatFileSize } from 'common/utils/format'
import Tooltip from 'common/components/Tooltip'

type TRestoreByPdfProps = {
  rpcConfig: TRPCConfig
}

export default function RestoreByPdf({
  rpcConfig,
}: TRestoreByPdfProps): JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [fileSelected, setFileSelected] = useState<File>()

  const doImport = async (value: string) => {
    const result = await doImportPrivKeys(value, rpcConfig)
    if (result) {
      setCurrentStatus('done')
    } else {
      setCurrentStatus('error')
    }
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
        <div className='flex items-center justify-between w-full rounded-lg border border-gray-ec py-15px px-20px'>
          <label
            className={cn(
              'w-3/4 relative overflow-hidden flex cursor-pointer',
              !fileSelected && 'cursor-pointer',
            )}
          >
            <div className='w-55px'>
              <PDF variant='secondary' size={55} />
            </div>
            <div className='flex flex-col justify-center max-w-278px'>
              <p className='text-base font-medium text-gray-4a mb-0 truncate max-w-full'>
                {fileSelected ? fileSelected.name : 'Select your crypto keys.'}
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
          <div className='w-14'>
            <Tooltip
              type='top'
              content={
                <div className='p-2 text-xs font-medium'>
                  Select your crypto keys.
                </div>
              }
              width={160}
            >
              <span
                onClick={handleRestoreByUpload}
                className={cn(
                  fileSelected ? 'cursor-pointer' : 'cursor-not-allowed',
                )}
              >
                <Upload size={44} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
