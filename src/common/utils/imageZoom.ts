import { RefObject, useEffect, useRef, WheelEvent } from 'react'
import { DraggableData, DraggableEvent } from 'react-draggable'

const minZoom = 1
const maxZoom = 3

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

  return {
    onDragImage,
    imageRef,
    onWheelImage,
    controlRef,
    onDragControl,
    filledProgressBarRef,
  }
}
