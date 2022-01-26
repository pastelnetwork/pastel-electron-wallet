import ModalLayout from '../common/ModalLayout'
import ImageShadow from '../common/ImageShadow'
import Magnification from './Magnification'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import Tooltip2 from 'common/components/Tooltip2'
import { ArrowSlim, Crop } from 'common/components/Icons'
import { formatFileSize, formatNumber } from 'common/utils/format'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import OptimizationSlider from './OptimizationSlider'
import React, { useCallback, useEffect, useState } from 'react'
import {
  calculateFee,
  CroppedValidatedImage,
  useStorageFee,
} from './PreviewStep.service'
import { TAddNFTState, TImage } from '../AddNFT.state'
import { useCurrencyName } from 'common/hooks/appInfo'
import { setSelectedFile } from '../AddNFT.store'
import { translate } from 'features/app/translations'

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
  const imageSizePercentOfAvg = 65
  const storageFee = useStorageFee()
  const currencyName = useCurrencyName()
  const quality = state.optimizationService.selectedFile?.quality || 100
  const lossLess = quality === 100 || state.isLossLess
  const fee = calculateFee({
    networkFee: storageFee?.networkFee,
    fileSizeKb: state.optimizationService.selectedFile?.size || image.size,
  })

  useEffect(() => state.setEstimatedFee(fee), [fee])
  const submittable = croppedImage && !croppedImage.error

  const submit = () => {
    if (croppedImage && submittable) {
      setSelectedFile(state.optimizationService.selectedFile)
      state.goToNextStep()
    }
  }

  const handleBack = useCallback(() => {
    state.goBack()
  }, [])

  const strImageSizePercentOfAvg: string = imageSizePercentOfAvg?.toString()

  const renderImageSizePercentOfAvg = () => (
    <div className='flex-grow'>
      <div className='bg-gray-e4 bg-opacity-50 rounded h-2 relative my-2'>
        <div
          className='absolute top-0 left-0 bottom-0 rounded bg-green-62'
          style={{ width: strImageSizePercentOfAvg + '%' }}
        />
      </div>
      <div className='text-xs text-gray-a0 font-normal'>
        {translate('imageSizePercentOfAvg', { imageSizePercentOfAvg })}
      </div>
    </div>
  )

  const renderGoToOverview = () => (
    <div className='flex-between pt-18px'>
      <button
        type='button'
        className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
        onClick={handleBack}
      >
        <ArrowSlim to='left' size={14} />
      </button>
      <button
        type='button'
        className='btn btn-primary px-[30px]'
        onClick={submit}
        disabled={!submittable}
      >
        {translate('goToOverview')}
      </button>
    </div>
  )

  const handleToggleHandler = useCallback(
    (val: boolean) => {
      if (val) {
        const { files } = state.optimizationService
        if (files) {
          const index = files.length
          const file = files[index]
          state.optimizationService.setSelectedFile(file && { ...file, index })
        }
      }
      state.setIsLossLess(val)
    },
    [state.isLossLess, state.optimizationService],
  )

  return (
    <ModalLayout
      title={translate('imagePreview')}
      titleClassName='text-gray-2d font-extrabold text-2xl mb-3'
      subtitle={translate('previewStepModalDescription')}
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
                optimizedImage={state.optimizationService.selectedFile}
                imageElement={imageElement}
                isLossLess={lossLess}
              />
            )}
            <FullScreenButton onClick={toggleFullScreen} />
            <Tooltip2 text={translate('cropThumbnail')}>
              {ref => (
                <button
                  ref={ref}
                  className='absolute z-10 bottom-3.5 left-3.5 w-10 h-10 text-white flex-center rounded-full bg-gray-2d bg-opacity-50'
                  onClick={toggleCropping}
                  type='button'
                >
                  <Crop size={18} />
                </button>
              )}
            </Tooltip2>
            <img
              ref={setImageElement}
              src={displayUrl}
              className='rounded'
              alt='Pastel'
            />
          </div>
        </div>
      }
      rightColumnContent={
        <div>
          <div className='flex items-start mb-8'>
            <div className='font-medium text-gray-4a mr-5'>
              {translate('cropThumbnail')}
            </div>
            <div className='text-gray-2d text-sm font-extrabold mr-3 relative top-[3px]'>
              {formatFileSize(
                state.optimizationService.selectedFile?.size || image.size,
              )}
            </div>
            {renderImageSizePercentOfAvg()}
          </div>
          <div className='flex-between mb-5 text-base'>
            <div className='text-gray-4a font-medium'>
              {translate('estimatedRegistrationFee')}
            </div>
            <div className='text-gray-2d font-extrabold'>
              {state.estimatedFee === undefined
                ? translate('unknown')
                : `${formatNumber(state.estimatedFee)} ${currencyName}`}
            </div>
          </div>
          <div className='font-medium text-gray-4a mb-5'>
            {translate('imageSizeAndFeeOptimization')}
          </div>
          <div className='flex items-center mb-10'>
            <div className='font-medium text-gray-71 mr-3'>
              {translate('losslessImageQuality')}
            </div>
            <Toggle
              selected={state.isLossLess}
              toggleHandler={handleToggleHandler}
              selectedClass='bg-blue-3f'
            />
          </div>
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
              {translate('thumbnailPreview')}
            </div>
            <div className='w-48 h-48 relative'>
              {croppedImage && (
                <>
                  <ImageShadow url={state.thumbnail || croppedImage.src} />
                  <img
                    src={state.thumbnail || croppedImage.src}
                    className='rounded w-full h-full relative z-10'
                    alt='Pastel Network'
                  />
                </>
              )}
            </div>
            {croppedImage?.error && (
              <div className='text-sm text-error font-medium mt-3'>
                {croppedImage?.error}
              </div>
            )}
          </div>
          {renderGoToOverview()}
        </div>
      }
    />
  )
}
