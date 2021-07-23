import React from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import {
  ArrowSlim,
  MinusCircle,
  PlusCircle,
  Trash,
} from 'common/components/Icons'
import { Button } from 'common/components/Buttons'
import { DraggableCore } from 'react-draggable'
import { useImageZoom } from 'common/utils/imageZoom'
import ImageShadow from '../common/ImageShadow'

type TUploadStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
}

const backdropBlurClass = 'backdrop-filter backdrop-blur-[55px]'

export default function UploadStep({
  state: { goBack, goToNextStep },
  image,
  displayUrl,
}: TUploadStepProps): JSX.Element {
  const {
    onDragImage,
    imageRef,
    onWheelImage,
    controlRef,
    onDragControl,
    filledProgressBarRef,
  } = useImageZoom()

  return (
    <ModalLayout
      title='Upload Image'
      titleClass='mb-3'
      subtitle='Description'
      step={2}
      fixedHeight
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative'>
            <ImageShadow url={displayUrl} />
            <div className='relative flex-center overflow-hidden'>
              <button
                className='absolute z-10 top-3 right-3 w-10 h-10 rounded-full flex-center text-white bg-gray-2d bg-opacity-30 hover:bg-opacity-50'
                onClick={goBack}
              >
                <Trash size={15} />
              </button>
              <DraggableCore
                onDrag={onDragImage}
                onStart={e => e.preventDefault()}
              >
                <img
                  ref={imageRef}
                  src={displayUrl}
                  className='rounded max-h-400px'
                  onWheel={onWheelImage}
                />
              </DraggableCore>
              <div
                className={`absolute bottom-3 h-10 px-3 rounded-full flex-center text-white w-[165px] bg-gray-2d bg-opacity-50 ${backdropBlurClass}`}
              >
                <button type='button'>
                  <MinusCircle size={13} />
                </button>
                <div className='flex-grow mx-3 py-2 relative' ref={controlRef}>
                  <DraggableCore
                    onStart={onDragControl}
                    onDrag={onDragControl}
                    onStop={onDragControl}
                  >
                    <div
                      className={`h-1 rounded-full bg-gray-2d bg-opacity-50 ${backdropBlurClass}`}
                    >
                      <div
                        ref={filledProgressBarRef}
                        className='h-full bg-white w-0 rounded-full relative'
                      >
                        <div className='h-3 w-3 rounded-full bg-white absolute -right-1.5 -top-1' />
                      </div>
                    </div>
                  </DraggableCore>
                </div>
                <button type='button'>
                  <PlusCircle size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      rightColumnClass='w-[355px]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div className='text-gray-71 font-medium pt-1'>
            File downloaded successfully, you can continue to configure your
            incredible NFT
          </div>
          <div className='flex-between'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <Button className='font-extrabold px-6' onClick={goToNextStep}>
              Go to Optimization
            </Button>
          </div>
        </div>
      }
    />
  )
}
