import React, { useEffect } from 'react'
import { TAddNFTState } from '../AddNFT.state'
import ModalLayout from '../modalLayout/ModalLayout'
import {
  useChangeableImage,
  useImagePreview,
} from 'features/nft/addNFT/previewStep/PreviewStep.service'
import style from 'features/nft/addNFT/previewStep/PreviewStep.module.css'
import { Expand, Crop } from 'common/components/Icons'
import Tooltip from '../tooltip'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { useToggle } from 'react-use'
import Cropping from './Cropping'
import OptimizationSlider from './OptimizationSlider'

type TPreviewStepProps = {
  state: TAddNFTState
}

export default function PreviewStep({
  state: { image: providedImage, goBack, setCrop, goToNextStep },
}: TPreviewStepProps): JSX.Element {
  const { image, onImageChange } = useChangeableImage(providedImage)
  const [croppedImage, setCroppedImage] = useImagePreview({ image })
  const [cropping, toggleCropping] = useToggle(false)

  useEffect(() => {
    if (croppedImage) {
      console.log('Cropped region:', croppedImage.crop)
    }
  }, [croppedImage?.crop])

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
      leftColumnContent={
        <div className={`relative ${style.imageContainer}`}>
          {croppedImage && (
            <>
              <button
                className={`absolute top-3.5 left-3.5 w-8 h-8 bg-gray-fc text-gray-77 flex-center rounded-full ${style.fullscreenButton}`}
              >
                <Expand size={13} />
              </button>
              <Tooltip text='Crop thumbnail'>
                {ref => (
                  <button
                    ref={ref}
                    className={`absolute bottom-3.5 left-3.5 w-10 h-10 text-white flex-center rounded-full ${style.cropButton}`}
                    onClick={toggleCropping}
                  >
                    <Crop size={18} />
                  </button>
                )}
              </Tooltip>
              <label>
                <img src={croppedImage.src} className='rounded' />
                <input type='file' hidden onChange={onImageChange} />
              </label>
              {croppedImage.error && (
                <div className='text-sm text-error font-medium mt-3'>
                  Error text error text
                </div>
              )}
            </>
          )}
        </div>
      }
      rightColumnContent={
        <div className='space-y-8'>
          <div>
            <div className='font-medium text-gray-71 mb-3'>Image size</div>
            <div className='flex'>
              <div className='text-gray-2d text-sm font-extrabold w-20'>
                50 Mb
              </div>
              <div className='flex-grow'>
                <div className='bg-gray-e4 bg-opacity-50 rounded h-2 relative my-1'>
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
          </div>
          <div>
            <div className='font-medium text-gray-71 mb-3'>
              Estimated registration fee
            </div>
            <div className='text-gray-2d text-sm font-extrabold'>5,000 PSL</div>
          </div>
          <div>
            <div className='font-medium text-gray-71 mb-10'>
              Image size and fee optimization
            </div>
            <div className='pb-5'>
              <OptimizationSlider />
            </div>
          </div>
          <div className='flex-between pt-18px'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <button
              type='button'
              className='btn-primary px-6'
              onClick={submit}
              disabled={!croppedImage || Boolean(croppedImage.error)}
            >
              Go to Overview
            </button>
          </div>
        </div>
      }
    />
  )
}
