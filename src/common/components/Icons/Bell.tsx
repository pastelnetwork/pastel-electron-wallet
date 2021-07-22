import React from 'react'
import cn from 'classnames'

export type TBellIconProps = {
  size?: number
  className?: string
  hasNotification?: boolean
}

export const BellIcon = ({
  size = 16,
  className = 'text-gray-33',
  hasNotification = false,
}: TBellIconProps): JSX.Element => {
  return (
    <div className={cn(className, 'relative')} style={{ width: size }}>
      {hasNotification && (
        <div className='absolute -top-px -right-px w-2 h-2 rounded-full bg-orange-63 border border-white' />
      )}
      <svg
        width={size}
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.70274 0.745082C4.38068 0.89789 1.83519 3.68526 1.83519 6.91105V9.82785L0.745961 11.9678C0.744045 11.9717 0.742172 11.9756 0.740343 11.9796C0.302144 12.8896 1.01149 13.9824 2.04148 13.9824H5.53391C5.53391 15.3052 6.64523 16.3905 7.99972 16.3905C9.35422 16.3905 10.4655 15.3052 10.4655 13.9824H13.9572C14.9872 13.9824 15.6974 12.8899 15.2591 11.9796C15.2573 11.9756 15.2554 11.9717 15.2535 11.9678L14.1643 9.82785V6.75819C14.1643 3.34428 11.2313 0.582853 7.70274 0.745082ZM7.76053 1.94755C10.6045 1.81679 12.9314 4.01388 12.9314 6.75819V9.96895C12.9313 10.062 12.9532 10.1537 12.9956 10.237L14.1434 12.493C14.2172 12.6475 14.1318 12.7784 13.9572 12.7784H2.04148C1.86685 12.7784 1.78214 12.6477 1.85606 12.493V12.4922L3.00388 10.237C3.0462 10.1537 3.06818 10.062 3.0681 9.96895V6.91105C3.0681 4.3021 5.11449 2.06926 7.76053 1.94755ZM6.76682 13.9824H9.23263C9.23263 14.6543 8.68774 15.1864 7.99972 15.1864C7.31171 15.1864 6.76682 14.6543 6.76682 13.9824Z'
          fill='currentColor'
        />
      </svg>
    </div>
  )
}
