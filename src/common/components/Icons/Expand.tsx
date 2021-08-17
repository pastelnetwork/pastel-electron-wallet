import React from 'react'
import { TIconProps } from './iconProps'

export type TExpandProps = TIconProps

export const Expand = ({ size, className }: TExpandProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.25 0.25V4.75L1.96973 3.03027L4.66943 5.72998L5.72998 4.66943L3.03027 1.96973L4.75 0.25H0.25ZM9.25 0.25L10.9697 1.96973L8.27002 4.66943L9.33057 5.72998L12.0303 3.03027L13.75 4.75V0.25H9.25ZM4.66943 8.27002L1.96973 10.9697L0.25 9.25V13.75H4.75L3.03027 12.0303L5.72998 9.33057L4.66943 8.27002ZM9.33057 8.27002L8.27002 9.33057L10.9697 12.0303L9.25 13.75H13.75V9.25L12.0303 10.9697L9.33057 8.27002Z'
        fill='currentColor'
      />
    </svg>
  )
}
