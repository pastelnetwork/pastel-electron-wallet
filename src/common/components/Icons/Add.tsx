import React from 'react'

export type TAddIconProps = {
  size?: number
  className?: string
  strokeWidth?: number
}

export const AddIcon = ({
  size = 29,
  className = 'text-blue-3f',
  strokeWidth = 1.4,
}: TAddIconProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 29 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.37314 11.6333C6.98543 9.02305 9.02355 6.98494 11.6338 6.37265C13.5189 5.93047 15.4808 5.93047 17.3659 6.37265C19.9761 6.98494 22.0142 9.02306 22.6265 11.6333C23.0687 13.5184 23.0687 15.4803 22.6265 17.3654C22.0142 19.9756 19.9761 22.0138 17.3659 22.626C15.4808 23.0682 13.5189 23.0682 11.6338 22.626C9.02355 22.0138 6.98543 19.9756 6.37314 17.3654C5.93096 15.4803 5.93096 13.5184 6.37314 11.6333Z'
        stroke='currentColor'
        strokeWidth={strokeWidth}
      />
      <path
        d='M18.125 14.5H10.875M14.5 18.125L14.5 10.875'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
    </svg>
  )
}
