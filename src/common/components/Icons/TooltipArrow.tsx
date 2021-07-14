import React from 'react'

export type TTooltipArrowProps = {
  width?: number
  height?: number
  className?: string
}

export const TooltipArrow: React.FC<TTooltipArrowProps> = ({
  width = 8,
  height = 4,
  className = 'text-gray-33',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 8 4'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8 0L4 4L2.67469e-07 -9.14377e-07L8 0Z'
        fill='currentColor'
      />
    </svg>
  )
}
