import React from 'react'
import cn from 'classnames'

export type TMessageIconProps = {
  size?: number
  className?: string
  hasNotification?: boolean
}

export const MessageIcon = ({
  size = 18,
  className = 'text-gray-33',
  hasNotification = false,
}: TMessageIconProps): JSX.Element => {
  return (
    <div className={cn(className, 'relative')} style={{ width: size }}>
      {hasNotification && (
        <div className='absolute -top-px -right-px w-2 h-2 rounded-full bg-orange-63 border border-white' />
      )}
      <svg
        width={size}
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.00033 0.666016C4.40545 0.666016 0.666992 4.40447 0.666992 8.99935C0.666992 10.3641 1.02645 11.6397 1.60938 12.777L0.706055 16.0111C0.495658 16.7625 1.23863 17.5054 1.99023 17.2952L5.22673 16.3919C6.36313 16.9736 7.63689 17.3327 9.00033 17.3327C13.5952 17.3327 17.3337 13.5942 17.3337 8.99935C17.3337 4.40447 13.5952 0.666016 9.00033 0.666016ZM9.00033 1.91602C12.9196 1.91602 16.0837 5.08006 16.0837 8.99935C16.0837 12.9186 12.9196 16.0827 9.00033 16.0827C7.74967 16.0827 6.57974 15.7575 5.55957 15.1891C5.41577 15.109 5.24616 15.0888 5.08757 15.133L2.00977 15.9915L2.86914 12.9154C2.91354 12.7565 2.89335 12.5866 2.81299 12.4425C2.24351 11.4216 1.91699 10.2512 1.91699 8.99935C1.91699 5.08006 5.08104 1.91602 9.00033 1.91602ZM6.08366 8.16683C5.62324 8.16683 5.25033 8.53975 5.25033 9.00016C5.25033 9.46058 5.62324 9.8335 6.08366 9.8335C6.54408 9.8335 6.91699 9.46058 6.91699 9.00016C6.91699 8.53975 6.54408 8.16683 6.08366 8.16683ZM9.00033 8.16683C8.53991 8.16683 8.16699 8.53975 8.16699 9.00016C8.16699 9.46058 8.53991 9.8335 9.00033 9.8335C9.46074 9.8335 9.83366 9.46058 9.83366 9.00016C9.83366 8.53975 9.46074 8.16683 9.00033 8.16683ZM11.917 8.16683C11.4566 8.16683 11.0837 8.53975 11.0837 9.00016C11.0837 9.46058 11.4566 9.8335 11.917 9.8335C12.3774 9.8335 12.7503 9.46058 12.7503 9.00016C12.7503 8.53975 12.3774 8.16683 11.917 8.16683Z'
          fill='currentColor'
        />
      </svg>
    </div>
  )
}