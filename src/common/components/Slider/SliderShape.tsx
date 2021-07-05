import React, { CSSProperties } from 'react'

const paths = {
  296: (
    <path
      d='M 0 8 C 0 6.889 0.846 5.983 1.903 5.961 L 288.387 0.154 C 292.568 0.07 296 3.607 296 8 C 296 12.393 292.568 15.93 288.387 15.846 L 1.903 10.039 C 0.846 10.017 0 9.111 0 8 Z'
      fill='currentColor'
    />
  ),
  311: (
    <path
      d='M0 8C0 6.88924 0.889079 5.98285 1.99963 5.96142L303.001 0.154312C307.394 0.0695737 311 3.60691 311 8C311 12.3931 307.394 15.9304 303.001 15.8457L1.99963 10.0386C0.889079 10.0172 0 9.11076 0 8Z'
      fill='currentColor'
    />
  ),
  349: (
    <path
      d='M0 8C0 6.88991 0.889781 5.9847 1.9997 5.96562L341.001 0.137515C345.396 0.0619531 349 3.60414 349 8C349 12.3959 345.396 15.938 341.001 15.8625L1.9997 10.0344C0.889775 10.0153 0 9.11009 0 8Z'
      fill='currentColor'
    />
  ),
} as const

export type TWidth = keyof typeof paths

export const SliderShape = ({
  className,
  width,
  style,
}: {
  className: string
  width: TWidth
  style?: CSSProperties
}): JSX.Element => {
  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${width} 16`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {paths[width]}
    </svg>
  )
}
