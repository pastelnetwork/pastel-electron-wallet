import React, { useState } from 'react'
import path from 'path'
import pdfjs from 'pdfjs-dist'

import RestoreSuccess from './RestoreSuccess'
import RestoreError from './RestoreError'
import { doImportPrivKeys } from '../common/utils'
import { TRPCConfig } from '../../Profile'
import { Button } from '../../../../common/components/Buttons'
import Link from '../../../../common/components/Link'

type TRestoreByPdfProps = {
  rpcConfig: TRPCConfig
  onBack: () => void
}

export default function RestoreByPdf({
  rpcConfig,
  onBack,
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
    <div className='m-4'>
      <div className='text-gray-800 text-2xl font-extrabold mb-3'>
        Select PDF Keys
      </div>
      <div className='font-medium text-sm text-gray-33 opacity-50'>
        Please select your pdf file
      </div>
      <div className='mt-4'>
        <label className='bg-gray-71 w-full relative overflow-hidden px-2 h-10 flex items-center text-white font-medium'>
          <span className='truncate max-w-full'>
            {fileSelected ? fileSelected.name : 'Choose File'}
          </span>
          <input
            type='file'
            name='upload'
            accept='application/pdf'
            onChange={handlePdfChange}
            className='hidden'
          />
        </label>
      </div>
      <div className='mt-4'>
        <Button
          className='w-full font-extrabold'
          onClick={() => handleRestoreByUpload()}
          disabled={currentStatus === 'restoring'}
        >
          {currentStatus === 'restoring' ? 'Restoring' : 'Restore'}
        </Button>
      </div>
      <div className='mt-4 text-center'>
        <Link href='#' onClick={() => onBack()}>
          Or try another restore method
        </Link>
      </div>
    </div>
  )
}
