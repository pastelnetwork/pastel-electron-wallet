import React, { useState } from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { ArrowSlim, Info } from 'common/components/Icons'
import { Button } from 'common/components/Buttons'
import UploadingCircle from './UploadingCircle'
import UploadArea from './UploadArea'
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
      title='Select Image'
      titleClass='mb-3'
      subtitle='The Image File for your NFT'
      subtitleClassName='font-medium text-gray-71 text-sm'
      titleClassName='text-gray-800 text-2xl font-extrabold mb-[11px]'
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
      rightColumnClass='w-[355px]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div className='text-sm'>
            <div className='flex items-center text-gray-71 font-medium mb-3 text-base'>
              Upload Image File (max 100 mb)
              <Info size={18} className='ml-3' />
            </div>
            <div className='text-gray-71 mb-3 leading-5 text-sm'>
              Please take into consideration that the image file size impacts
              the registeration fee.
            </div>
            <div className='text-gray-71 mb-2'>
              For example, 0.5 mb costs 1,000 PSL, 5 mb - 10,000 PSL
            </div>
          </div>
          <div className='flex-between'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={state.goBack}
            >
              <ArrowSlim to='left' size={18} />
            </button>
            <Button
              className='font-medium px-6'
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
