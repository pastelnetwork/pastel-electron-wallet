import React from 'react'

export type TAddNFTProps = {
  size?: number
  className?: string
}

export const AddNFTIcon = ({
  size = 21,
  className,
}: TAddNFTProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_i)'>
        <circle cx='10.5' cy='10' r='10' fill='url(#paint0_radial)' />
      </g>
      <g transform='translate(6, 5)'>
        <path
          d='M5.32488 5.83172H8.16488C8.62488 5.82172 8.99488 5.45172 8.99488 4.99172C8.99488 4.53172 8.62488 4.16172 8.16488 4.16172H5.32488V1.34172C5.32488 0.881719 4.95488 0.511719 4.49488 0.511719C4.03488 0.511719 3.66488 0.881719 3.66488 1.34172V4.16172H0.834883C0.614883 4.16172 0.404883 4.25172 0.244883 4.40172C0.092837 4.56076 0.00702739 4.7717 0.00488281 4.99172C0.00488281 5.45172 0.374883 5.82172 0.834883 5.83172H3.66488V8.66172C3.66488 9.12172 4.03488 9.49172 4.49488 9.49172C4.95488 9.49172 5.32488 9.12172 5.32488 8.66172V5.83172Z'
          fill='#FFFFFF'
        />
      </g>

      <defs>
        <filter
          id='filter0_i'
          x='0.5'
          y='-2'
          width='20'
          height='22'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-2' />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'
          />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
        </filter>
        <radialGradient
          id='paint0_radial'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(21.9667 -1.8) rotate(136.111) scale(34.0418)'
        >
          <stop offset='0.0782458' stopColor='#FFCE12' />
          <stop offset='0.507247' stopColor='#E02DFF' />
          <stop offset='0.949356' stopColor='#17D9FF' />
        </radialGradient>
      </defs>
    </svg>
  )
}
