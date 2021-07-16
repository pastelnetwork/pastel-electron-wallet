import React from 'react'
import PercentCircle from 'common/components/PercentCircle'
import cn from 'classnames'

type TModalLayoutProps = {
  title: string
  titleClass?: string
  subtitle?: string
  step?: number
  fixedHeight?: boolean
  contentClass?: string
  rightColumnClass?: string
  leftColumnWidth: number
  leftColumnContent: React.ReactNode
  rightColumnContent: React.ReactNode
}

const stepsCount = 4

export default function CroppingStep({
  title,
  titleClass,
  subtitle,
  step,
  fixedHeight,
  contentClass,
  rightColumnClass,
  leftColumnWidth,
  leftColumnContent,
  rightColumnContent,
}: TModalLayoutProps): JSX.Element {
  return (
    <div
      className={cn('paper p-10 flex flex-col', fixedHeight && 'min-h-[555px]')}
    >
      <div
        className={cn('flex-between', titleClass)}
        style={{
          width: `${leftColumnWidth}px`,
        }}
      >
        <div>
          <div className='text-gray-800 text-2xl font-extrabold mb-3'>
            {title}
          </div>
          <div className='font-medium text-sm text-gray-33 opacity-50'>
            {subtitle}
          </div>
        </div>
        {step && (
          <PercentCircle
            color='text-green-6d'
            percent={(step * 100) / stepsCount}
            className='ml-2 md:ml-3 lg:ml-18px'
          >
            <div className='font-extrabold text-gray-11 text-lg mt-1'>
              {step}/{stepsCount}
            </div>
          </PercentCircle>
        )}
      </div>
      <div className={cn('flex space-x-7 flex-grow', contentClass)}>
        <div
          className='relative min-w-[320px]'
          style={{ maxWidth: `${leftColumnWidth}px` }}
        >
          {leftColumnContent}
        </div>
        <div className={rightColumnClass || 'w-[349px]'}>
          {rightColumnContent}
        </div>
      </div>
    </div>
  )
}
