import React, { useEffect, useRef } from 'react'
import Circle, {
  getStrokeDashOffsetForPercent,
} from 'common/components/Svg/Circle'
import { UploadFile, Checkmark } from 'common/components/Icons'
import { TImageFile } from './UploadStep'

type TUploadingCircleProps = {
  file?: TImageFile
  setFile(file: undefined): void
  isReady: boolean
  setReady(ready: boolean): void
}

const circleRadius = 50
const circleBorderWidth = 8

export default function UploadingCircle({
  file,
  setFile,
  isReady,
  setReady,
}: TUploadingCircleProps): JSX.Element {
  const circleRef = useRef<SVGCircleElement>(null)
  const displayPercentRef = useRef<HTMLDivElement>(null)

  // fake uploading progress animation
  useEffect(() => {
    if (isReady) {
      return
    }

    const timeToUpload = 50
    const uploadTime = Date.now() + timeToUpload
    const interval = setInterval(() => {
      const uploadedPercent = Math.min(
        100,
        ((timeToUpload - (uploadTime - Date.now())) * 100) / timeToUpload,
      )

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(
          getStrokeDashOffsetForPercent(
            circleRadius,
            circleBorderWidth,
            uploadedPercent,
          ),
        )
      }

      if (displayPercentRef.current) {
        displayPercentRef.current.textContent = `${Math.floor(
          uploadedPercent,
        )}%`
      }

      if (uploadedPercent === 100) {
        setReady(true)
        clearInterval(interval)
      }
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [isReady])

  const initialPercent = isReady ? 100 : 0

  return (
    <div className='pt-16 flex flex-col items-center bg-center border border-gray-ec rounded-xl'>
      <div className='rounded-full bg-white p-1 relative text-gray-77 mb-5'>
        <svg
          viewBox='0 0 100 100'
          className='transform -rotate-90 w-[249px] h-[249px]'
        >
          <Circle
            ref={circleRef}
            stroke='url(#paint0_radial)'
            radius={circleRadius}
            strokeWidth={circleBorderWidth}
            percent={initialPercent}
          />
          <radialGradient
            id='paint0_radial'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(268.266 -21.5271) rotate(136.111) scale(424.004)'
          >
            <stop offset='0.0782458' stopColor='#FFCE12' />
            <stop offset='0.507247' stopColor='#E02DFF' />
            <stop offset='0.949356' stopColor='#17D9FF' />
          </radialGradient>
        </svg>
        <div className='absolute inset-0 flex-center flex-col'>
          {isReady ? (
            <Checkmark size={35} className='mb-2 text-green-00' />
          ) : (
            <UploadFile variant='full' size={22} className='mb-2' />
          )}
          <div className='text-gray-4a text-lg font-medium mb-px max-w-9/10 px-3 overflow-ellipsis whitespace-nowrap overflow-hidden'>
            {file?.file.name}
          </div>
          <div className='text-sm'>
            <span ref={displayPercentRef}>{initialPercent}%</span> ready
          </div>
        </div>
      </div>
      {isReady && (
        <button
          type='button'
          className='text-gray-71 text-sm transition duration-200 hover:text-gray-a0 mb-[44px]'
          onClick={() => setFile(undefined)}
        >
          Cancel
        </button>
      )}
    </div>
  )
}
