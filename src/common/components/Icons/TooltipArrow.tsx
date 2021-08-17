import React from 'react'

export type TTooltipArrowProps = {
  size?: number
  className?: string
}

export const TooltipArrow = ({
  size = 8,
  className = 'text-gray-33',
}: TTooltipArrowProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 8 4'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 0L4 4L2.67469e-07 -9.14377e-07L8 0Z'
        fill='currentColor'
      />
    </svg>
  )
}
