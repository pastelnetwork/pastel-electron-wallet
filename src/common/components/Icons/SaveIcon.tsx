import React from 'react'

export type TSaveProps = {
  size?: number
  className?: string
}

export const SaveIcon = ({
  size = 20,
  className = 'text-gray-3f',
}: TSaveProps): JSX.Element => {
  return (
    <svg
      className={className}
      width={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.6 6C3.6 4.67452 4.67452 3.6 6 3.6H11.5049C11.8762 3.6 12.2323 3.7475 12.4949 4.01005L15.99 7.50514C16.2525 7.7677 16.4 8.12379 16.4 8.49509V14C16.4 15.3255 15.3255 16.4 14 16.4H6C4.67452 16.4 3.6 15.3255 3.6 14V6Z'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.6 13C6.6 12.2268 7.2268 11.6 8 11.6H12C12.7732 11.6 13.4 12.2268 13.4 13V16.4H6.6V13Z'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.4 6C10.4 6.7732 9.7732 7.4 9 7.4L8 7.4C7.2268 7.4 6.6 6.7732 6.6 6L6.6 3.6L10.4 3.6L10.4 6Z'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
