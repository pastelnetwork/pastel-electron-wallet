import React, { useState } from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../ModalLayout'
import { useImagePreview } from './PreviewStep.service'
import { Crop } from 'common/components/Icons'
import Tooltip from '../tooltip'
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
import style from './PreviewStep.module.css'

type TPreviewStepProps = {
  state: TAddNFTState
  image: TImage
}

export default function PreviewStep({
  state: { goBack, setCrop, goToNextStep },
  image,
}: TPreviewStepProps): JSX.Element {
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [isLossLess, setLossLess] = useToggle(false)
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null,
  )

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

  const submit = () => {
    if (croppedImage) {
      setCrop(croppedImage.crop)
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
        <div className='relative z-10'>
          {imageElement && (
            <Magnification
              image={image}
              imageElement={imageElement}
              isLossLess={isLossLess}
            />
          )}
          <FullScreenButton onClick={toggleFullScreen} />
          <Tooltip text='Crop thumbnail'>
            {ref => (
              <button
                ref={ref}
                className='absolute z-10 bottom-3.5 left-3.5 w-10 h-10 text-white flex-center rounded-full bg-gray-2d bg-opacity-50'
                onClick={toggleCropping}
              >
                <Crop size={18} />
              </button>
            )}
          </Tooltip>
          <img
            ref={setImageElement}
            src={image.url}
            className={`rounded ${style.zoomInCursor}`}
          />
        </div>
      }
      rightColumnContent={
        <div>
          <div className='flex items-start mb-8'>
            <div className='font-medium text-gray-4a mr-5'>Image size</div>
            <div className='text-gray-2d text-sm font-extrabold mr-3 relative top-[3px]'>
              50 Mb
            </div>
            <div className='flex-grow'>
              <div className='bg-gray-e4 bg-opacity-50 rounded h-2 relative my-2'>
                <div
                  className='absolute top-0 left-0 bottom-0 rounded bg-green-62'
                  style={{ width: '65%' }}
                />
              </div>
              <div className='text-xs text-gray-71'>
                65% of average Pastel NFT size
              </div>
            </div>
          </div>
          <div className='flex-between mb-5'>
            <div className='font-medium text-gray-4a'>
              Estimated registration fee
            </div>
            <div className='text-gray-2d text-sm font-extrabold'>5,000 PSL</div>
          </div>
          <div className='font-medium text-gray-4a mb-5'>
            Image size and fee optimization
          </div>
          <label className='flex items-center mb-10'>
            <div className='font-medium text-gray-71 mr-2'>
              Lossless image quality
            </div>
            <Toggle
              selected={isLossLess}
              toggleHandler={setLossLess}
              selectedClass='bg-blue-3f'
            />
          </label>
          <div
            className={cn(
              'pb-5 mb-5 duration-200 transition',
              isLossLess ? 'opacity-0' : 'opacity-100',
            )}
          >
            <OptimizationSlider />
          </div>
          <div>
            <div className='font-medium text-gray-71 mb-3'>
              Thumbnail preview
            </div>
            <div className='w-48 h-48'>
              {croppedImage && (
                <img src={croppedImage.src} className='rounded w-full h-full' />
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
