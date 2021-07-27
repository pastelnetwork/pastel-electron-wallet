import React from 'react'
import { TIconProps } from './iconProps'

export type TDiamondProps = TIconProps

export const Diamond = ({ size, className }: TDiamondProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.8764 0.964844L4.4014 4.65484L5.17765 0.964844H7.8764ZM10.8052 0.964844L11.5964 4.65484L8.1589 0.964844H10.8052ZM11.4377 5.44109H4.56015L8.00015 1.74234L11.4377 5.44109ZM3.58766 5.44109H0.402656L4.4889 1.14234L3.58766 5.44109ZM3.62516 6.08109L6.7389 14.2911L0.378906 6.08109H3.62516ZM4.32016 6.08109H11.6802L8.00015 15.6223L4.32016 6.08109ZM12.4102 5.44109L11.4927 1.12484L15.5714 5.44109H12.4102ZM9.2639 14.2848L12.3764 6.08109H15.6102L9.2639 14.2848Z'
        fill='currentColor'
      />
    </svg>
  )
}
