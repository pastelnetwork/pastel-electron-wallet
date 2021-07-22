import './Progressbar.css'

export type TProgressbarProps = {
  className?: string
  percent: number
  width: number
}

const Progressbar = ({
  className,
  percent = 70,
  width = 336,
}: TProgressbarProps): JSX.Element => {
  const badgeWidth = 31
  const height = 20
  const diffPercentPosition = percent < 10 ? 8 : 5
  const size = Math.floor((width * percent) / 100)
  const percentPosition =
    size > badgeWidth
      ? size - badgeWidth + diffPercentPosition
      : diffPercentPosition
  return (
    <div className='relative' style={{ width }}>
      <svg
        width={width}
        height={height}
        viewBox='0 0 336 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <rect width={width} height={height} rx='10' fill='#F6F7F9' />
        <rect
          width={size < badgeWidth ? badgeWidth : size}
          height={height}
          rx='10'
          fill='url(#paint0_linear)'
        />
        <mask
          id='mask0'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='233'
          height='20'
        >
          <rect
            width={size}
            height={height}
            rx='10'
            fill='url(#paint1_linear)'
          />
        </mask>
        <g mask='url(#mask0)'>
          <path
            d='M86.096 1H69.0349V19C80.1859 19 76.3468 6.5 86.096 1Z'
            fill='url(#paint2_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M51.9724 19H69.0334V1C57.8825 1 61.7215 13.5 51.9724 19Z'
            fill='url(#paint3_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M182.055 1H164.994V19C176.145 19 172.306 6.5 182.055 1Z'
            fill='url(#paint4_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M147.931 19H164.992V1C153.841 1 157.681 13.5 147.931 19Z'
            fill='url(#paint5_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M54.1097 1H37.0486V19C48.1996 19 44.3605 6.5 54.1097 1Z'
            fill='url(#paint6_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M19.986 19H37.0471V1C25.8961 1 29.7352 13.5 19.986 19Z'
            fill='url(#paint7_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M22.1234 1H5.06229V19C16.2132 19 12.3742 6.5 22.1234 1Z'
            fill='url(#paint8_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M-12.0003 19H5.06076V1C-6.0902 1 -2.25113 13.5 -12.0003 19Z'
            fill='url(#paint9_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M150.069 1H133.008V19C144.159 19 140.319 6.5 150.069 1Z'
            fill='url(#paint10_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M115.945 19H133.006V1C121.855 1 125.694 13.5 115.945 19Z'
            fill='url(#paint11_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M246.028 1H228.967V19C240.118 19 236.278 6.5 246.028 1Z'
            fill='url(#paint12_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M211.904 19H228.965V1C217.814 1 221.653 13.5 211.904 19Z'
            fill='url(#paint13_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M118.082 1H101.021V19C112.172 19 108.333 6.5 118.082 1Z'
            fill='url(#paint14_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M83.9587 19H101.02V1C89.8688 1 93.7079 13.5 83.9587 19Z'
            fill='url(#paint15_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M214.041 1H196.98V19C208.131 19 204.292 6.5 214.041 1Z'
            fill='url(#paint16_linear)'
            fillOpacity='0.14'
          />
          <path
            d='M179.918 19H196.979V1C185.828 1 189.667 13.5 179.918 19Z'
            fill='url(#paint17_linear)'
            fillOpacity='0.14'
          />
        </g>
        <rect
          x={size > badgeWidth ? size - badgeWidth - 1 : 0}
          y='1'
          width={badgeWidth}
          height='18'
          rx='9'
          fill='#0E976B'
        />
        <defs>
          <linearGradient
            id='paint0_linear'
            x1='11.9209'
            y1='1.53465e-06'
            x2='26.5039'
            y2='64.7064'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#6DBD72' />
            <stop offset='1' stopColor='#00B282' />
          </linearGradient>
          <linearGradient
            id='paint1_linear'
            x1='11.9209'
            y1='1.53465e-06'
            x2='26.5039'
            y2='64.7064'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#6DBD72' />
            <stop offset='1' stopColor='#00B282' />
          </linearGradient>
          <linearGradient
            id='paint2_linear'
            x1='76.8283'
            y1='1'
            x2='76.8283'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint3_linear'
            x1='61.2401'
            y1='19'
            x2='61.2401'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint4_linear'
            x1='172.787'
            y1='1'
            x2='172.787'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint5_linear'
            x1='157.199'
            y1='19'
            x2='157.199'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint6_linear'
            x1='44.8419'
            y1='1'
            x2='44.8419'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint7_linear'
            x1='29.2538'
            y1='19'
            x2='29.2538'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint8_linear'
            x1='12.8556'
            y1='1'
            x2='12.8556'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint9_linear'
            x1='-2.73257'
            y1='19'
            x2='-2.73257'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint10_linear'
            x1='140.801'
            y1='1'
            x2='140.801'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint11_linear'
            x1='125.213'
            y1='19'
            x2='125.213'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint12_linear'
            x1='236.76'
            y1='1'
            x2='236.76'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint13_linear'
            x1='221.172'
            y1='19'
            x2='221.172'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint14_linear'
            x1='108.815'
            y1='1'
            x2='108.815'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint15_linear'
            x1='93.2264'
            y1='19'
            x2='93.2264'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint16_linear'
            x1='204.774'
            y1='1'
            x2='204.774'
            y2='19'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            id='paint17_linear'
            x1='189.185'
            y1='19'
            x2='189.185'
            y2='1'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFFFF' stopOpacity='0' />
            <stop offset='0.473958' stopColor='#FFFFFF' />
            <stop offset='1' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
      <div
        className='text-white absolute top-3px text-10px'
        style={{ left: percentPosition }}
      >
        {percent}%
      </div>
    </div>
  )
}

export default Progressbar
