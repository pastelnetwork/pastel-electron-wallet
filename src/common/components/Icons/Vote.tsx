import React from 'react'

export type TVoteProps = {
  size: number
  className: string
}

export default function Arrow({ size, className }: TVoteProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='16'
        cy='16'
        r='15.5'
        stroke='#E4E4E4'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M20.5 14.5H16V11.5C16 10.6 15.4 10 14.5 10L12.25 15.25H10.75C10.3 15.25 10 15.55 10 16V21.25C10 21.7 10.3 22 10.75 22H19C20.05 22 21.025 21.25 21.175 20.2L21.925 16.3C22.15 15.4 21.475 14.5 20.5 14.5Z'
        fill='currentColor'
      />
    </svg>
  )
}
