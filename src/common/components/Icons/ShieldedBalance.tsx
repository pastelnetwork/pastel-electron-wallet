import React from 'react'

export type TShieldedBalanceProps = {
  size?: number
  className?: string
  variant?: 'active' | 'inactive'
}

export const ShieldedBalance = ({
  size = 70,
  className = 'text-gray-88',
  variant = 'active',
}: TShieldedBalanceProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M5 6H64V61.0667H5V6Z'
        stroke={variant === 'active' ? 'url(#paint0_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.8 13.8672H56.1334V53.2005H16.8V13.8672Z'
        stroke={variant === 'active' ? 'url(#paint1_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8667 61.0664V64.9997'
        stroke={variant === 'active' ? 'url(#paint2_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M56.1333 61.0664V64.9997'
        stroke={variant === 'active' ? 'url(#paint3_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8667 25.666H20.7334'
        stroke={variant === 'active' ? 'url(#paint4_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8667 41.4004H20.7334'
        stroke={variant === 'active' ? 'url(#paint5_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M29.3865 33.5331C29.3865 34.4629 29.5696 35.3835 29.9254 36.2425C30.2812 37.1015 30.8027 37.882 31.4602 38.5394C32.1176 39.1969 32.8981 39.7184 33.7571 40.0742C34.6161 40.43 35.5367 40.6131 36.4665 40.6131C37.3962 40.6131 38.3169 40.43 39.1759 40.0742C40.0349 39.7184 40.8154 39.1969 41.4728 38.5394C42.1302 37.882 42.6517 37.1015 43.0075 36.2425C43.3633 35.3835 43.5465 34.4629 43.5465 33.5331C43.5465 32.6034 43.3633 31.6827 43.0075 30.8237C42.6517 29.9647 42.1302 29.1842 41.4728 28.5268C40.8154 27.8694 40.0349 27.3479 39.1759 26.9921C38.3169 26.6363 37.3962 26.4531 36.4665 26.4531C35.5367 26.4531 34.6161 26.6363 33.7571 26.9921C32.8981 27.3479 32.1176 27.8694 31.4602 28.5268C30.8027 29.1842 30.2812 29.9647 29.9254 30.8237C29.5696 31.6827 29.3865 32.6034 29.3865 33.5331V33.5331Z'
        stroke={variant === 'active' ? 'url(#paint6_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.4666 26.4544V21.7344'
        stroke={variant === 'active' ? 'url(#paint7_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.4666 45.3333V40.6133'
        stroke={variant === 'active' ? 'url(#paint8_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43.5469 33.5332H48.2669'
        stroke={variant === 'active' ? 'url(#paint9_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.6667 33.5332H29.3867'
        stroke={variant === 'active' ? 'url(#paint10_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M29.2185 41.8775L32.0374 39.0586'
        stroke={variant === 'active' ? 'url(#paint11_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M29.2185 25.1895L32.0374 28.0083'
        stroke={variant === 'active' ? 'url(#paint12_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43.7144 41.8775L40.8955 39.0586'
        stroke={variant === 'active' ? 'url(#paint13_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M43.7144 25.1895L40.8955 28.0083'
        stroke={variant === 'active' ? 'url(#paint14_linear)' : '#B9BFCB'}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear'
          x1='34.5'
          y1='6'
          x2='34.5'
          y2='61.0667'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint1_linear'
          x1='36.4667'
          y1='13.8672'
          x2='36.4667'
          y2='53.2005'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint2_linear'
          x1='13.3667'
          y1='61.0664'
          x2='13.3667'
          y2='64.9997'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint3_linear'
          x1='56.6333'
          y1='61.0664'
          x2='56.6333'
          y2='64.9997'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint4_linear'
          x1='16.8'
          y1='25.666'
          x2='16.8'
          y2='26.666'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint5_linear'
          x1='16.8'
          y1='41.4004'
          x2='16.8'
          y2='42.4004'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint6_linear'
          x1='36.4665'
          y1='26.4531'
          x2='36.4665'
          y2='40.6131'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint7_linear'
          x1='36.9666'
          y1='21.7344'
          x2='36.9666'
          y2='26.4544'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint8_linear'
          x1='36.9666'
          y1='40.6133'
          x2='36.9666'
          y2='45.3333'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint9_linear'
          x1='45.9069'
          y1='33.5332'
          x2='45.9069'
          y2='34.5332'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint10_linear'
          x1='27.0267'
          y1='33.5332'
          x2='27.0267'
          y2='34.5332'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint11_linear'
          x1='30.628'
          y1='39.0586'
          x2='30.628'
          y2='41.8775'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint12_linear'
          x1='30.628'
          y1='25.1895'
          x2='30.628'
          y2='28.0083'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint13_linear'
          x1='42.305'
          y1='39.0586'
          x2='42.305'
          y2='41.8775'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
        <linearGradient
          id='paint14_linear'
          x1='42.305'
          y1='25.1895'
          x2='42.305'
          y2='28.0083'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3F9AF7' />
          <stop offset='1' stopColor='#6C5DD3' />
        </linearGradient>
      </defs>
    </svg>
  )
}
