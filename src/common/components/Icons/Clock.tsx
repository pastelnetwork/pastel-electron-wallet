import React from 'react'

export type TClockProps = {
  size?: number
  className?: string
}

export const Clock: React.FC<TClockProps> = ({
  size = 18,
  className = 'text-gray-71',
}: TClockProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.99822 0.925781C4.47852 0.925781 0.816406 4.58789 0.816406 9.1076C0.816406 13.6273 4.47852 17.2894 8.99822 17.2894C13.5179 17.2894 17.18 13.6273 17.18 9.1076C17.18 4.58789 13.5179 0.925781 8.99822 0.925781ZM8.99822 2.28942C12.7642 2.28942 15.8164 5.34162 15.8164 9.1076C15.8164 12.8736 12.7642 15.9258 8.99822 15.9258C5.23224 15.9258 2.18004 12.8736 2.18004 9.1076C2.18004 5.34162 5.23224 2.28942 8.99822 2.28942ZM8.27379 3.56783L7.9755 9.15021L8.03942 9.7468L12.2369 13.4542L12.8974 12.7724L9.42436 9.08629L9.12607 3.56783H8.27379Z'
        fill='currentColor'
      />
    </svg>
  )
}
