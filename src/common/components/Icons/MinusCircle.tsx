import React from 'react'

export type TMinusCircleProps = {
  size: number
  className?: string
}

export function MinusCircle({
  size,
  className,
}: TMinusCircleProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.29102 12.416C2.90827 12.416 0.166016 9.67377 0.166016 6.29102C0.166016 2.90827 2.90827 0.166016 6.29102 0.166016C9.67377 0.166016 12.416 2.90827 12.416 6.29102C12.416 9.67377 9.67377 12.416 6.29102 12.416ZM6.29102 11.8327C9.35159 11.8327 11.8327 9.35159 11.8327 6.29102C11.8327 3.23044 9.35159 0.749349 6.29102 0.749349C3.23044 0.749349 0.749349 3.23044 0.749349 6.29102C0.749349 9.35159 3.23044 11.8327 6.29102 11.8327ZM3.95768 6.58268C3.7966 6.58268 3.66602 6.4521 3.66602 6.29102C3.66602 6.12993 3.7966 5.99935 3.95768 5.99935H8.62435C8.78543 5.99935 8.91602 6.12993 8.91602 6.29102C8.91602 6.4521 8.78543 6.58268 8.62435 6.58268H3.95768Z'
        fill='currentColor'
      />
    </svg>
  )
}
