import React from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { ArrowSlim, Info, UploadFile } from 'common/components/Icons'
import SelectImageArea from './SelectImageArea'
import { formatFileSize } from 'common/utils/format'
import { useSelectImageService } from './SelectImageStep.service'
import { allowedTypeNames, ImageType } from '../AddNft.constants'
import ImageShadow from '../common/ImageShadow'
import Spinner from 'common/components/Spinner'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TSelectStepProps = {
  state: TAddNFTState
}

export type TImageFile = TImage & {
  arrayBuffer: ArrayBuffer
}

export default function SelectImageStep({
  state,
}: TSelectStepProps): JSX.Element {
  const service = useSelectImageService(state)
  const {
    imageForPreview,
    selectedFile,
    error,
    isProcessing,
    imageToConvert,
    isAnimated,
  } = service

  const size = imageForPreview?.size || selectedFile?.size
  const currencyName = useCurrencyName()

  return (
    <ModalLayout
      title='Select Image'
      titleClass='mb-3'
      subtitle='The Image File for your NFT'
      step={2}
      fixedHeight
      contentClass='pt-2'
      leftColumnWidth={imageForPreview?.maxWidth || 320}
      leftColumnContent={
        <SelectImageArea service={service}>
          {imageForPreview ? (
            <div className='relative'>
              <ImageShadow url={imageForPreview.url} />
              <img
                src={imageForPreview.url}
                style={{ maxWidth: `${imageForPreview.maxWidth}px` }}
                className='relative z-10 rounded'
              />
            </div>
          ) : (
            <div className='bg-gray-f4 rounded-md h-full flex-center flex-col text-gray-77 text-xs'>
              {isProcessing ? (
                <>
                  <div className='mb-2'>
                    <Spinner />
                  </div>
                  <div className='text-sm'>Processing file...</div>
                </>
              ) : (
                <>
                  <UploadFile size={22} className='mb-3' />
                  <div className='mb-2'>
                    {allowedTypeNames.join(', ')} Max 100 MB.
                  </div>
                  <div className='text-gray-a0'>
                    Drag or choose your file to select
                  </div>
                </>
              )}
            </div>
          )}
        </SelectImageArea>
      }
      rightColumnClass='w-[355]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div className='text-sm'>
            <div className='flex items-center text-gray-71 font-medium mb-2'>
              Select Image File
              <Info size={18} className='ml-3' />
            </div>
            <div className='relative h-10 text-gray-a0 flex items-center px-4 mb-4'>
              <div className='absolute inset-0 border border-gray-8e opacity-20 rounded font-medium shadow-4px' />
              {size ? formatFileSize(size) : 'max 100 mb'}
            </div>
            <div className='text-gray-71 mb-2'>
              Please take into account that image file size affects the
              registration fee.
            </div>
            <div className='text-gray-71 mb-4'>
              For example, 0,5 mb costs 1,000 {currencyName}, 5 mb - 10,000{' '}
              {currencyName}
            </div>
            {imageToConvert && (
              <>
                <div className='mb-3 text-gray-4a space-y-2'>
                  <div>Sorry! Only jpg or png image files are supported.</div>
                  {isAnimated && (
                    <div>
                      Animations are currently not supported, but image can be
                      converted to static image.
                    </div>
                  )}
                  <div>Would you like to convert your image?</div>
                </div>
                <div className='flex'>
                  <button
                    type='button'
                    className='btn btn-primary px-4 mr-2'
                    onClick={() =>
                      service.convertImage(imageToConvert, ImageType.PNG)
                    }
                  >
                    Convert to PNG
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary px-4'
                    onClick={() =>
                      service.convertImage(imageToConvert, ImageType.JPG)
                    }
                  >
                    Convert to JPG
                  </button>
                </div>
              </>
            )}
            {error && (
              <div className='text-red-fe font-medium mt-2 text-md'>
                {error}
              </div>
            )}
          </div>
          <div className='flex-between'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={state.goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <button
              className='btn btn-primary px-[30px]'
              onClick={service.submit}
              disabled={!imageForPreview}
            >
              Go to Image Optimization
            </button>
          </div>
        </div>
      }
    />
  )
}
