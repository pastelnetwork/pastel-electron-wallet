import React from 'react'

export type TEditImage = {
  size?: number
  className?: string
  pathColor?: string
}

export const EditImage = ({
  size = 30,
  className = 'text-gray-33',
}: TEditImage): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_b)'>
        <rect width='30' height='30' rx='15' fill='#213247' fillOpacity='0.3' />
      </g>
      <path
        d='M10.2752 9C9.5712 9 9 9.57397 9 10.2814V17.97C9 18.6774 9.5712 19.2514 10.2752 19.2514H14.4497L14.6523 18.3971H10.2752C10.0395 18.3971 9.85016 18.2069 9.85016 17.97V17.1791L12.8722 13.7553L15.9076 16.9722L16.5054 16.3649L16.0006 15.8276L17.0898 14.5929L17.6544 15.1869L18.2489 14.5795L17.0732 13.3281L15.4128 15.2069L12.8523 12.4939L9.85016 15.891V10.2814C9.85016 10.0445 10.0395 9.85428 10.2752 9.85428H19.6271C19.8628 9.85428 20.0521 10.0445 20.0521 10.2814V13.2914C20.1086 13.2848 20.1651 13.2714 20.2215 13.2714H20.2647C20.4905 13.2848 20.703 13.3315 20.9023 13.4049V10.2814C20.9023 9.57397 20.3311 9 19.6271 9H10.2752ZM17.5016 10.7086C17.0334 10.7086 16.6515 11.0923 16.6515 11.5628C16.6515 12.0334 17.0334 12.4171 17.5016 12.4171C17.9699 12.4171 18.3518 12.0334 18.3518 11.5628C18.3518 11.0923 17.9699 10.7086 17.5016 10.7086ZM20.2248 14.129C19.9492 14.1324 19.6736 14.2392 19.4677 14.4527L15.5024 18.5039L14.9113 21L17.3954 20.4093L17.4784 20.3226L21.4303 16.4216C21.8521 16.0078 21.8587 15.3103 21.437 14.8899L20.992 14.4394C20.7828 14.2291 20.5038 14.1257 20.2248 14.129ZM20.2315 14.9766C20.2879 14.9766 20.3444 15 20.3909 15.0467L20.8359 15.4939C20.9289 15.584 20.9289 15.7208 20.8359 15.8142L16.9703 19.6285L16.0537 19.8521L16.2729 18.931L20.0754 15.0467C20.1186 15 20.175 14.9766 20.2315 14.9766Z'
        fill='white'
      />
      <defs>
        <filter
          id='filter0_b'
          x='-55'
          y='-55'
          width='140'
          height='140'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImage' stdDeviation='27.5' />
          <feComposite
            in2='SourceAlpha'
            operator='in'
            result='effect1_backgroundBlur'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_backgroundBlur'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}
