import React from 'react'

export type TTransparencyBalanceProps = {
  size?: number
  className?: string
  variant?: 'active' | 'inactive'
}

export function TransparencyBalance({
  size = 70,
  className = 'text-gray-88',
  variant = 'active',
}: TTransparencyBalanceProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0)'>
        <path
          d='M19.6084 19.7922L19.7564 19.7563L19.7924 19.6083C22.4863 8.51327 32.5031 0.25 44.414 0.25C58.3841 0.25 69.75 11.6159 69.75 25.586C69.75 37.4969 61.4867 47.5139 50.3916 50.2078L50.2436 50.2437L50.2076 50.3917C47.5137 61.4867 37.4969 69.75 25.586 69.75C11.6159 69.75 0.25 58.3841 0.25 44.414C0.25 32.5031 8.51327 22.4861 19.6084 19.7922ZM19.1281 24.0183L19.1507 23.6502L18.8003 23.7656C10.1294 26.6222 3.85156 34.7974 3.85156 44.414C3.85156 56.3987 13.6013 66.1484 25.586 66.1484C35.2024 66.1484 43.3777 59.8707 46.2343 51.1997L46.3497 50.8493L45.9815 50.8719C45.4622 50.9038 44.94 50.9219 44.414 50.9219C30.444 50.9219 19.0781 39.5559 19.0781 25.5858C19.0781 25.0599 19.0962 24.5377 19.1281 24.0183ZM46.9521 47.1713L47.1485 47.1483L47.1714 46.952C47.2686 46.1194 47.3204 45.2729 47.3204 44.414C47.3204 43.5049 47.2634 42.6089 47.1547 41.7287L47.1276 41.5094H46.9066H30.2884H29.6228L30.1238 41.9476C33.9468 45.2909 38.9479 47.3202 44.4142 47.3202C45.273 47.3202 46.1195 47.2686 46.9521 47.1713ZM26.4447 37.7988L26.5191 37.908H26.6513H45.981H46.3274L46.2182 37.5792C45.5789 35.6541 44.6778 33.8479 43.5565 32.2029L43.4821 32.0937H43.35H24.0196H23.6731L23.7823 32.4225C24.4218 34.3475 25.3232 36.1538 26.4447 37.7988ZM22.8457 28.2729L22.8729 28.4921H23.0938H39.7136H40.3792L39.8782 28.054C36.0549 24.7098 31.0531 22.6796 25.5858 22.6796C24.727 22.6796 23.8805 22.7312 23.0479 22.8286L22.8515 22.8515L22.8286 23.0479C22.7314 23.8805 22.6796 24.727 22.6796 25.5858C22.6796 26.4956 22.7366 27.3922 22.8457 28.2729ZM50.8719 45.9815L50.8493 46.3497L51.1997 46.2343C59.8706 43.3777 66.1484 35.2024 66.1484 25.586C66.1484 13.6013 56.3987 3.85156 44.414 3.85156C34.7976 3.85156 26.6223 10.1293 23.7657 18.8002L23.6503 19.1505L24.0185 19.1279C24.5378 19.0961 25.06 19.0779 25.586 19.0779C39.556 19.0779 50.9219 30.444 50.9219 44.414C50.9219 44.94 50.9038 45.4622 50.8719 45.9815Z'
          fill={variant === 'active' ? 'url(#paint0_linear)' : '#B9BFCB'}
          strokeWidth='0.5'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear'
          x1='35'
          y1='0'
          x2='35'
          y2='70'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <clipPath id='clip0'>
          <rect width='70' height='70' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
