import React from 'react'
import { TIconProps } from './iconProps'

export type THeartFilledProps = TIconProps

export const HeartFilled = ({
  size,
  className,
}: THeartFilledProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 16 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 5C16 1.84 14.283 0 11.5 0C10.016 0 9.026 0.566 8.447 1.724C8.36222 1.89316 8.18921 1.99997 8 1.99997C7.81079 1.99997 7.63778 1.89316 7.553 1.724C6.974 0.566 5.983 0 4.5 0C1.717 0 0 1.84 0 5C0 7.4 2.649 10.399 8 13.903C13.351 10.4 16 7.4 16 5Z'
        fill='currentColor'
      />
    </svg>
  )
}
