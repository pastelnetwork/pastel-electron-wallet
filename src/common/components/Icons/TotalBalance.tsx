import React from 'react'

export type TToatalBalanceProps = {
  size?: number
  className?: string
  variant?: 'active' | 'inactive'
}

export const TotalBalance = ({
  size = 69,
  className = 'text-gray-88',
  variant = 'active',
}: TToatalBalanceProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 69 66'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M32.0834 46.125C32.0834 50.7663 33.9271 55.2175 37.209 58.4994C40.4909 61.7813 44.9421 63.625 49.5834 63.625C54.2247 63.625 58.6759 61.7813 61.9577 58.4994C65.2396 55.2175 67.0834 50.7663 67.0834 46.125C67.0834 41.4837 65.2396 37.0325 61.9577 33.7506C58.6759 30.4687 54.2247 28.625 49.5834 28.625C44.9421 28.625 40.4909 30.4687 37.209 33.7506C33.9271 37.0325 32.0834 41.4837 32.0834 46.125Z'
        stroke={variant === 'active' ? 'url(#paint0_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.1875 11.125C2.1875 13.4456 4.03124 15.6712 7.31313 17.3122C10.595 18.9531 15.0462 19.875 19.6875 19.875C24.3288 19.875 28.78 18.9531 32.0619 17.3122C35.3438 15.6712 37.1875 13.4456 37.1875 11.125C37.1875 8.80436 35.3438 6.57876 32.0619 4.93782C28.78 3.29687 24.3288 2.375 19.6875 2.375C15.0462 2.375 10.595 3.29687 7.31313 4.93782C4.03124 6.57876 2.1875 8.80436 2.1875 11.125V11.125Z'
        stroke={variant === 'active' ? 'url(#paint1_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.1875 19.875C37.1875 24.7079 29.3533 28.625 19.6875 28.625C10.0217 28.625 2.1875 24.7079 2.1875 19.875'
        stroke={variant === 'active' ? 'url(#paint2_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.1875 24.25V11.125'
        stroke={variant === 'active' ? 'url(#paint3_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.1875 11.125V54.875C2.1875 59.7079 10.0217 63.625 19.6875 63.625C21.8913 63.6285 24.0898 63.4106 26.25 62.9746'
        stroke={variant === 'active' ? 'url(#paint4_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.1875 46.125C2.1875 50.9579 10.0217 54.875 19.6875 54.875C21.8913 54.8785 24.0898 54.6606 26.25 54.2246'
        stroke={variant === 'active' ? 'url(#paint5_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.1875 37.375C2.1875 42.2079 10.0217 46.125 19.6875 46.125C21.8913 46.1285 24.0898 45.9106 26.25 45.4746'
        stroke={variant === 'active' ? 'url(#paint6_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.1875 28.625C2.1875 33.4579 10.0217 37.375 19.6875 37.375C21.8913 37.3785 24.0898 37.1606 26.25 36.7246'
        stroke={variant === 'active' ? 'url(#paint7_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M51.352 39.221V39.2854C52.5939 39.484 53.5459 40.5649 53.5459 41.8646C53.5459 43.1641 52.5939 44.2451 51.352 44.4436V44.5247H47.2353V55.9424L50.5354 59.25L50.5326 47.813L50.9444 47.8124C54.2145 47.81 56.875 45.1418 56.875 41.8646C56.875 38.6146 54.2369 35.9467 50.9945 35.9172L50.9149 35.9167H43.75L47.0473 39.221H51.352Z'
        fill={variant === 'active' ? 'url(#paint8_linear)' : '#B9BFCB'}
      />
      <defs>
        <linearGradient
          id='paint0_linear'
          x1='49.5834'
          y1='28.625'
          x2='49.5834'
          y2='63.625'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint1_linear'
          x1='19.6875'
          y1='2.375'
          x2='19.6875'
          y2='19.875'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint2_linear'
          x1='19.6875'
          y1='19.875'
          x2='19.6875'
          y2='28.625'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint3_linear'
          x1='37.6875'
          y1='11.125'
          x2='37.6875'
          y2='24.25'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint4_linear'
          x1='14.2188'
          y1='11.125'
          x2='14.2188'
          y2='63.625'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint5_linear'
          x1='14.2188'
          y1='46.125'
          x2='14.2188'
          y2='54.875'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint6_linear'
          x1='14.2188'
          y1='37.375'
          x2='14.2188'
          y2='46.125'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint7_linear'
          x1='14.2188'
          y1='28.625'
          x2='14.2188'
          y2='37.375'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint8_linear'
          x1='50.3125'
          y1='59.25'
          x2='50.3125'
          y2='35.9167'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
      </defs>
    </svg>
  )
}
