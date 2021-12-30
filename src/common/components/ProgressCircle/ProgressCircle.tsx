import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import styles from './ProgressCircle.module.css'
import paths, { TPathsProps } from './paths'

export type TProgressCircleProps = {
  percentage: number
  children?: React.ReactNode
  size?: number
  className?: string
  contentClassName?: string
  timeTransitionDuration?: number
  onCallback?: (val: number) => void
}

let currentStep = 0

export default function ProgressCircle({
  percentage,
  children,
  size = 253,
  className,
  contentClassName,
  timeTransitionDuration = 50,
  onCallback,
}: TProgressCircleProps): JSX.Element {
  let percentageTime: NodeJS.Timeout | null = null
  const [currentPaths, setCurrentPaths] = useState<TPathsProps[]>([])

  useEffect(() => {
    if (percentage < 100) {
      percentageTime = setInterval(() => {
        if (percentage >= currentStep) {
          currentStep++
          setCurrentPaths(paths.slice(0, currentStep))
        }
        if (onCallback) {
          onCallback(currentStep)
        }
      }, timeTransitionDuration)
    } else {
      currentStep = 0
      setCurrentPaths(paths)
      if (onCallback) {
        onCallback(100)
      }
      if (percentageTime) {
        clearInterval(percentageTime)
      }
    }

    return () => {
      if (percentageTime) {
        clearInterval(percentageTime)
      }
    }
  }, [percentage])

  const renderPaths = () => {
    return currentPaths.map((path, index) => {
      if (!path.value) {
        return null
      }

      return (
        <path
          d={path.value}
          key={path.id}
          className={`z-${percentage - index}`}
          fill='url(#paint0_radial_8157_41310)'
        />
      )
    })
  }

  return (
    <div className={cn('inline-block relative', className)}>
      <svg
        width={size}
        height={size}
        viewBox='0 0 253 253'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_8157_41310)'>
          <circle cx='128.444' cy='128.446' r='124.554' fill='#ECEFF3' />
          <circle cx='128.446' cy='128.446' r='101.2' fill='#fff' />
          {renderPaths()}
          <path
            d='M116.639 108.277L121.039 104.021C121.167 103.893 121.301 103.759 121.439 103.621C121.578 103.471 121.701 103.317 121.807 103.157C121.925 102.997 122.021 102.831 122.095 102.661C122.17 102.479 122.207 102.293 122.207 102.101C122.207 101.866 122.159 101.658 122.063 101.477C121.978 101.295 121.861 101.141 121.711 101.013C121.562 100.885 121.386 100.789 121.183 100.725C120.991 100.65 120.783 100.613 120.559 100.613C120.079 100.613 119.685 100.751 119.375 101.029C119.066 101.306 118.879 101.679 118.815 102.149L116.799 101.989C116.842 101.466 116.965 101.007 117.167 100.613C117.381 100.207 117.653 99.8713 117.983 99.6046C118.314 99.3379 118.698 99.1353 119.135 98.9966C119.573 98.8579 120.047 98.7886 120.559 98.7886C121.071 98.7886 121.546 98.8579 121.983 98.9966C122.431 99.1246 122.821 99.3219 123.151 99.5886C123.482 99.8446 123.743 100.175 123.935 100.581C124.127 100.986 124.223 101.461 124.223 102.005C124.223 102.719 124.058 103.338 123.727 103.861C123.407 104.373 122.991 104.863 122.479 105.333L118.975 108.581H124.223V110.309H116.639V108.277ZM126.348 111.077L125.02 110.597L130.012 98.1806L131.34 98.6926L126.348 111.077ZM136.743 108.005H131.927V106.101L136.487 98.9806H138.663V106.277H140.311V108.005H138.663V110.309H136.743V108.005ZM136.743 101.701H136.711L133.879 106.277H136.743V101.701Z'
            fill='#4A5568'
          />
        </g>
        <circle cx='128.5' cy='128.5' r='106.5' fill='#fff' />
        <defs>
          <radialGradient
            id='paint0_radial_8157_41310'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(271.266 -18.5271) rotate(136.111) scale(424.004)'
          >
            <stop offset='0.0782458' stopColor='#FFCE12' />
            <stop offset='0.507247' stopColor='#E02DFF' />
            <stop offset='0.949356' stopColor='#17D9FF' />
          </radialGradient>
          <clipPath id='clip0_8157_41310'>
            <rect width={size} height={size} fill='#fff' />
          </clipPath>
        </defs>
      </svg>
      <div
        className={cn(
          'absolute top-1/2 left-1/2',
          styles.content,
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
