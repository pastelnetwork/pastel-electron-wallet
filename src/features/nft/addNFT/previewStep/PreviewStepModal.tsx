import ModalLayout from '../common/ModalLayout'
import ImageShadow from '../common/ImageShadow'
import Magnification from './Magnification'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import Tooltip2 from 'common/components/Tooltip2'
import { ArrowSlim, Crop } from 'common/components/Icons'
import style from './PreviewStep.module.css'
import { formatFileSize, formatNumber } from 'common/utils/format'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import OptimizationSlider from './OptimizationSlider'
import { Button } from 'common/components/Buttons'
import React, { useEffect, useState } from 'react'
import {
  calculateFee,
  CroppedValidatedImage,
  useFeePerKb,
} from './PreviewStep.service'
import { TAddNFTState, TImage } from '../AddNFT.state'
import { useCurrencyName } from 'common/hooks/appInfo'

type TPreviewStepModalProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
  croppedImage: CroppedValidatedImage | undefined
  toggleCropping(): void
  toggleFullScreen(): void
}

export default function PreviewStepModal({
  state,
  image,
  displayUrl,
  croppedImage,
  toggleCropping,
  toggleFullScreen,
}: TPreviewStepModalProps): JSX.Element {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const fileSizeKb = Math.round(image.file.size / 1024)
  const imageSizePercentOfAvg = 65
  const feePerKb = useFeePerKb()
  const currencyName = useCurrencyName()

  const quality = state.optimizationState.selectedFile?.quality || 100
  const lossLess = quality === 100 || state.isLossLess

  const fee = calculateFee({
    feePerKb,
    quality,
    isLossLess: state.isLossLess,
    fileSizeKb,
  })

  useEffect(() => state.setEstimatedFee(fee), [fee])

  const submittable = croppedImage && !croppedImage.error

  const submit = () => {
    if (croppedImage && submittable) {
      state.setCrop(croppedImage.crop)
      state.goToNextStep()
    }
  }

  return (
    <ModalLayout
      title='Image Preview'
      titleClassName='text-gray-2d font-extrabold text-2xl mb-3'
      subtitle='Description'
      subtitleClassName='text-gray-71 text-sm font-medium mb-3'
      step={3}
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='relative'>
          <ImageShadow url={image.url} />
          <div className='relative z-10'>
            {imageElement && (
              <Magnification
                image={image}
                optimizedImage={state.optimizationState.selectedFile}
                imageElement={imageElement}
                isLossLess={lossLess}
              />
            )}
            <FullScreenButton onClick={toggleFullScreen} />
            <Tooltip2 text='Crop thumbnail'>
              {ref => (
                <button
                  ref={ref}
                  className='absolute z-10 bottom-3.5 left-3.5 w-10 h-10 text-white flex-center rounded-full bg-gray-2d bg-opacity-50'
                  onClick={toggleCropping}
                >
                  <Crop size={18} />
                </button>
              )}
            </Tooltip2>
            <img
              ref={setImageElement}
              src={displayUrl}
              className={`rounded ${style.zoomInCursor}`}
            />
          </div>
        </div>
      }
      rightColumnContent={
        <div>
          <div className='flex items-start mb-8'>
            <div className='font-medium text-gray-4a mr-5'>Image size</div>
            <div className='text-gray-2d text-sm font-extrabold mr-3 relative top-[3px]'>
              {formatFileSize(
                state.optimizationState.selectedFile?.size || image.file.size,
              )}
            </div>
            <div className='flex-grow'>
              <div className='bg-gray-e4 bg-opacity-50 rounded h-2 relative my-2'>
                <div
                  className='absolute top-0 left-0 bottom-0 rounded bg-green-62'
                  style={{ width: imageSizePercentOfAvg + '%' }}
                />
              </div>
              <div className='text-xs text-gray-a0 font-normal'>
                {imageSizePercentOfAvg}% of average Pastel NFT size
              </div>
            </div>
          </div>
          <div className='flex-between mb-5 text-base'>
            <div className='font-medium text-gray-4a font-medium'>
              Estimated registration fee
            </div>
            <div className='text-gray-2d font-extrabold'>
              {state.estimatedFee === undefined
                ? 'unknown'
                : `${formatNumber(state.estimatedFee)} ${currencyName}`}
            </div>
          </div>
          <div className='font-medium text-gray-4a mb-5'>
            Image Size and Fee Optimization
          </div>
          <label className='flex items-center mb-10'>
            <div className='font-medium text-gray-71 mr-3'>
              Lossless Image Quality
            </div>
            <Toggle
              selected={state.isLossLess}
              toggleHandler={state.setIsLossLess}
              selectedClass='bg-blue-3f'
            />
          </label>
          <div
            className={cn(
              'pb-5 mb-6 duration-200 transition',
              state.isLossLess ? 'opacity-0' : 'opacity-100',
            )}
          >
            <OptimizationSlider state={state} image={image} fee={fee} />
          </div>
          <div>
            <div className='font-medium text-gray-71 mb-3'>
              Thumbnail preview
            </div>
            <div className='w-48 h-48 relative'>
              {croppedImage && (
                <>
                  <ImageShadow url={croppedImage.src} />
                  <img
                    src={croppedImage.src}
                    className='rounded w-full h-full'
                  />
                </>
              )}
            </div>
            {croppedImage?.error && (
              <div className='text-sm text-error font-medium mt-3'>
                Error text error text
              </div>
            )}
          </div>
          <div className='flex-between pt-18px'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={state.goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <Button
              type='button'
              className='font-extrabold px-6'
              childrenClassName='flex-center'
              onClick={submit}
              disabled={!submittable}
            >
              Go to Overview
            </Button>
          </div>
        </div>
      }
    />
  )
}
