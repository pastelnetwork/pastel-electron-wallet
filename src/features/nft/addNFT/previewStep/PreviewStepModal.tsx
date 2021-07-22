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
import { Button } from 'common/components/Buttons'
import React, { useEffect, useState } from 'react'
import {
  calculateFee,
  CroppedValidatedImage,
  optimizeImage,
  useFeePerKb,
} from './PreviewStep.service'
import { useDebounce } from 'react-use'
import { TAddNFTState, TImage } from '../AddNFT.state'
import { currencyName } from '../AddNft.constants'
import { toast } from 'react-toastify'
import Spinner from 'common/components/Spinner'

type TPreviewStepModalProps = {
  state: TAddNFTState
  image: TImage
  croppedImage: CroppedValidatedImage | undefined
  toggleCropping(): void
  toggleFullScreen(): void
}

const qualityDebounceMs = 300

export default function PreviewStepModal({
  state: {
    goBack,
    setCrop,
    goToNextStep,
    qualityPercent,
    isLossLess,
    setOptimizedSizeKb,
    setQualityPercent,
    setIsLossLess,
    estimatedFee,
    setEstimatedFee,
    setOptimizedImageURL,
  },
  image,
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
  const fee = calculateFee({
    feePerKb,
    quality: qualityPercent,
    isLossLess,
    fileSizeKb,
  })

  useEffect(() => setEstimatedFee(fee), [fee])

  const [quality, setQuality] = useState(qualityPercent)
  const [optimizingState, setOptimizingState] = useState<
    'initial' | 'pending' | 'success' | 'fail'
  >('initial')
  useDebounce(
    async () => {
      setQualityPercent(quality)
      setOptimizingState('pending')
      try {
        const result = await optimizeImage(image, quality, setOptimizedImageURL)

        if (result?.status !== 'cancelled') {
          setOptimizingState('success')
        }
      } catch (error) {
        setOptimizingState('fail')
        console.error(error)
        toast.error('Error optimizing image')
      }
    },
    qualityDebounceMs,
    [quality],
  )

  const submittable =
    croppedImage &&
    !croppedImage.error &&
    (isLossLess || qualityPercent === 100 || optimizingState === 'success')

  const submit = () => {
    if (croppedImage && submittable) {
      setCrop(croppedImage.crop)

      setOptimizedSizeKb(fileSizeKb * qualityPercent)
      goToNextStep()
    }
  }

  return (
    <ModalLayout
      title='Image preview'
      titleClass='mb-3'
      subtitle='Description'
      step={3}
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='relative'>
          <ImageShadow url={image.url} />
          <div className='relative z-10'>
            {imageElement && (
              <Magnification
                image={image}
                imageElement={imageElement}
                isLossLess={quality === 100 || isLossLess}
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
              src={image.displayUrl}
              className='rounded'
            />
          </div>
        </div>
      }
      rightColumnContent={
        <div>
          <div className='flex items-start mb-8'>
            <div className='font-medium text-gray-4a mr-5'>Image size</div>
            <div className='text-gray-2d text-sm font-extrabold mr-3 relative top-[3px]'>
              {formatFileSize(image.file.size)}
            </div>
            <div className='flex-grow'>
              <div className='bg-gray-e4 bg-opacity-50 rounded h-2 relative my-2'>
                <div
                  className='absolute top-0 left-0 bottom-0 rounded bg-green-62'
                  style={{ width: imageSizePercentOfAvg + '%' }}
                />
              </div>
              <div className='text-xs text-gray-71'>
                {imageSizePercentOfAvg}% of average Pastel NFT size
              </div>
            </div>
          </div>
          <div className='flex-between mb-5'>
            <div className='font-medium text-gray-4a'>
              Estimated registration fee
            </div>
            <div className='text-gray-2d text-sm font-extrabold'>
              {estimatedFee === undefined
                ? 'unknown'
                : `${formatNumber(estimatedFee)} ${currencyName}`}
            </div>
          </div>
          <div className='font-medium text-gray-4a mb-5'>
            Image size and fee optimization
          </div>
          <label className='flex items-center mb-10'>
            <div className='font-medium text-gray-71 mr-3'>
              Lossless image quality
            </div>
            <Toggle
              selected={isLossLess}
              toggleHandler={setIsLossLess}
              selectedClass='bg-blue-3f'
            />
          </label>
          <div
            className={cn(
              'pb-5 mb-5 duration-200 transition',
              isLossLess ? 'opacity-0' : 'opacity-100',
            )}
          >
            <OptimizationSlider
              imageType={image.file.type}
              fee={fee}
              quality={quality}
              onChange={setQuality}
              currencyName={currencyName}
            />
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
              onClick={goBack}
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
              {optimizingState === 'pending' && (
                <Spinner className='w-8 h-8 mr-2' />
              )}
              Go to Overview
            </Button>
          </div>
        </div>
      }
    />
  )
}
