import React from 'react'
import cn from 'classnames'
import CircleSteper from 'common/components/CircleSteper'

type TModalLayoutProps = {
  title: string
  titleClass?: string
  titleClassName?: string
  subtitle?: string
  subtitleClassName?: string
  step?: number
  fixedHeight?: boolean
  contentClass?: string
  rightColumnClass?: string
  leftColumnWidth: number
  leftColumnContent: React.ReactNode
  rightColumnContent: React.ReactNode
  titleWidth?: number
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
  subtitleClassName = 'font-medium text-sm text-gray-33 opacity-50',
  titleClassName = 'text-gray-800 text-2xl font-extrabold mb-3',
  titleWidth,
}: TModalLayoutProps): JSX.Element {
  const renderModalContent = () => (
    <div>
      <div className={titleClassName}>{title}</div>
      <div className={subtitleClassName}>{subtitle}</div>{' '}
    </div>
  )

  return (
    <div
      className={cn(
        'paper p-10 flex flex-col',
        fixedHeight && 'min-h-[555px] min-w-[700px]',
      )}
    >
      <div
        className={cn('flex-between', titleClass)}
        style={{
          width: `${titleWidth || leftColumnWidth}px`,
        }}
      >
        {renderModalContent()}
        {step ? (
          <CircleSteper
            size={65}
            totalStep={stepsCount}
            spaceAngle={10}
            currentStep={step}
            stopColor1='#6FCF97'
            stopColor2='#6FCF97'
          />
        ) : null}
      </div>
      <div className={cn('flex space-x-7 flex-grow', contentClass)}>
        <div
          className='relative min-w-[308px]'
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

CroppingStep.defaultProps = {
  titleClass: '',
  titleClassName: 'text-gray-800 text-2xl font-extrabold mb-3',
  subtitle: '',
  subtitleClassName: 'font-medium text-sm text-gray-33 opacity-50',
  step: 0,
  fixedHeight: false,
  contentClass: '',
  rightColumnClass: '',
  titleWidth: undefined,
}
