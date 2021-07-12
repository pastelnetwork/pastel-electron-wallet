import React from 'react'
import cn from 'classnames'
import Circle from 'common/components/Svg/Circle'

type TRarenessScoreProps = {
  title: string
  color: string
  percent: number
  titleClass: string
}

export default function RarenessScore({
  title,
  color,
  percent,
  titleClass,
}: TRarenessScoreProps): JSX.Element {
  return (
    <div className='flex items-center'>
      <div className={cn('text-sm font-medium', titleClass)}>{title}</div>
      <div className={cn('w-16 h-16 rounded-full relative', color)}>
        <svg
          className='w-full h-full transform -rotate-90'
          viewBox='0 0 100 100'
        >
          <Circle className='text-gray-e4' strokeWidth={10} />
          <Circle percent={percent} strokeWidth={10} />
        </svg>
        <div className='absolute inset-0 flex-center text-gray-11 font-extrabold'>
          {percent}%
        </div>
      </div>
    </div>
  )
}
