import React from 'react'

export type TRefreshIconProps = {
  size?: number
  className?: string
}

export const RefreshIcon = ({
  size = 16,
  className = 'text-blue-3f',
}: TRefreshIconProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 16 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 0.75C4.48462 0.75 1.54932 2.92261 0.351562 5.99219L1.61914 6.50781C2.62085 3.94043 5.05127 2.125 8 2.125C10.229 2.125 12.2163 3.21802 13.457 4.875H10.75V6.25H15.5625V1.4375H14.1875V3.56445C12.6809 1.83765 10.4546 0.75 8 0.75ZM14.3809 11.4922C13.3792 14.0596 10.9487 15.875 8 15.875C5.74683 15.875 3.76758 14.7659 2.52148 13.125H5.25V11.75H0.4375L0.4375 16.5625H1.8125L1.8125 14.4355C3.31641 16.1409 5.52124 17.25 8 17.25C11.5154 17.25 14.4507 15.0774 15.6484 12.0078L14.3809 11.4922Z'
        fill='currentColor'
      />
    </svg>
  )
}
