import React, { useCallback, useRef, DragEvent } from 'react'
import style from './FullScreenImage.module.css'
import { Minus, Plus, X } from '../Icons'
import { DraggableCore } from 'react-draggable'
import { useImageZoom } from 'common/utils/imageZoom'

export type TFullScreenImageProps = {
  image: string
  onClose(): void
}

export default function FullScreenImage({
  image,
  onClose,
}: TFullScreenImageProps): JSX.Element {
  const backgroundRef = useRef<HTMLDivElement>(null)

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

  const onDragStart = useCallback((e: DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }, [])

  // Prevent accidentally closing modal by clicking on background when dragging image
  const startImageDrag = useCallback(
    () => backgroundRef.current?.classList.add('pointer-events-none'),
    [],
  )

  const stopImageDrag = useCallback(
    () => backgroundRef.current?.classList.remove('pointer-events-none'),
    [],
  )

  const renderDraggableContentFilledProgressBar = () => (
    <div className='bg-white bg-opacity-30 h-1 rounded-full'>
      <div
        ref={filledProgressBarRef}
        className='h-full bg-white w-0 rounded-full relative'
      >
        <div className='h-3 w-3 rounded-full bg-white absolute -right-1.5 -top-1' />
      </div>
    </div>
  )

  const renderFilledProgressBar = () => (
    <div className='relative w-full h-full flex-between text-white'>
      <button
        type='button'
        className='h-4 px-1 cursor-pointer'
        onClick={onMinus}
      >
        <Minus size={12} />
      </button>
      <div className='flex-grow mx-2 py-2 relative' ref={controlRef}>
        <DraggableCore
          onStart={onDragControl}
          onDrag={onDragControl}
          onStop={onDragControl}
        >
          {renderDraggableContentFilledProgressBar()}
        </DraggableCore>
      </div>
      <button
        type='button'
        className='h-4 px-1 cursor-pointer'
        onClick={onPlus}
      >
        <Plus size={12} />
      </button>
    </div>
  )

  const renderPreviewImage = () => (
    <div className='rounded-3xl overflow-hidden'>
      <DraggableCore
        onDrag={onDragImage}
        onStart={startImageDrag}
        onStop={stopImageDrag}
      >
        <img
          onDragStart={onDragStart}
          ref={imageRef}
          src={image}
          className={style.image}
          onWheel={onWheelImage}
          alt='Draggable Core'
        />
      </DraggableCore>
    </div>
  )

  const renderFilledProgressBarBlock = () => (
    <div className='absolute bottom-30px h-34px w-180px rounded-md px-2'>
      <div className='absolute inset-0 bg-gray-71 mix-blend-multiply rounded-md' />
      {renderFilledProgressBar()}
    </div>
  )

  const renderCloseButton = () => (
    <button
      className='absolute top-0 -right-10 flex-center w-7 h-7 rounded-md transition duration-200 text-gray-f8 hover:text-white border border-gray-f8 border-opacity-50 hover:border-opacity-100'
      onClick={onClose}
      type='button'
    >
      <X size={8} />
    </button>
  )

  return (
    <>
      <div
        ref={backgroundRef}
        className='fixed inset-0'
        onClick={onClose}
        role='button'
        aria-hidden
        tabIndex={0}
      />
      <div className='relative flex-center'>
        {renderCloseButton()}
        {renderPreviewImage()}
        {renderFilledProgressBarBlock()}
      </div>
    </>
  )
}
