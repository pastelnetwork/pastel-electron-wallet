import React from 'react'
import { TIconProps } from './iconProps'

export type TDiamondInHexagonProps = TIconProps & {
  fill?: string
  firstStopClassName?: string
  secondStopClassName?: string
}

export const DiamondInHexagon = ({
  size,
  className,
  fill = 'text-white',
  firstStopClassName,
  secondStopClassName,
}: TDiamondInHexagonProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.25 1.14434C12.4765 0.697756 11.5235 0.697755 10.75 1.14434L2.3577 5.98964C1.58419 6.43622 1.1077 7.26154 1.1077 8.1547V17.8453C1.1077 18.7385 1.58419 19.5638 2.3577 20.0104L10.75 24.8557C11.5235 25.3022 12.4765 25.3022 13.25 24.8557L21.6423 20.0104C22.4158 19.5638 22.8923 18.7385 22.8923 17.8453V8.1547C22.8923 7.26154 22.4158 6.43622 21.6423 5.98964L13.25 1.14434Z'
        fill='url(#diamond_in_hexagon_linear)'
        stroke='currentColor'
      />
      <g clipPath='url(#clip0)'>
        <path
          d='M11.9003 8.17188L9.12034 11.1239L9.74134 8.17188H11.9003ZM14.2433 8.17188L14.8763 11.1239L12.1263 8.17188H14.2433ZM14.7493 11.7529H9.24734L11.9993 8.79387L14.7493 11.7529ZM8.46934 11.7529H5.92134L9.19034 8.31387L8.46934 11.7529ZM8.49934 12.2649L10.9903 18.8329L5.90234 12.2649H8.49934ZM9.05534 12.2649H14.9433L11.9993 19.8979L9.05534 12.2649ZM15.5273 11.7529L14.7933 8.29987L18.0563 11.7529H15.5273ZM13.0103 18.8279L15.5003 12.2649H18.0873L13.0103 18.8279Z'
          className={fill}
          fill='currentColor'
        />
      </g>
      <defs>
        <linearGradient
          id='diamond_in_hexagon_linear'
          x1='0'
          y1='1'
          x2='25.8479'
          y2='3.19003'
          gradientUnits='userSpaceOnUse'
        >
          <stop className={firstStopClassName} stopColor='currentColor' />
          <stop
            className={secondStopClassName}
            offset='1'
            stopColor='currentColor'
          />
        </linearGradient>
        <clipPath id='clip0'>
          <rect
            width='12.8'
            height='12.8'
            fill='currentColor'
            className={fill}
            transform='translate(5.59961 7.40039)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
