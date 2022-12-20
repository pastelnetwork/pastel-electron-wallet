import React from 'react'

export type TEliminationIcon = {
  size?: number
  className?: string
}

export function EliminationIcon({
  size = 20,
  className = 'text-gray-8e',
}: TEliminationIcon): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 0.9375C5 0.9375 0.9375 5 0.9375 10C0.9375 15 5 19.0625 10 19.0625C15 19.0625 19.0625 15 19.0625 10C19.0625 5 15 0.9375 10 0.9375ZM10 1.875C14.4844 1.875 18.125 5.51562 18.125 10C18.125 14.4844 14.4844 18.125 10 18.125C5.51562 18.125 1.875 14.4844 1.875 10C1.875 5.51562 5.51562 1.875 10 1.875ZM10 5.9375C9.73438 5.9375 9.53125 6.14062 9.53125 6.40625V7.1875C9.53125 7.45312 9.73438 7.65625 10 7.65625C10.2656 7.65625 10.4688 7.45312 10.4688 7.1875V6.40625C10.4688 6.14062 10.2656 5.9375 10 5.9375ZM10 9.0625C9.73438 9.0625 9.53125 9.26562 9.53125 9.53125V13.5938C9.53125 13.8594 9.73438 14.0625 10 14.0625C10.2656 14.0625 10.4688 13.8594 10.4688 13.5938V9.53125C10.4688 9.26562 10.2656 9.0625 10 9.0625Z'
        fill='currentColor'
      />
    </svg>
  )
}