import React from 'react'
import { TIconProps } from './iconProps'

export type TMoneyProps = TIconProps

export const Money = ({ size, className }: TMoneyProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 14 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.40625 0C1.75781 0 1.20703 0.417969 1 1H13C12.793 0.417969 12.2422 0 11.5938 0H2.40625ZM1.5 2C0.675781 2 0 2.67578 0 3.5V8.5C0 9.32422 0.675781 10 1.5 10H12.5C13.3242 10 14 9.32422 14 8.5V3.5C14 2.67578 13.3242 2 12.5 2H1.5ZM2 3H12C12 3.54688 12.4531 4 13 4V8C12.4531 8 12 8.45312 12 9H2C2 8.45312 1.54688 8 1 8V4C1.54688 4 2 3.54688 2 3ZM7 4C5.90234 4 5 4.90234 5 6C5 7.09766 5.90234 8 7 8C8.09766 8 9 7.09766 9 6C9 4.90234 8.09766 4 7 4ZM3 5C2.44922 5 2 5.44922 2 6C2 6.55078 2.44922 7 3 7C3.55078 7 4 6.55078 4 6C4 5.44922 3.55078 5 3 5ZM7 5C7.55859 5 8 5.44141 8 6C8 6.55859 7.55859 7 7 7C6.44141 7 6 6.55859 6 6C6 5.44141 6.44141 5 7 5ZM11 5C10.4492 5 10 5.44922 10 6C10 6.55078 10.4492 7 11 7C11.5508 7 12 6.55078 12 6C12 5.44922 11.5508 5 11 5Z'
        fill='currentColor'
      />
    </svg>
  )
}
