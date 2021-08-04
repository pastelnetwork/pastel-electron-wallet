import React, { useEffect, useState } from 'react'

export type TCircleSteperProps = {
  size: number
  totalStep?: number
  spaceAngle?: number
  currentStep: number
  stopColor1?: string
  stopColor2?: string
  spacing?: number
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ')
  return d
}

const CircleSteper = ({
  size = 65,
  totalStep = 4,
  spaceAngle = 20,
  currentStep = 4,
  stopColor1 = '#6FCF97',
  stopColor2 = '#6FCF97',
  spacing = 10,
}: TCircleSteperProps): JSX.Element => {
  const [startPoints, setStartPoints] = useState<Array<number>>([])
  useEffect(() => {
    const oneStepAngle = 360 / totalStep
    const temp: Array<number> = []
    for (let i = spaceAngle / 2; i < 360; i += oneStepAngle) {
      temp.push(i)
    }
    setStartPoints(temp)
  }, [totalStep])
  return (
    <div className='relative'>
      <div className='font-extrabold text-base text-gray-4a absolute top-22px left-5'>
        {currentStep}/{totalStep}
      </div>
      <svg
        width={size}
        height={size}
        viewBox='0 0 65 65'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='33' cy='33' r='32' fill='#ECEFF3' />
        <circle cx='33' cy='33' r='26' fill='white' />
        {startPoints.slice(0, currentStep).map((item, index) => (
          <path
            key={index}
            d={describeArc(
              33,
              33,
              28,
              item,
              item + 360 / totalStep - spaceAngle - spacing,
            )}
            stroke='url(#paint0_linear)'
            strokeWidth={6}
            strokeLinecap='round'
          />
        ))}
        <defs>
          <linearGradient
            id='paint0_linear'
            x1='33'
            y1='1'
            x2='33'
            y2='65'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor={stopColor1} />
            <stop offset='1' stopColor={stopColor2} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default CircleSteper
