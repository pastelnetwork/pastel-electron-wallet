import React from 'react'
import cn from 'classnames'

type TRarenessScoreProps = {
  color: string
  step: number
  children: React.ReactNode
  className?: string
}

const TopRight = () => (
  <svg
    className='absolute top-0 right-0'
    width='31'
    height='31'
    viewBox='0 0 31 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M0.962833 3.26171C1.08307 1.50139 2.61234 0.155595 4.35191 0.450656C10.8624 1.55495 16.9008 4.653 21.6105 9.35567C26.3202 14.0583 29.4273 20.0921 30.5413 26.6009C30.839 28.34 29.4955 29.8713 27.7353 29.9942C25.9752 30.1171 24.4688 28.7828 24.1279 27.0516C23.1495 22.0826 20.7133 17.4892 17.0958 13.8771C13.4783 10.265 8.88126 7.83573 3.91082 6.86468C2.17914 6.52637 0.842606 5.02202 0.962833 3.26171Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='-1'
        y1='0'
        x2='-1'
        y2='64'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3F9AF7' />
        <stop offset='1' stopColor='#6C5DD3' />
      </linearGradient>
    </defs>
  </svg>
)

const BottomRight = () => (
  <svg
    className='absolute bottom-0 right-0'
    width='31'
    height='31'
    viewBox='0 0 31 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M27.7384 0.961056C29.4987 1.08118 30.8446 2.61037 30.5497 4.34996C29.4455 10.862 26.3467 16.9019 21.6425 21.6123C16.9384 26.3227 10.9027 29.4296 4.39213 30.5425C2.65294 30.8398 1.12194 29.4959 0.99947 27.7358C0.876995 25.9756 2.21161 24.4696 3.94285 24.129C8.91326 23.1514 13.5082 20.7154 17.1215 17.0972C20.7347 13.4791 23.1646 8.88097 24.1356 3.90926C24.4738 2.17756 25.9781 0.840935 27.7384 0.961056Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='-1'
        y1='-33'
        x2='-1'
        y2='31'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3F9AF7' />
        <stop offset='1' stopColor='#6C5DD3' />
      </linearGradient>
    </defs>
  </svg>
)

const BottomLeft = () => (
  <svg
    className='absolute bottom-0 left-0'
    width='30'
    height='31'
    viewBox='0 0 30 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M29.9249 27.7304C29.7978 29.4902 28.2632 30.83 26.5248 30.5282C20.0172 29.3982 13.9897 26.2754 9.298 21.5526C4.60628 16.8298 1.52334 10.7818 0.436345 4.26685C0.145974 2.5265 1.49589 1.00085 3.25652 0.885365C5.01715 0.769882 6.5179 2.11046 6.85154 3.84304C7.80942 8.8173 10.2272 13.4218 13.831 17.0495C17.4347 20.6771 22.0232 23.1252 26.991 24.1159C28.7213 24.461 30.052 25.9706 29.9249 27.7304Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='32'
        y1='-33'
        x2='32'
        y2='31'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3F9AF7' />
        <stop offset='1' stopColor='#6C5DD3' />
      </linearGradient>
    </defs>
  </svg>
)

const TopLeft = () => (
  <svg
    className='absolute top-0 left-0'
    width='31'
    height='30'
    viewBox='0 0 31 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.30819 29.4461C1.55073 29.2897 0.23669 27.733 0.567492 25.9999C1.80584 19.512 5.02871 13.5374 9.82909 8.92511C14.6295 4.31279 20.728 1.33113 27.2602 0.352914C29.0051 0.0916019 30.5081 1.46677 30.5942 3.22908C30.6803 4.99139 29.3149 6.46958 27.577 6.77428C22.5874 7.64909 17.9432 9.98975 14.256 13.5325C10.5688 17.0753 8.04449 21.6223 6.97108 26.5729C6.5972 28.2972 5.06566 29.6025 3.30819 29.4461Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='32'
        y1='0'
        x2='32'
        y2='64'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3F9AF7' />
        <stop offset='1' stopColor='#6C5DD3' />
      </linearGradient>
    </defs>
  </svg>
)

export default function StepsCircle({
  color,
  step,
  children,
  className,
}: TRarenessScoreProps): JSX.Element {
  return (
    <div className={cn('w-16 h-16 rounded-full relative', color, className)}>
      <div className='absolute inset-0 flex-center rounded-full border-[6px] border-gray-ec'>
        {children}
      </div>
      {step > 0 && <TopRight />}
      {step > 1 && <BottomRight />}
      {step > 2 && <BottomLeft />}
      {step > 3 && <TopLeft />}
    </div>
  )
}
