import React, { useCallback } from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import {
  ArrowSlim,
  EditImage,
  MinusCircle,
  PlusCircle,
  Trash,
} from 'common/components/Icons'
import { Button } from 'common/components/Buttons'
import { DraggableCore, DraggableEvent } from 'react-draggable'
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

  const handleOnStart = useCallback((e: DraggableEvent) => {
    e.preventDefault()
  }, [])

  const renderImageOptimization = () => (
    <div className='flex-between'>
      <button
        type='button'
        className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
        onClick={goBack}
      >
        <ArrowSlim to='left' size={18} />
      </button>
      <Button className='font-medium px-6' onClick={goToNextStep}>
        Go to Image Optimization
      </Button>
    </div>
  )

  const renderFileUploadedSuccessfully = () => (
    <div className='text-gray-71 font-medium'>
      <p className='text-lg text-gray-4a'>File uploaded successfully!</p>
      <p className='text-base text-gray-71 mt-3'>
        You can continue to configure your NFT.
      </p>
    </div>
  )

  const renderBackdropBlurPreview = () => (
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
  )

  const renderBackdropBlur = () => (
    <div
      className={`absolute bottom-3 h-10 px-3 rounded-lg flex-center text-white w-[165px] bg-gray-2d bg-opacity-50 ${backdropBlurClass}`}
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
          {renderBackdropBlurPreview()}
        </DraggableCore>
      </div>
      <button type='button'>
        <PlusCircle size={13} />
      </button>
    </div>
  )

  const renderUploadStepForm = () => (
    <div className='relative flex-center overflow-hidden'>
      <button
        className='absolute z-10 top-3 right-3 w-[30px] h-[30px] rounded-full flex-center text-white bg-gray-2d bg-opacity-30 hover:bg-opacity-50'
        onClick={goBack}
        type='button'
      >
        <Trash size={11} />
      </button>
      <button
        className='absolute z-10 top-3 left-3 w-[30px] h-[30px] hover:bg-opacity-50 text-white'
        type='button'
      >
        <EditImage size={30} />
      </button>
      <DraggableCore onDrag={onDragImage} onStart={handleOnStart}>
        <img
          ref={imageRef}
          src={displayUrl}
          className='rounded max-h-400px'
          onWheel={onWheelImage}
          alt='Review'
        />
      </DraggableCore>
      {renderBackdropBlur()}
    </div>
  )

  return (
    <ModalLayout
      title='Select Image'
      titleClass='mb-3'
      subtitle='Description'
      step={2}
      fixedHeight
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative'>
            <ImageShadow url={displayUrl} />
            {renderUploadStepForm()}
          </div>
        </div>
      }
      rightColumnClass='w-[355px]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          {renderFileUploadedSuccessfully()}
          {renderImageOptimization()}
        </div>
      }
    />
  )
}
