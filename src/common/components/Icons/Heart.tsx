import React from 'react'

export type HeartProps = {
  size: number
  className?: string
}

export default function Heart({ size, className }: HeartProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 18 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.4635 0.900304C11.1389 0.893431 9.8773 1.44786 9.00046 2.41865C8.12826 1.44105 6.86291 0.885099 5.5361 0.900304C2.97737 0.900613 0.9 2.93684 0.9 5.45255C0.9 6.53536 1.38098 7.60303 2.09452 8.59249C2.80868 9.5828 3.76192 10.5033 4.72121 11.2938C6.62405 12.862 8.56358 13.9293 8.74692 14.0261C8.90078 14.1246 9.09917 14.1246 9.25306 14.0261C9.43579 13.9299 11.3755 12.8773 13.2786 11.3163C14.238 10.5295 15.1913 9.61076 15.9056 8.61753C16.6193 7.62503 17.1 6.54999 17.1 5.45255C17.1 2.93673 15.0224 0.900443 12.4635 0.900304ZM12.4635 0.900304C12.4636 0.900304 12.4637 0.900305 12.4638 0.900305L12.4633 1.0003V0.900304C12.4634 0.900304 12.4635 0.900304 12.4635 0.900304ZM5.53672 1.89532L5.53801 1.89531C6.76466 1.8795 7.91179 2.48673 8.57192 3.49963L8.57178 3.49973L8.57528 3.50446C8.74589 3.73536 9.07356 3.78601 9.3077 3.61933L9.30772 3.61931C9.35253 3.5874 9.39208 3.54867 9.42474 3.50443L9.42484 3.5045L9.42752 3.50048C10.5232 1.85596 12.7715 1.39345 14.4487 2.46974C15.475 3.1283 16.0919 4.25054 16.0898 5.45235V5.45252C16.0898 6.28853 15.7259 7.14053 15.1497 7.96389C14.5741 8.78641 13.7923 9.57214 12.9705 10.2735C11.371 11.6386 9.63162 12.6742 9.00067 13.0296C8.36925 12.6643 6.62947 11.6191 5.02953 10.2512C4.20768 9.54856 3.42585 8.7634 2.85017 7.9442C2.27385 7.12409 1.91013 6.27838 1.91013 5.45255C1.91013 3.48973 3.53202 1.89532 5.53672 1.89532Z'
        fill='#DA8AB8'
        stroke='#DA8AB8'
        stroke-width='0.2'
      />
    </svg>
  )
}
