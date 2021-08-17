import React from 'react'
import { TIconProps } from './iconProps'

type TDir = 'top' | 'right' | 'bottom' | 'left'

export type TCaretProps = TIconProps & {
  to?: TDir
  variant?: string
}

const rotate: Record<TDir, number> = {
  top: 180,
  right: -90,
  bottom: 0,
  left: 90,
}

export const Caret = ({
  size,
  to = 'right',
  className,
  variant,
}: TCaretProps): JSX.Element => {
  const style = { transform: `rotate(${rotate[to]}deg)` }

  return (
    <svg
      width={size}
      className={className}
      style={style}
      viewBox='0 0 10 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {variant === 'full' ? (
        <path
          opacity='0.5'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.05208 0C0.684274 0 0.511432 0.454606 0.786334 0.698964L4.73425 4.20823C4.88581 4.34294 5.11419 4.34294 5.26575 4.20823L9.21367 0.698964C9.48857 0.454606 9.31573 0 8.94792 0H1.05208Z'
          fill='#4A5568'
        />
      ) : (
        <path
          d='M1 1L5 5L9 1'
          stroke='#B0B7C3'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
}
