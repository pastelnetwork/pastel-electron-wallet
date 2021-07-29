import React from 'react'
import cn from 'classnames'
import { Expand } from 'common/components/Icons'

type TProps = {
  onClick(): void
  disabled?: boolean
}

export default function FullScreenButton({
  onClick,
  disabled = false,
}: TProps): JSX.Element {
  return (
    <button
      className={cn(
        'absolute top-3.5 left-3.5 w-8 h-8 transition duration-200 flex-center rounded-full z-10 shadow-expand',
        disabled && 'cursor-not-allowed bg-gray-fc text-gray-b9',
        !disabled &&
          'bg-white text-gray-88 hover:bg-gray-f8 hover:text-gray-88 active:bg-gray-fc active:text-gray-55',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Expand size={13} />
    </button>
  )
}
