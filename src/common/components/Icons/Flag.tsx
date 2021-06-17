import React from 'react'
import { TIconProps } from './iconProps'

export type TFlagProps = TIconProps

export const Flag: React.FC<TFlagProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.15895 0C1.43145 0 0.466445 0.4725 0.188945 0.66C0.155195 0.6775 0.123945 0.70125 0.0989453 0.73C0.0951952 0.73 0.0926954 0.73 0.0889453 0.73L0.0789453 0.75C0.0676954 0.75875 0.0576954 0.76875 0.0489453 0.78L-0.00105469 0.82V0.9C-0.00355469 0.92 -0.00355469 0.94 -0.00105469 0.96V15.68C-0.00230469 15.795 0.0576954 15.9025 0.157695 15.9613C0.257695 16.0188 0.380195 16.0188 0.480195 15.9613C0.580195 15.9025 0.640195 15.795 0.638945 15.68V9.81C1.0127 9.65875 2.14395 9.28 4.15895 9.28C5.29019 9.28 6.1477 9.5325 7.13895 9.82C8.34144 10.1688 9.70269 10.56 11.8389 10.56C14.0502 10.56 15.7664 9.60125 15.8389 9.56L15.9989 9.47V0.74L15.5289 1C15.1289 1.21625 13.6802 1.92 11.8389 1.92C10.3102 1.92 9.24645 1.46125 8.11895 0.98C6.98395 0.49625 5.80895 0 4.15895 0Z'
        fill='currentColor'
      />
    </svg>
  )
}