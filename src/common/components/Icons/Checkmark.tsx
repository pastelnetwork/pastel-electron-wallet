import React from 'react'
import { TIconProps } from './iconProps'

export type TCheckmarkProps = TIconProps

export const Checkmark: React.FC<TCheckmarkProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      viewBox='0 0 16 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M15 1L5.375 10.3333L1 6.09056'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
