import React from 'react'
import { TIconProps } from './iconProps'

export type TWarningProps = TIconProps

export const Warning = ({ size, className }: TWarningProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.50081 1.00781C6.95785 1.00781 6.41488 1.26562 6.10628 1.78125L0.227378 11.6055C-0.397623 12.6445 0.403159 14 1.618 14H13.3797C14.5985 14 15.3993 12.6445 14.7782 11.6055L8.89534 1.78125C8.58675 1.26562 8.04378 1.00781 7.50081 1.00781ZM7.50081 1.99219C7.70785 1.99219 7.91488 2.09375 8.03988 2.29687L13.9188 12.1172C14.1649 12.5273 13.8914 13 13.3797 13H1.618C1.11019 13 0.836753 12.5273 1.08285 12.1172L6.96175 2.29687C7.08675 2.09375 7.29378 1.99219 7.50081 1.99219ZM6.993 5V10H7.993V5H6.993ZM6.993 11V12H7.993V11H6.993Z'
        fill='currentColor'
      />
    </svg>
  )
}
