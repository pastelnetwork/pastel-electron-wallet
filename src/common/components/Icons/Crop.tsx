import React from 'react'
import { TIconProps } from './iconProps'

export type TCropProps = TIconProps

export const Crop = ({ size, className }: TCropProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 0V15H18V12.75H6.32812L12.75 6.32812V12H15V4.07812L17.7891 1.28906L16.7109 0.210938L13.9219 3H6V5.25H11.6719L5.25 11.6719V0H3ZM0 3V5.25H2.25V3H0ZM12.75 15.75V18H15V15.75H12.75Z'
        fill='currentColor'
      />
    </svg>
  )
}
