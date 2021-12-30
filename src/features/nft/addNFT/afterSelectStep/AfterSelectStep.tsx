import React, { useCallback } from 'react'
import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import {
  ArrowSlim,
  MinusCircle,
  PlusCircle,
  Trash,
} from 'common/components/Icons'
import { DraggableCore, DraggableEvent } from 'react-draggable'
import { useImageZoom } from 'common/utils/imageZoom'
import ImageShadow from '../common/ImageShadow'

type TAfterSelectStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
}

const backdropBlurClass = 'backdrop-filter backdrop-blur-[55px]'

export default function UploadStep({
  state: { goBack, goToNextStep },
  image,
  displayUrl,
}: TAfterSelectStepProps): JSX.Element {
  const {
    onDragImage,
    imageRef,
    onWheelImage,
    controlRef,
    onDragControl,
    filledProgressBarRef,
  } = useImageZoom()

  const onStart = useCallback((e: DraggableEvent) => {
    e.preventDefault()
  }, [])

  const renderDraggableAreaImage = () => (
    <DraggableCore onDrag={onDragImage} onStart={onStart}>
      <img
        ref={imageRef}
        src={displayUrl}
        className='rounded max-h-400px'
        onWheel={onWheelImage}
        alt='Wheel'
      />
    </DraggableCore>
  )

  const renderPlusCircleButton = () => (
    <button type='button'>
      <PlusCircle size={13} />
    </button>
  )

  const renderGoBackButton = () => (
    <button
      type='button'
      className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
      onClick={goBack}
    >
      <ArrowSlim to='left' size={14} />
    </button>
  )

  const renderFilledProgressBarContent = () => (
    <div
      ref={filledProgressBarRef}
      className='h-full bg-white w-0 rounded-full relative z-40'
    >
      <div className='h-3 w-3 rounded-full bg-white absolute -right-1.5 -top-5px' />
    </div>
  )

  const renderFilledProgressBar = () => (
    <div className='relative z-40'>
      <DraggableCore
        onStart={onDragControl}
        onDrag={onDragControl}
        onStop={onDragControl}
      >
        {renderFilledProgressBarContent()}
      </DraggableCore>
    </div>
  )

  const renderMinusCircleButton = () => (
    <button type='button'>
      <MinusCircle size={13} />
    </button>
  )

  const renderZoomLineBar = () => (
    <div className='absolute top-1/2 left-0 right-0 block h-1 z-10 -translate-y-1/2 rounded-[20px] bg-rgba-white-[0.33]'></div>
  )

  const renderLeftColumnContentControl = () => (
    <div className='relative flex-center overflow-hidden'>
      <button
        className='absolute z-10 top-3 right-3 w-10 h-10 rounded-full flex-center text-white bg-gray-2d bg-opacity-30 hover:bg-opacity-50'
        onClick={goBack}
        type='button'
      >
        <Trash size={15} />
      </button>
      {renderDraggableAreaImage()}
      <div
        className={`absolute bottom-3 h-10 px-3 rounded-full flex-center text-white w-[165px] bg-gray-2d bg-opacity-50 ${backdropBlurClass}`}
      >
        {renderMinusCircleButton()}
        <div className='flex-grow mx-3 py-2 relative' ref={controlRef}>
          {renderFilledProgressBar()}
          {renderZoomLineBar()}
        </div>
        {renderPlusCircleButton()}
      </div>
    </div>
  )

  return (
    <ModalLayout
      title='Select Image'
      titleClass='mb-3'
      subtitle='The Image File for your NFT'
      step={2}
      fixedHeight
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative'>
            <ImageShadow url={displayUrl} />
            {renderLeftColumnContentControl()}
          </div>
        </div>
      }
      rightColumnClass='w-[355px]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div>
            <div className='text-gray-4a text-lg leading-6 font-medium pt-1'>
              File uploaded successfully!
            </div>
            <div className='text-gray-71 text-base font-medium pt-1'>
              You can continue to configure your NFT.
            </div>
          </div>
          <div className='flex-between'>
            {renderGoBackButton()}
            <button
              type='button'
              className='btn btn-primary px-[30px]'
              onClick={goToNextStep}
            >
              Go to Image Optimization
            </button>
          </div>
        </div>
      }
    />
  )
}
