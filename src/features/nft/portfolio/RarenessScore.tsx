import React from 'react'
import cn from 'classnames'

type TRarenessScoreProps = {
  title: string
  color: string
  percent: number
  titleClass: string
}

const strokeWidth = 6
const radius = 50 - strokeWidth / 2
const length = radius * 2 * Math.PI
const dashArray = String(length)

export default function RarenessScore({
  title,
  color,
  percent,
  titleClass,
}: TRarenessScoreProps): JSX.Element {
  const dashOffset = (length * (100 - percent)) / 100

  return (
    <div className='flex items-center'>
      <div className={cn('text-sm font-medium', titleClass)}>{title}</div>
      <div
        className={cn(
          'w-16 h-16 rounded-full ml-2 md:ml-3 lg:ml-18px text-orange-75 relative',
          color,
        )}
      >
        <svg
          className='w-full h-full transform -rotate-90'
          viewBox='0 0 100 100'
        >
          <circle
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
            className='text-gray-e4'
            stroke='currentColor'
            strokeWidth={strokeWidth}
          />
          <circle
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
            stroke='currentColor'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className='absolute inset-0 flex-center text-gray-11 font-extrabold'>
          {percent}%
        </div>
      </div>
    </div>
  )
}
