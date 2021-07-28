import React from 'react'

export type TCircleCheckProps = {
  size?: number
  className?: string
  pathColor?: string
}

export const CircleCheck = ({
  size = 40,
  className = 'text-green-45',
}: TCircleCheckProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width='40'
        height='40'
        rx='20'
        fill='currentColor'
        fillOpacity='0.15'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M27.5455 14.7045C27.9848 15.1438 27.9848 15.8562 27.5455 16.2955L18.5455 25.2955C18.1062 25.7348 17.3938 25.7348 16.9545 25.2955L12.4545 20.7955C12.0152 20.3562 12.0152 19.6438 12.4545 19.2045C12.8938 18.7652 13.6062 18.7652 14.0455 19.2045L17.75 22.909L25.9545 14.7045C26.3938 14.2652 27.1062 14.2652 27.5455 14.7045Z'
        fill='currentColor'
      />
    </svg>
  )
}
