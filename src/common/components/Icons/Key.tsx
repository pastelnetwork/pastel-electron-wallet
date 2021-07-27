import React from 'react'
import { TIconProps } from './iconProps'

export type TKeyProps = TIconProps

export const Key = ({ size, className }: TKeyProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 23 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.25 10.25L14 10.25M17 13.25L17 10.25L14 10.25M14 10.25L14 12.25'
        stroke='currentColor'
        strokeWidth='1.2'
      />
      <circle
        cx='8'
        cy='10.5'
        r='2.5'
        transform='rotate(-90 8 10.5)'
        stroke='currentColor'
        strokeWidth='1.2'
      />
    </svg>
  )
}
