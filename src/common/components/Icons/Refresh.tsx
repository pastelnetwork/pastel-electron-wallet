import React from 'react'

export type TRefreshProps = {
  size?: number
  className?: string
  pathColor?: string
}

export const Refresh = ({
  size = 44,
  className = 'text-gray-33',
  pathColor = '#FFFFFF',
}: TRefreshProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='22' cy='22' r='22' fill='currentColor' />
      <path
        d='M22 13C18.165 13 14.9629 15.3701 13.6562 18.7188L15.0391 19.2812C16.1318 16.4805 18.7832 14.5 22 14.5C24.4316 14.5 26.5996 15.6924 27.9531 17.5H25V19H30.25V13.75H28.75V16.0703C27.1064 14.1865 24.6777 13 22 13ZM28.9609 24.7188C27.8682 27.5195 25.2168 29.5 22 29.5C19.542 29.5 17.3828 28.29 16.0234 26.5H19V25H13.75V30.25H15.25V27.9297C16.8906 29.79 19.2959 31 22 31C25.835 31 29.0371 28.6299 30.3438 25.2812L28.9609 24.7188Z'
        fill={pathColor}
      />
    </svg>
  )
}
