import React, { useState, useEffect } from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { useImagePreview } from './PreviewStep.service'
import { Crop } from 'common/components/Icons'
import Tooltip2 from '../../../../common/components/Tooltip2'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { useToggle } from 'react-use'
import Cropping from './Cropping'
import OptimizationSlider from './OptimizationSlider'
import { Button } from 'common/components/Buttons'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import FullScreenButton from '../fullScreenButton/FullScreenButton'
import Magnification from './Magnification'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import { formatFileSize, formatNumber } from 'common/utils/format'
import { getEstimateFee } from 'api/estimate-fee'
import { useAppSelector } from 'redux/hooks'
import { toast } from 'react-toastify'
import ImageShadow from '../common/ImageShadow'

type TPreviewStepProps = {
  state: TAddNFTState
  image: TImage
}

export default function PreviewStep({
  state: {
    goBack,
    setCrop,
    goToNextStep,
    qualityPercent,
    setOptimizedSizeKb,
    setQualityPercent,
    estimatedFee,
    setEstimatedFee,
  },
  image,
}: TPreviewStepProps): JSX.Element {
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [isLossLess, setLossLess] = useToggle(false)
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const [feePerKb, setFeePerKb] = useState<number>(0)
  const currencyName = 'PSL'
  const fileSizeKb = Math.round(image.file.size / 1024)
  const imageSizePercentOfAvg = 65

  const pastelConfig = useAppSelector(state => state.pastelConf)

  const getFee = async () => {
    const fee = await getEstimateFee(1, pastelConfig)
    if (fee > 0) {
      setFeePerKb(fee)
    } else {
      // -1.0 is returned if not enough transactions and blocks
      // have been observed to make an estimate
      setEstimatedFee(1)
      toast('Not enough transactions to make an estimate', {
        type: 'warning',
        autoClose: false,
      })
    }
  }

  const calcFee = (quality: number): number => {
    if (!feePerKb) {
      return 1
    }
    return Math.round(quality * fileSizeKb * feePerKb)
  }

  useEffect(() => {
    if (!feePerKb) {
      getFee()
    }
  }, [])

  useEffect(() => {
    setEstimatedFee(calcFee(fileSizeKb))
  }, [feePerKb])

  if (cropping && croppedImage) {
    return (
      <Cropping
        image={image}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        onClose={toggleCropping}
      />
    )
  }

  if (fullScreen) {
    return <FullScreenImage image={image.url} onClose={toggleFullScreen} />
  }

  const toggleLossless = (val: boolean) => {
    setLossLess(val)

    if (val) {
      setQualityPercent(100)
      setEstimatedFee(calcFee(fileSizeKb))
    }
  }

  const onChangeOptimization = (val: number): void => {
    setQualityPercent(val)
    setEstimatedFee(calcFee(val))
  }

  const submit = () => {
    if (croppedImage) {
      setCrop(croppedImage.crop)

      if (qualityPercent < 100) {
        // TODO: optimize image to size

        setEstimatedFee(calcFee(qualityPercent))
      }

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
                isLossLess={isLossLess}
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
            <img ref={setImageElement} src={image.url} className='rounded' />
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
              {formatNumber(estimatedFee)} {currencyName}
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
              toggleHandler={toggleLossless}
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
              calcFee={calcFee}
              quality={qualityPercent}
              onChange={onChangeOptimization}
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
              onClick={submit}
              disabled={!croppedImage || Boolean(croppedImage.error)}
            >
              Go to Overview
            </Button>
          </div>
        </div>
      }
    />
  )
}
