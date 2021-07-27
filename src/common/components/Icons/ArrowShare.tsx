import React from 'react'
import { TIconProps } from './iconProps'

export type TArrowShareProps = TIconProps

export const ArrowShare = ({
  size,
  className,
}: TArrowShareProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 20 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.1765 17.4963C1.201 17.4988 1.226 17.4998 1.2505 17.4998C1.6045 17.4998 1.9145 17.2503 1.9855 16.8968C3.0345 11.6488 8.504 11.2753 11 11.3913V15.2498C11 15.5528 11.1825 15.8263 11.463 15.9428C11.743 16.0583 12.0655 15.9948 12.2805 15.7803L19.2805 8.78032C19.5735 8.48782 19.5735 8.01232 19.2805 7.71982L12.2805 0.719817C12.066 0.505317 11.7435 0.440817 11.463 0.557317C11.1825 0.672817 11 0.946317 11 1.24982V5.09732C8.1835 5.46532 0.5 7.33332 0.5 16.7498C0.5 17.1353 0.7925 17.4583 1.1765 17.4963Z'
        fill='currentColor'
      />
    </svg>
  )
}
