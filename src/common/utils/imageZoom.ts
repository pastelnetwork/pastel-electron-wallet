import { RefObject, useEffect, useRef, WheelEvent } from 'react'
import { DraggableData, DraggableEvent } from 'react-draggable'

const minZoom = 1
const maxZoom = 3

type TTransformProps = {
  scale: number
  x: number
  y: number
}

export const useImageZoom = (): {
  onDragImage(e: DraggableEvent, data: DraggableData): void
  imageRef: RefObject<HTMLImageElement>
  onWheelImage(e: WheelEvent): void
  controlRef: RefObject<HTMLDivElement>
  onDragControl(e: DraggableEvent, data: DraggableData): void
  filledProgressBarRef: RefObject<HTMLDivElement>
} => {
  const controlRef = useRef<HTMLDivElement>(null)
  const filledProgressBarRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
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

  const setTransform = (deltaX = 0, deltaY = 0) => {
    const image = imageRef.current
    if (!image) {
      return
    }

    const transform: TTransformProps = transformRef.current
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
    const strScale: string = scale?.toString() || ''
    const transformX: string = transform.x?.toString() || ''
    const transformY: string = transform.y?.toString() || ''
    image.style.transform = `scale(${strScale}) translateX(${transformX}px) translateY(${transformY}px)`
  }

  const applyScale = (delta: number) => {
    transformRef.current.scale = Math.max(0, Math.min(1, delta))
    setTransform()
    applyTransform()
  }

  const onDragControl = (e: DraggableEvent, data: DraggableData) => {
    const el = controlRef.current
    if (!el) {
      return
    }
    const scale: number = transformRef.current.scale || 0
    const deltaX: number = data.deltaX || 0
    const offsetWidth: number = el.offsetWidth || 0
    applyScale(scale + deltaX / offsetWidth)
  }

  const onWheelImage = (e: WheelEvent) => {
    const scale: number = transformRef.current.scale || 0
    const deltaY: number = e.deltaY || 0
    return applyScale(scale + deltaY / 1000)
  }

  const onDragImage = (e: DraggableEvent, data: DraggableData) => {
    setTransform(data.deltaX, data.deltaY)
    applyTransform()
  }

  return {
    onDragImage,
    imageRef,
    onWheelImage,
    controlRef,
    onDragControl,
    filledProgressBarRef,
  }
}
