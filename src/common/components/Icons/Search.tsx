import React from 'react'

export type TSearchProps = {
  size?: number
  className?: string
}

export const Search: React.FC<TSearchProps> = ({
  size = 17,
  className = 'text-gray-33',
}: TSearchProps): JSX.Element => {
  return (
    <svg
      width={size}
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M15.8072 14.8628L11.9579 11.0135C13.0541 9.6749 13.5938 7.96609 13.4651 6.24069C13.3365 4.5153 12.5495 2.90539 11.2669 1.74413C9.98429 0.582876 8.30434 -0.040834 6.57469 0.00207589C4.84504 0.0449858 3.19808 0.751231 1.97466 1.97466C0.751231 3.19808 0.0449858 4.84504 0.00207589 6.57469C-0.040834 8.30434 0.582876 9.98429 1.74413 11.2669C2.90539 12.5495 4.5153 13.3365 6.24069 13.4651C7.96609 13.5938 9.6749 13.0541 11.0135 11.9579L14.8628 15.8039C14.9246 15.8659 14.998 15.9152 15.0788 15.9488C15.1596 15.9825 15.2463 15.9998 15.3338 16C15.4214 16.0001 15.5081 15.9831 15.589 15.9497C15.67 15.9163 15.7435 15.8673 15.8056 15.8055C15.8676 15.7438 15.9168 15.6703 15.9504 15.5895C15.9841 15.5087 16.0015 15.422 16.0016 15.3345C16.0018 15.2469 15.9847 15.1602 15.9513 15.0793C15.9179 14.9984 15.869 14.9248 15.8072 14.8628ZM6.73982 12.1407C5.67063 12.1403 4.62556 11.8229 3.73677 11.2286C2.84798 10.6343 2.15538 9.78974 1.74654 8.80181C1.3377 7.81388 1.231 6.72689 1.43991 5.67832C1.64883 4.62974 2.16399 3.66666 2.92024 2.91085C3.6765 2.15505 4.63989 1.64047 5.68859 1.43218C6.73729 1.22389 7.82421 1.33124 8.8119 1.74067C9.79959 2.1501 10.6437 2.8432 11.2375 3.73235C11.8313 4.6215 12.1481 5.66675 12.1478 6.73594C12.1461 8.1694 11.5757 9.54362 10.5618 10.5569C9.54784 11.5702 8.17328 12.1398 6.73982 12.1407Z'
        fill='currentColor'
      />
    </svg>
  )
}
