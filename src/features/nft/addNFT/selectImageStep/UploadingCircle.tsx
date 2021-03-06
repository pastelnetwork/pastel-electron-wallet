import React, { useCallback, useEffect, useRef } from 'react'
import Circle, {
  getStrokeDashOffsetForPercent,
} from 'common/components/Svg/Circle'
import { UploadFile, Checkmark } from 'common/components/Icons'
import backgroundImage from 'common/assets/images/add-nft-upload-background.png'
import { TImageFile } from './SelectImageStep'
import { translate } from 'features/app/translations'

type TUploadingCircleProps = {
  file?: TImageFile
  setFile(file: undefined): void
  isReady: boolean
  setReady(ready: boolean): void
}

const circleRadius = 50
const circleBorderWidth = 3

// Now this is not used
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

  const onCancel = useCallback(() => {
    setFile(undefined)
  }, [])

  const renderProgress = () => (
    <div className='absolute inset-0 flex-center flex-col'>
      {isReady ? (
        <Checkmark size={27} className='mb-2 text-green-6d' />
      ) : (
        <UploadFile size={22} className='mb-2' />
      )}
      <div className='text-gray-4a text-lg font-medium mb-px max-w-9/10 px-3 overflow-ellipsis whitespace-nowrap overflow-hidden'>
        {file?.name}
      </div>
      <div className='text-sm'>
        <span ref={displayPercentRef}>{initialPercent}%</span>{' '}
        {translate('ready')}
      </div>
    </div>
  )

  const renderCircleIcon = () => (
    <svg
      viewBox='0 0 100 100'
      className='transform -rotate-90 w-[200px] h-[200px]'
    >
      <Circle
        ref={circleRef}
        className='text-blue-3f'
        radius={circleRadius}
        strokeWidth={circleBorderWidth}
        percent={initialPercent}
      />
    </svg>
  )

  return (
    <div
      className='pt-16 flex flex-col items-center bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='rounded-full bg-white p-1 relative text-gray-77 mb-5'>
        {renderCircleIcon()}
        {renderProgress()}
      </div>
      {!isReady && (
        <button
          type='button'
          className='text-gray-71 text-sm transition duration-200 hover:text-gray-a0'
          onClick={onCancel}
        >
          {translate('cancel')}
        </button>
      )}
    </div>
  )
}

UploadingCircle.defaultProps = {
  file: undefined,
}
