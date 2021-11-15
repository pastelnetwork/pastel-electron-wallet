import React from 'react'
import cn from 'classnames'
import { LongArrow } from 'common/components/Icons'

export type TNextBtnProps = {
  disabled?: boolean
  onClick(): void
  text: string
  className?: string
  showIcon?: boolean
}

export type TPrevBtnProps = {
  onClick(): void
  disabled?: boolean
}

export function NextButton({
  disabled,
  onClick,
  text,
  className,
  showIcon = true,
}: TNextBtnProps): JSX.Element {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className={cn(
        'flex items-center justify-center font-medium text-base rounded-2xl h-10 px-3 cursor-pointer',
        !disabled
          ? 'bg-blue-3f text-white hover:bg-button-hover active:bg-button-pressed'
          : 'bg-blue-9b text-white',
        className ? className : '',
      )}
      disabled={disabled}
      type='button'
    >
      {text}
      {showIcon && (
        <i className='text-sm inline-block ml-3 fas fa-chevron-right' />
      )}
    </button>
  )
}

export function PrevButton({ disabled, onClick }: TPrevBtnProps): JSX.Element {
  return (
    <button
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-full border border-gray-88 cursor-pointer hover:border-gray-8e hover:bg-gray-f6 active:bg-gray-f6 active:border-gray-55 active:text-border-gray-55',
        !disabled && 'opacity-50',
      )}
      onClick={() => onClick()}
      disabled={disabled}
      type='button'
    >
      <LongArrow size={18} to='left' className='transform text-gray-88' />
    </button>
  )
}
