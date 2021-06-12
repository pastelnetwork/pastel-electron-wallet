import React, { SVGProps } from 'react'

export type TCircleProps = Omit<
  SVGProps<SVGCircleElement>,
  'strokeWidth' | 'radius'
> & {
  strokeWidth?: number
  radius?: number
  percent?: number
}

const defaultStrokeWidth = 6
const defaultRadius = 50

export default function Circle({
  className,
  strokeWidth = defaultStrokeWidth,
  radius = defaultRadius,
  percent,
  ...props
}: TCircleProps): JSX.Element {
  let dashArray, dashOffset
  if (percent) {
    const length = radius * 2 * Math.PI
    dashArray = String(length)
    dashOffset = (length * (100 - percent)) / 100
  }

  return (
    <circle
      cx='50%'
      cy='50%'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      r={radius - strokeWidth / 2}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
      strokeDasharray={dashArray || props.strokeDasharray}
      strokeDashoffset={dashOffset || props.strokeDashoffset}
    />
  )
}
