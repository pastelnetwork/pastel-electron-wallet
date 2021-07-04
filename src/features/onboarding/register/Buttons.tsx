import React from 'react'
import cn from 'classnames'
import icoArrowLeft from 'common/assets/icons/ico-arrow-left.svg'

export type TNextBtnProps = {
  disabled?: boolean
  onClick(): void
  text: string
  className?: string
}

export type TPrevBtnProps = {
  onClick(): void
}

export const NextButton = (props: TNextBtnProps): JSX.Element => {
  return (
    <button
      onClick={() => {
        props.onClick()
      }}
      className={cn(
        'flex items-center justify-center font-medium text-base rounded-2xl h-10 px-3 cursor-pointer',
        !props.disabled ? 'bg-blue-3f text-white' : 'bg-gray-f2 text-gray-8e',
        props.className ? props.className : '',
      )}
      disabled={props.disabled}
    >
      {props.text}
      <i className='text-sm inline-block ml-3 fas fa-chevron-right'></i>
    </button>
  )
}

export const PrevButton = (props: TPrevBtnProps): JSX.Element => {
  return (
    <button
      className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-e6 cursor-pointer'
      onClick={() => props.onClick()}
    >
      <img className='w-4 cursor-pointer' src={icoArrowLeft} />
    </button>
  )
}
