import React, { useEffect, useRef } from 'react'
import { TImage } from '../AddNFT.state'
import cn from 'classnames'
import { TOptimizedFile } from '../imageOptimization/ImageOptimization.types'

const zoom = 2
const borderWidth = 3

// offset from cursor
const rectXOffsetPx = 15
const rectYOffsetPx = 15

export default function Magnification({
  image,
  optimizedImage,
  imageElement,
  isLossLess,
}: {
  image: TImage
  optimizedImage?: TOptimizedFile
  imageElement: HTMLImageElement
  isLossLess: boolean
}): JSX.Element | null {
  const rectRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const zoomedImageWidth = imageElement.width * zoom
  const zoomedImageHeight = imageElement.height * zoom
  const optimizedUrl = isLossLess ? undefined : optimizedImage?.fileUrl

  useEffect(() => {
    if (!imageElement || !rectRef.current || !beforeRef.current) {
      return
    }

    const rect = rectRef.current
    const before = beforeRef.current

    const onMouseMove = (e: MouseEvent) => {
      const after = afterRef.current
      const halfWidth = before.offsetWidth / 2
      const halfHeight = before.offsetHeight / 2

      const {
        left: imageLeft,
        top: imageTop,
      } = imageElement.getBoundingClientRect()

      let x = e.pageX - imageLeft - window.pageXOffset
      x = Math.min(x, imageElement.width - halfWidth / zoom)
      x = Math.max(x, halfWidth / zoom)

      let y = e.pageY - imageTop - window.pageYOffset
      y = Math.min(y, imageElement.height - halfHeight / zoom)
      y = Math.max(y, halfHeight / zoom)

      rect.style.left = `${x - rect.offsetWidth + rectXOffsetPx}px`
      rect.style.top = `${y - rect.offsetHeight + rectYOffsetPx}px`

      const offsetLeft = before.offsetLeft - borderWidth
      before.style.backgroundPosition = `-${
        x * zoom - halfWidth + offsetLeft
      }px -${y * zoom - halfHeight}px`

      if (!after) {
        return
      }

      after.style.backgroundPosition = `-${
        x * zoom - halfWidth + offsetLeft
      }px -${y * zoom - halfHeight}px`
    }

    const onMouseEnter = (e: MouseEvent) => {
      rect.hidden = false
      onMouseMove(e)
    }
    const onMouseLeave = () => (rect.hidden = true)

    imageElement.addEventListener('mousemove', onMouseMove)
    imageElement.addEventListener('mouseenter', onMouseEnter)
    imageElement.addEventListener('mouseleave', onMouseLeave)

    return () => {
      imageElement.removeEventListener('mousemove', onMouseMove)
      imageElement.removeEventListener('mouseenter', onMouseEnter)
      imageElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [imageElement, optimizedUrl])

  return (
    <div
      ref={rectRef}
      hidden
      className='absolute rounded-xl border-[3px] border-white w-[168px] h-[168px] flex pointer-events-none'
    >
      <div className={cn('flex flex-col', optimizedUrl ? 'w-1/2' : 'w-full')}>
        {optimizedUrl && (
          <div className='bg-white text-gray-a0 text-center font-extrabold z-10 text-sm flex-shrink-0'>
            Before
          </div>
        )}
        <div
          ref={beforeRef}
          className='bg-no-repeat flex-grow rounded-bl-xl'
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: `${zoomedImageWidth}px ${zoomedImageHeight}px`,
          }}
        />
      </div>
      {optimizedUrl && (
        <>
          <div className='w-[3px] bg-white h-full' />
          <div className='w-1/2 flex flex-col'>
            <div className='bg-white text-gray-a0 font-extrabold text-center z-10 text-sm flex-shrink-0'>
              After
            </div>
            <div
              ref={afterRef}
              className='bg-no-repeat flex-grow relative rounded-br-xl'
              style={{
                backgroundImage: `url(${optimizedUrl})`,
                backgroundSize: `${zoomedImageWidth}px ${zoomedImageHeight}px`,
              }}
            >
              <div className='absolute inset-0 backdrop-filter backdrop-blur-[2px] rounded-br-xl' />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
