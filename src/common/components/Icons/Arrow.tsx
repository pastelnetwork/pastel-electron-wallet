import React from 'react'
import { TIconProps } from './iconProps'

type TDir = 'top' | 'right' | 'bottom' | 'left'

export type TArrowProps = TIconProps & {
  to?: TDir
}

const rotate: Record<TDir, number> = {
  top: -90,
  right: 0,
  bottom: 90,
  left: 180,
}

export const Arrow = ({
  size,
  to = 'right',
  className,
}: TArrowProps): JSX.Element => {
  const style = { transform: `rotate(${rotate[to]}deg)` }

  return (
    <svg
      width={size}
      style={style}
      className={className}
      viewBox='0 0 11 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.58437 1.57227L9.69043 5.00084L5.58437 8.42941M1.47831 5.00084L9.10385 5.00084'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
