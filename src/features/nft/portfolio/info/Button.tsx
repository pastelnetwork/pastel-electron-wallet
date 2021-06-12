import React from 'react'
import cn from 'classnames'

type TButtonProps = {
  className?: string
  children: React.ReactNode
  onClick?(): void
}

export default function Button({
  children,
  className,
  onClick,
}: TButtonProps): JSX.Element {
  return (
    <button
      type='button'
      className={cn(
        'flex-center border-2 p-2 lg:p-3 text-sm rounded h-38px whitespace-nowrap bg-gray-f8',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
