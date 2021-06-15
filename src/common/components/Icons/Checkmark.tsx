import React from 'react'
import { TIconProps } from './iconProps'

export type TCheckmarkProps = TIconProps

export const Checkmark: React.FC<TCheckmarkProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 27 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M26.6046 0.981366C26.0774 0.454128 25.2227 0.454128 24.6954 0.981366L8.52158 17.1554L2.30462 10.9384C1.77744 10.4112 0.92272 10.4112 0.395429 10.9384C-0.13181 11.4656 -0.13181 12.3203 0.395429 12.8475L7.56699 20.019C8.09402 20.5462 8.94937 20.5458 9.47618 20.019L26.6046 2.89056C27.1319 2.36338 27.1318 1.5086 26.6046 0.981366Z'
        fill='currentColor'
      />
    </svg>
  )
}
