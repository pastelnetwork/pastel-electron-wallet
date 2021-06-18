import React from 'react'
import { TIconProps } from './iconProps'

type TDir = 'top' | 'right' | 'bottom' | 'left'

export type TCaretProps = TIconProps & {
  to?: TDir
}

const rotate: Record<TDir, number> = {
  top: 180,
  right: -90,
  bottom: 0,
  left: 90,
}

export const Caret: React.FC<TCaretProps> = ({
  size,
  to = 'right',
  className,
}) => {
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
      <path
        d='M1 1L5 5L9 1'
        stroke='#B0B7C3'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
