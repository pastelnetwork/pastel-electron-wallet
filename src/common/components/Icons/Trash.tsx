import React from 'react'
import { TIconProps } from './iconProps'

export type TTrashProps = TIconProps

export const Trash = ({ size, className }: TTrashProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 14 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.5 0.5L4.75 1.25H0.25V2.75H1.08203L2.41943 14.1919V14.1978C2.5177 14.9378 3.16024 15.5 3.90625 15.5H10.0923C10.8383 15.5 11.4808 14.9377 11.5791 14.1978L11.5806 14.1919L12.918 2.75H13.75V1.25H9.25L8.5 0.5H5.5ZM2.59375 2.75H11.4062L10.0923 14H3.90625L2.59375 2.75Z'
        fill='currentColor'
      />
    </svg>
  )
}
