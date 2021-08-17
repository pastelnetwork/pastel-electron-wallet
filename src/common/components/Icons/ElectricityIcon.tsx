import React from 'react'

export type TElectricityIcon = {
  size?: number
  className?: string
}

export const ElectricityIcon = ({
  size = 20,
  className = 'text-gray-3f',
}: TElectricityIcon): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 11 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.5 11.6673V11.1673H5H0.837109L5.33333 2.81719L5.33333 8.33398V8.83398H5.83333H9.99623L5.5 17.1841L5.5 11.6673Z'
        fill='currentColor'
        stroke='currentColor'
      />
    </svg>
  )
}
