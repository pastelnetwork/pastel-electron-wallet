import React, { useState, ChangeEvent, useCallback, memo } from 'react'
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
  onHideHeader?: (status: boolean) => void
  setPastelId?: (pastelId: string) => void
  callback?: () => void
}

const InputControl = memo(function InputControl({
  handlePdfChange,
}: {
  handlePdfChange: (val: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handlePdfChange(e)
  }, [])

  return (
    <input
      type='file'
      name='upload'
      accept='application/pdf'
      onChange={onChange}
      className='hidden'
    />
  )
})

function RestoreYourKeysButton({
  handleRestoreByUpload,
  fileSelected,
  disabled,
}: {
  handleRestoreByUpload: (val: File) => void
  fileSelected?: File
  disabled?: boolean
}): JSX.Element {
  const onClick = useCallback(() => {
    if (fileSelected) {
      handleRestoreByUpload(fileSelected)
    }
  }, [fileSelected])

  return (
    <Tooltip
      type='top'
      content={
        <div className='p-2 text-xs font-medium'>Restore your keys.</div>
      }
      width={130}
      vPosPercent={110}
    >
      <button
        onClick={onClick}
        className={cn(
          fileSelected && !disabled ? 'cursor-pointer' : 'cursor-not-allowed',
        )}
        type='button'
        disabled={!fileSelected || disabled}
      >
        <Refresh
          size={44}
          className={cn(
            'transition duration-300',
            !fileSelected || disabled
              ? 'text-blue-9b'
              : 'text-blue-e7 hover:text-blue-fa',
          )}
          pathColor={fileSelected && !disabled ? '#3F9AF7' : '#fff'}
        />
      </button>
    </Tooltip>
  )
}

export default function RestoreByPdf({
  onHideHeader,
  setPastelId,
  callback,
}: TRestoreByPdfProps): JSX.Element | null {
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [fileSelected, setFileSelected] = useState<File>()

  const doImport = async (value: string) => {
    const result = await doImportPrivKeys(value, setPastelId)
    if (result) {
      if (callback) {
        callback()
        return
      }
      setCurrentStatus('done')
    } else {
      setCurrentStatus('error')
    }
    if (onHideHeader) {
      onHideHeader(true)
    }
  }

  const handleRestoreByUpload = useCallback(async (file: File) => {
    if (file) {
      try {
        setCurrentStatus('restoring')
        const pdfPath: string = path.join(file.path).toString()
        if (pdfPath) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            '//mozilla.github.io/pdf.js/build/pdf.worker.js'
          const doc = await pdfjs.getDocument('file://' + pdfPath).promise
          const metaData = await doc.getMetadata()
          await doImport(metaData.info?.Keywords)
        }
      } catch {
        setCurrentStatus('error')
        if (onHideHeader) {
          onHideHeader(true)
        }
      }
    }
  }, [])

  const handlePdfChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList) {
      setFileSelected(fileList[0])
    }
  }, [])

  if (currentStatus === 'done') {
    return <RestoreSuccess />
  }

  if (currentStatus === 'error') {
    return <RestoreError />
  }

  const renderUploadPdfControl = () => {
    return (
      <label className='relative overflow-hidden flex'>
        <div className='w-[55px] cursor-pointer'>
          <PDF variant='secondary' size={55} />
        </div>
        <div className='flex flex-col justify-center max-w-278px cursor-pointer'>
          <p className='text-base font-medium text-gray-4a mb-0 truncate max-w-full'>
            {fileSelected ? fileSelected.name : 'Select your crypto keys.'}
          </p>
          {fileSelected ? (
            <p className='mb-0 text-xs font-normal text-gray-a0'>
              {formatFileSize(fileSelected.size)}
            </p>
          ) : null}
        </div>
        <InputControl handlePdfChange={handlePdfChange} />
      </label>
    )
  }

  const renderRestoreByPDFForm = () => (
    <div
      className={cn(
        'flex items-center justify-between w-full rounded-lg border border-gray-ec py-15px px-20px',
        currentStatus === 'restoring' && 'cursor-not-allowed',
      )}
    >
      <div className='w-3/4'>{renderUploadPdfControl()}</div>
      <div className='w-14'>
        <RestoreYourKeysButton
          handleRestoreByUpload={handleRestoreByUpload}
          fileSelected={fileSelected}
          disabled={currentStatus === 'restoring'}
        />
      </div>
    </div>
  )

  return (
    <div>
      <div className='font-normal text-h5 leading-6 text-gray-71'>
        Please select your crypto keys.
      </div>
      <div className='mt-3'>
        {renderRestoreByPDFForm()}
        {currentStatus === 'restoring' && (
          <div className='font-normal text-h5 leading-6 text-gray-71 mt-28px text-center'>
            Restoring ...
          </div>
        )}
      </div>
    </div>
  )
}

RestoreByPdf.defaultProps = {
  onHideHeader: undefined,
  setPastelId: undefined,
  callback: undefined,
}

RestoreYourKeysButton.defaultProps = {
  fileSelected: undefined,
  disabled: false,
}
