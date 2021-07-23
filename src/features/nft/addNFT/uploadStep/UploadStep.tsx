import React, { useState } from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { ArrowSlim, Info } from 'common/components/Icons'
import { Button } from 'common/components/Buttons'
import UploadingCircle from './UploadingCircle'
import UploadArea from './UploadArea'
import { formatFileSize } from 'common/utils/format'
import { useSubmit } from './UploadStep.service'

type TUploadStepProps = {
  state: TAddNFTState
}

export type TImageFile = {
  file: File
  url: string
  width: number
  height: number
}

export default function UploadStep({ state }: TUploadStepProps): JSX.Element {
  const [imageFile, setFile] = useState<TImageFile>()
  const [isReady, setReady] = useState(Boolean(state.image))

  const submit = useSubmit(state, imageFile)

  return (
    <ModalLayout
      title='Upload Image'
      titleClass='mb-3'
      subtitle='The Image File for your NFT'
      step={2}
      fixedHeight
      contentClass='pt-2'
      leftColumnWidth={320}
      leftColumnContent={
        imageFile || isReady ? (
          <UploadingCircle
            file={imageFile}
            setFile={setFile}
            isReady={isReady}
            setReady={setReady}
          />
        ) : (
          <UploadArea setFile={setFile} />
        )
      }
      rightColumnClass='w-[355]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div className='text-sm'>
            <div className='flex items-center text-gray-71 font-medium mb-2'>
              Upload Image File
              <Info size={18} className='ml-3' />
            </div>
            <div className='relative h-10 text-gray-a0 flex items-center px-4 mb-4'>
              <div className='absolute inset-0 border border-gray-8e opacity-20 rounded font-medium shadow-4px' />
              {imageFile ? formatFileSize(imageFile.file.size) : 'max 100 mb'}
            </div>
            <div className='text-gray-71 mb-2'>
              Please take into account that image file size affects the
              registration fee.
            </div>
            <div className='text-gray-71 mb-2'>
              For example, 0,5 mb costs 1,000 PSL, 5 mb - 10,000 PSL
            </div>
          </div>
          <div className='flex-between'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={state.goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <Button
              className='font-extrabold px-6'
              onClick={submit}
              disabled={!isReady}
            >
              Go to Image Optimization
            </Button>
          </div>
        </div>
      }
    />
  )
}
