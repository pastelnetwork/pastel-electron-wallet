import React from 'react'

export type TTriangleEliminationProps = {
  size?: number
  className?: string
}

export const TriangleElimination = ({
  size = 44,
  className = 'text-red-fe',
}: TTriangleEliminationProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22.7996 4.40039C21.3064 4.40039 19.8133 5.10937 18.9646 6.52734L2.79765 33.544C1.0789 36.4014 3.28105 40.1289 6.62187 40.1289H38.9666C42.3182 40.1289 44.5203 36.4014 42.8123 33.544L26.6346 6.52734C25.7859 5.10937 24.2928 4.40039 22.7996 4.40039ZM22.7996 7.10742C23.3689 7.10742 23.9383 7.38672 24.282 7.94531L40.449 34.9512C41.1258 36.0791 40.3738 37.3789 38.9666 37.3789H6.62187C5.22539 37.3789 4.47343 36.0791 5.15019 34.9512L21.3172 7.94531C21.6609 7.38672 22.2303 7.10742 22.7996 7.10742ZM21.4031 15.3789V29.1289H24.1531V15.3789H21.4031ZM21.4031 31.8789V34.6289H24.1531V31.8789H21.4031Z'
        fill='currentColor'
      />
    </svg>
  )
}
