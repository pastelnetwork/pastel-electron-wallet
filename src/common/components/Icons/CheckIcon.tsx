import React from 'react'
import { TIconProps } from './iconProps'

export type TCheckIconProps = TIconProps & {
  strokeWidth?: number
  onClick?: () => void
}

export const CheckIcon = ({
  size,
  className,
  strokeWidth = 2,
  onClick,
}: TCheckIconProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 11 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <path
        d='M9.41443 1L3.62976 6.9396L1 4.23956'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
