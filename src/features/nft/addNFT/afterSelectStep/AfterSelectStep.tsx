import React, { useCallback } from 'react'
import { DraggableCore, DraggableEvent } from 'react-draggable'

import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { ArrowSlim, Minus, Plus, Trash } from 'common/components/Icons'
import Tooltip from 'common/components/Tooltip'
import { useImageZoom } from 'common/utils/imageZoom'
import ImageShadow from '../common/ImageShadow'
import { useSelectImageService } from '../selectImageStep/SelectImageStep.service'

type TAfterSelectStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
}

const backdropBlurClass = 'backdrop-filter backdrop-blur-[55px]'

export default function UploadStep({
  state,
  image,
  displayUrl,
}: TAfterSelectStepProps): JSX.Element {
  const service = useSelectImageService(state)
  const { goBack, goToNextStep, setPercentage } = state
  const { resetImageState } = service
  const {
    onDragImage,
    imageRef,
    onWheelImage,
    controlRef,
    onDragControl,
    filledProgressBarRef,
    onMinus,
    onPlus,
  } = useImageZoom()

  const onStart = useCallback((e: DraggableEvent) => {
    e.preventDefault()
  }, [])

  const handleDeleteImage = useCallback(() => {
    resetImageState()
    setPercentage(0)
    goBack()
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
      className='h-full bg-white w-0 rounded-full relative z-40 cursor-pointer'
    >
      <div className='h-3 w-3 rounded-full bg-white absolute -right-1.5 -top-3px' />
    </div>
  )

  const renderFilledProgressBar = () => (
    <div className='bg-white w-full h-1 bg-opacity-30 rounded-[20px]'>
      <div className='relative z-40'>
        <DraggableCore
          onStart={onDragControl}
          onDrag={onDragControl}
          onStop={onDragControl}
        >
          {renderFilledProgressBarContent()}
        </DraggableCore>
      </div>
    </div>
  )

  const renderMinusCircleButton = () => (
    <button type='button' className='cursor-pointer' onClick={onMinus}>
      <Minus size={13} />
    </button>
  )

  const renderPlusCircleButton = () => (
    <button type='button' className='cursor-pointer' onClick={onPlus}>
      <Plus size={13} />
    </button>
  )

  const renderZoomLineBar = () => (
    <div className='absolute top-1/2 left-0 right-0 block h-1 z-10 -translate-y-1/2 rounded-[20px] bg-rgba-white-[0.33]'></div>
  )

  const renderTrashButton = () => (
    <div className='absolute z-10 top-3 right-3 w-10 h-10'>
      <Tooltip
        type='top'
        content={<div className='py-1'>Delete image</div>}
        width={100}
      >
        <button
          className=' w-10 h-10 rounded-full flex-center text-white bg-gray-2d bg-opacity-30 hover:bg-opacity-50'
          onClick={handleDeleteImage}
          type='button'
        >
          <Trash size={15} />
        </button>
      </Tooltip>
    </div>
  )

  const renderZoomImageControl = () => (
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
  )

  const renderLeftColumnContentControl = () => (
    <div className='relative flex-center'>
      {renderTrashButton()}
      <div className='w-full overflow-hidden flex-center'>
        {renderDraggableAreaImage()}
        {renderZoomImageControl()}
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
