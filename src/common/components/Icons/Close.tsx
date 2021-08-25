import React from 'react'

export type TCloseProps = {
  size: number
  pathClassName?: string
  circleClassName?: string
}

export const Close = ({
  size,
  pathClassName = '#8894AA',
  circleClassName = '#F6F7F9',
}: TCloseProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='8' cy='8' r='8' fill={circleClassName} />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.89333 5.14959C10.0869 4.95261 10.4034 4.94981 10.6004 5.14333C10.7974 5.33686 10.8002 5.65343 10.6067 5.85041L8.57593 7.91741L10.6067 9.9844C10.8002 10.1814 10.7974 10.498 10.6004 10.6915C10.4034 10.885 10.0869 10.8822 9.89333 10.6852L7.875 8.63085L5.85667 10.6852C5.66314 10.8822 5.34657 10.885 5.14959 10.6915C4.95261 10.498 4.94981 10.1814 5.14333 9.9844L7.17407 7.91741L5.14333 5.85041C4.94981 5.65343 4.95261 5.33686 5.14959 5.14333C5.34657 4.94981 5.66314 4.95261 5.85667 5.14959L7.875 7.20396L9.89333 5.14959Z'
        fill={pathClassName}
      />
    </svg>
  )
}
