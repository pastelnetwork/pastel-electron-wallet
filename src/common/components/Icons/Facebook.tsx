import React from 'react'

export type TFacebookProps = {
  size?: number
  className?: string
}

export const FacebookIcon = ({
  size = 20,
  className = 'text-gray-88',
}: TFacebookProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.4998 7.90078V7.29141C7.4998 6.38244 7.67689 5.53671 8.19313 4.89807C8.71257 4.25548 9.5493 3.90078 10.6318 3.90078C11.2182 3.90078 11.8024 4.00852 12.2383 4.11538C12.4566 4.16891 12.6386 4.22245 12.7663 4.26268C12.8301 4.2828 12.8804 4.29961 12.9149 4.31144L12.9545 4.32525L12.9649 4.32897L12.9676 4.32997L12.9678 4.33003C13.0649 4.36468 13.1489 4.42851 13.2084 4.51277C13.2678 4.59703 13.2997 4.69761 13.2998 4.80073V4.80078V6.40079C13.2998 6.53339 13.2471 6.66056 13.1533 6.75432C13.0596 6.84809 12.9324 6.90077 12.7998 6.90078H11.4842C11.3112 6.90078 11.1775 6.91469 11.082 6.93231C10.9822 6.95072 10.9337 6.97143 10.923 6.9784L10.9058 6.98953C10.9048 6.99472 10.9035 7.00369 10.9024 7.01835C10.9006 7.0422 10.8998 7.07542 10.8998 7.12344V7.90078H12.7998H12.7998C12.8738 7.90081 12.9468 7.91723 13.0136 7.94886C13.0804 7.98049 13.1394 8.02654 13.1863 8.08369C13.2331 8.14085 13.2668 8.20769 13.2847 8.27941C13.3027 8.35112 13.3045 8.42592 13.2901 8.49843L13.2901 8.49852L12.8901 10.4984L7.4998 7.90078ZM7.4998 7.90078H6.7998H6.79979C6.66719 7.90079 6.54003 7.95348 6.44626 8.04724C6.3525 8.141 6.29982 8.26817 6.2998 8.40077V8.40078V10.4008C6.29982 10.5334 6.3525 10.6606 6.44626 10.7543C6.54003 10.8481 6.66719 10.9008 6.79979 10.9008H7.4998V15.6008C7.49982 15.7334 7.5525 15.8606 7.64626 15.9543C7.74003 16.0481 7.86719 16.1008 7.99979 16.1008H10.3998C10.5324 16.1008 10.6596 16.0481 10.7533 15.9543C10.8471 15.8606 10.8998 15.7334 10.8998 15.6008V10.9008H12.3998H12.3998C12.5155 10.9007 12.6275 10.8606 12.7169 10.7873C12.8063 10.7139 12.8674 10.6119 12.89 10.4985L7.4998 7.90078ZM9.8998 10.4008V15.1008H8.4998V10.4008C8.49979 10.2682 8.44711 10.141 8.35335 10.0472C8.25958 9.95348 8.13242 9.90079 7.99981 9.90078H7.2998V8.90078H7.9998C8.13242 8.90077 8.25958 8.84809 8.35335 8.75432C8.44711 8.66056 8.49979 8.53339 8.4998 8.40079V8.40078V7.29141C8.4998 6.51008 8.6602 5.91085 8.97054 5.52693C9.27743 5.14728 9.75562 4.90078 10.6318 4.90078C11.321 4.90078 11.966 5.07395 12.2998 5.17537V5.90078H11.4842C11.0631 5.90078 10.6972 5.93369 10.3789 6.14035C10.0502 6.3538 9.8998 6.75447 9.8998 7.12344V8.40078C9.89982 8.53339 9.9525 8.66056 10.0463 8.75432C10.14 8.84809 10.2672 8.90077 10.3998 8.90078H12.1896L11.9897 9.90078H10.3998C10.2672 9.90079 10.14 9.95348 10.0463 10.0472C9.9525 10.141 9.89982 10.2682 9.8998 10.4008ZM9.9998 0.700781C4.86829 0.700781 0.699805 4.86927 0.699805 10.0008C0.699805 15.1323 4.86829 19.3008 9.9998 19.3008C15.1313 19.3008 19.2998 15.1323 19.2998 10.0008C19.2998 4.86927 15.1313 0.700781 9.9998 0.700781ZM9.9998 1.70078C14.5885 1.70078 18.2998 5.41208 18.2998 10.0008C18.2998 14.5895 14.5885 18.3008 9.9998 18.3008C5.4111 18.3008 1.6998 14.5895 1.6998 10.0008C1.6998 5.41208 5.4111 1.70078 9.9998 1.70078Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='0.2'
      />
    </svg>
  )
}
