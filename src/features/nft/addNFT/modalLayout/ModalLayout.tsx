import React from 'react'
import PercentCircle from 'common/components/PercentCircle'
import style from './ModalLayout.module.css'
import cn from 'classnames'

type TModalLayoutProps = {
  title: string
  titleClass?: string
  subtitle?: string
  step?: number
  leftColumnContent: React.ReactNode
  rightColumnContent: React.ReactNode
}

const stepsCount = 4

export default function CroppingStep({
  title,
  titleClass,
  subtitle,
  step,
  leftColumnContent,
  rightColumnContent,
}: TModalLayoutProps): JSX.Element {
  return (
    <div className='paper p-10'>
      <div className={cn('flex-between', style.leftColumn, titleClass)}>
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
          >
            <div className='font-extrabold text-gray-11 text-lg mt-1'>
              {step}/{stepsCount}
            </div>
          </PercentCircle>
        )}
      </div>
      <div className='flex space-x-7'>
        <div className={style.leftColumn}>{leftColumnContent}</div>
        <div className={style.rightColumn}>{rightColumnContent}</div>
      </div>
    </div>
  )
}
