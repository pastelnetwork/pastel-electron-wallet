import React from 'react'

export type TCircleCloseProps = {
  size?: number
  className?: string
  circleColor?: string
  onClick?: () => void
}

export const CircleCloseIcon = ({
  size = 22,
  className = 'text-gray-88',
  circleColor = '#F6F7F9',
  onClick,
}: TCircleCloseProps): JSX.Element => {
  return (
    <svg
      onClick={() => {
        onClick && onClick()
      }}
      width={size}
      className={className}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='11' cy='11' r='11' fill={circleColor} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.91917 7.21209C7.72564 7.01511 7.40907 7.01231 7.21209 7.20583C7.01511 7.39936 7.01231 7.71593 7.20583 7.91291L10.1272 10.8864L7.20583 13.86C7.01231 14.0569 7.01511 14.3735 7.21209 14.567C7.40907 14.7606 7.72564 14.7578 7.91917 14.5608L10.8281 11.5999L13.7371 14.5608C13.9306 14.7578 14.2472 14.7606 14.4442 14.567C14.6411 14.3735 14.6439 14.0569 14.4504 13.86L11.5291 10.8864L14.4504 7.91291C14.6439 7.71593 14.6411 7.39936 14.4442 7.20583C14.2472 7.01231 13.9306 7.01511 13.7371 7.21209L10.8281 10.173L7.91917 7.21209Z'
        fill='currentColor'
      />
    </svg>
  )
}
