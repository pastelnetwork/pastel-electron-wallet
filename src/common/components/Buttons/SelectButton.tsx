import React, { ReactNode } from 'react'
import cn from 'classnames'

export type TSelectButton = {
  onClick?: () => void
  isActive?: boolean
  children?: ReactNode | string
}

const SelectButtons = ({
  children,
  isActive,
  onClick,
}: TSelectButton): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-h5 font-normal text-gray-71 w-full px-4 py-2 text-left focus:outline-none hover:bg-gray-f7 transition duration-300',
        isActive && 'bg-gray-f7',
      )}
    >
      {children}
    </button>
  )
}

export default SelectButtons
