import React, { forwardRef, SVGProps } from 'react'

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

const getCircleLength = (radius: number, strokeWidth: number) =>
  (radius * 2 - strokeWidth) * Math.PI

export const getStrokeDashOffsetForPercent = (
  radius: number,
  strokeWidth: number,
  percent: number,
): number => {
  const length = getCircleLength(radius, strokeWidth)
  return (length * (100 - percent)) / 100
}

export default forwardRef<SVGCircleElement, TCircleProps>(function Circle(
  {
    className,
    strokeWidth = defaultStrokeWidth,
    radius = defaultRadius,
    percent,
    ...props
  },
  ref,
) {
  let dashArray, dashOffset
  if (percent !== undefined) {
    dashArray = String(getCircleLength(radius, strokeWidth))
    dashOffset = getStrokeDashOffsetForPercent(radius, strokeWidth, percent)
  }

  return (
    <circle
      ref={ref}
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
})
