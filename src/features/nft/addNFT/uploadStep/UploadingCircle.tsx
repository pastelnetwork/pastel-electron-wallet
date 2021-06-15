import React, { useEffect, useRef, useState } from 'react'
import style from './UploadCircle.module.css'
import Circle, {
  getStrokeDashOffsetForPercent,
} from 'common/components/Svg/Circle'
import { UploadFile, Checkmark } from 'common/components/Icons'

type TUploadingCircleProps = {
  file: File
  setFile(file: undefined): void
}

const circleRadius = 50
const circleBorderWidth = 3

export default function UploadingCircle({
  setFile,
}: TUploadingCircleProps): JSX.Element {
  const circleRef = useRef<SVGCircleElement>(null)
  const displayPercentRef = useRef<HTMLDivElement>(null)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    const timeToUpload = 10000
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
  }, [])

  return (
    <div
      className={`pt-16 flex flex-col items-center bg-center ${style.background}`}
    >
      <div className='rounded-full bg-white p-1 relative text-gray-77 mb-5'>
        <svg
          viewBox='0 0 100 100'
          className={`transform -rotate-90 ${style.circle}`}
        >
          <Circle
            ref={circleRef}
            className='text-blue-3f'
            radius={circleRadius}
            strokeWidth={circleBorderWidth}
            percent={0}
          />
        </svg>
        <div className='absolute inset-0 flex-center flex-col'>
          {isReady ? (
            <Checkmark size={27} className='mb-2 text-green-6d' />
          ) : (
            <UploadFile size={22} className='mb-2' />
          )}
          <div className='text-gray-4a text-lg font-medium mb-px'>
            File name
          </div>
          <div ref={displayPercentRef} className='text-sm'>
            0%
          </div>
        </div>
      </div>
      <button
        type='button'
        className='text-gray-71 text-sm transition duration-200 hover:text-gray-a0'
        onClick={() => setFile(undefined)}
      >
        Cancel
      </button>
    </div>
  )
}
