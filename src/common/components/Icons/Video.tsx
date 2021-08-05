import React from 'react'

export type TVideoProps = {
  size: number
  className?: string
}

export function Video({ size, className }: TVideoProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 55 55'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.9375 51.5625V3.4375H34.0904L46.0625 15.4096V51.5625H8.9375Z'
        fill='#fff'
      />
      <path
        d='M33.8057 4.125L45.375 15.6942V50.875H9.625V4.125H33.8057ZM34.375 2.75H8.25V52.25H46.75V15.125L34.375 2.75Z'
        fill='#4788C7'
      />
      <path
        d='M33.6875 15.8125V3.4375H34.0904L46.0625 15.4096V15.8125H33.6875Z'
        fill='#DFF0FE'
      />
      <path
        d='M34.375 4.69425L44.8057 15.125H34.375V4.69425ZM34.375 2.75H33V16.5H46.75V15.125L34.375 2.75Z'
        fill='#4788C7'
      />
      <path
        d='M22 21.6816V38.8169L37.2309 30.2493L22 21.6816Z'
        fill='#98CCFD'
      />
    </svg>
  )
}
