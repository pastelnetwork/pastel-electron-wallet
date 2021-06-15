import React, { useEffect, useRef, WheelEvent } from 'react'
import style from './FullScreenImage.module.css'
import { Minus, Plus, X } from '../Icons'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'

export type TFullScreenImageProps = {
  image: string
  onClose(): void
}

const minZoom = 1
const maxZoom = 3

export default function FullScreenImage({
  image,
  onClose,
}: TFullScreenImageProps): JSX.Element {
  const controlRef = useRef<HTMLDivElement>(null)
  const filledProgressBarRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const transformRef = useRef({
    scale: 0,
    x: 0,
    y: 0,
  })

  // reset values for the case of reopening modal
  useEffect(() => {
    const transform = transformRef.current
    transform.scale = transform.x = transform.y = 0
  }, [])

  const onDragControl = (e: DraggableEvent, data: DraggableData) => {
    const el = controlRef.current
    if (!el) {
      return
    }
    applyScale(transformRef.current.scale + data.deltaX / el.offsetWidth)
  }

  const onWheelImage = (e: WheelEvent) =>
    applyScale(transformRef.current.scale + e.deltaY / 1000)

  const applyScale = (delta: number) => {
    transformRef.current.scale = Math.max(0, Math.min(1, delta))
    setTransform()
    applyTransform()
  }

  const onDragImage = (e: DraggableEvent, data: DraggableData) => {
    setTransform(data.deltaX, data.deltaY)
    applyTransform()
  }

  const setTransform = (deltaX = 0, deltaY = 0) => {
    const image = imageRef.current
    if (!image) {
      return
    }

    const transform = transformRef.current
    const scale = minZoom + (maxZoom - minZoom) * transform.scale

    const x = transform.x + deltaX / scale
    const minX = (image.offsetWidth - image.offsetWidth * scale) / 2 / scale

    const y = transform.y + deltaY / scale
    const minY = (image.offsetHeight - image.offsetHeight * scale) / 2 / scale

    transform.x = Math.min(Math.max(x, minX), -minX)
    transform.y = Math.min(Math.max(y, minY), -minY)
  }

  const applyTransform = () => {
    const progressBar = filledProgressBarRef.current
    const image = imageRef.current
    if (!progressBar || !image) {
      return
    }

    const transform = transformRef.current
    progressBar.style.width = `${transform.scale * 100}%`
    const scale = minZoom + (maxZoom - minZoom) * transform.scale
    image.style.transform = `scale(${scale}) translateX(${transform.x}px) translateY(${transform.y}px)`
  }

  // Prevent accidentally closing modal by clicking on background when dragging image
  const startImageDrag = () =>
    backgroundRef.current?.classList.remove('pointer-events-none')

  const stopImageDrag = () =>
    backgroundRef.current?.classList.add('pointer-events-none')

  return (
    <>
      <div className='fixed inset-0 pointer-events-none' ref={backgroundRef} />
      <div className='relative flex-center'>
        <button
          className='absolute top-0 -right-10 flex-center w-7 h-7 rounded-md transition duration-200 text-gray-f8 hover:text-white border border-gray-f8 border-opacity-50 hover:border-opacity-100'
          onClick={onClose}
        >
          <X size={8} />
        </button>
        <div className='rounded-3xl overflow-hidden'>
          <DraggableCore
            onDrag={onDragImage}
            onStart={startImageDrag}
            onStop={stopImageDrag}
          >
            <img
              onDragStart={e => e.preventDefault()}
              ref={imageRef}
              src={image}
              className={style.image}
              onWheel={onWheelImage}
            />
          </DraggableCore>
        </div>
        <div className='absolute bottom-30px h-34px w-180px rounded-md px-2'>
          <div className='absolute inset-0 bg-gray-71 mix-blend-multiply rounded-md' />
          <div className='relative w-full h-full flex-between text-white'>
            <button type='button' className='h-4 px-1'>
              <Minus size={12} />
            </button>
            <div className='flex-grow mx-2 py-2 relative' ref={controlRef}>
              <DraggableCore
                onStart={onDragControl}
                onDrag={onDragControl}
                onStop={onDragControl}
              >
                <div className='bg-white bg-opacity-30 h-1 rounded-full'>
                  <div
                    ref={filledProgressBarRef}
                    className='h-full bg-white w-0 rounded-full relative'
                  >
                    <div className='h-3 w-3 rounded-full bg-white absolute -right-1.5 -top-1' />
                  </div>
                </div>
              </DraggableCore>
            </div>
            <button type='button' className='h-4 px-1'>
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
