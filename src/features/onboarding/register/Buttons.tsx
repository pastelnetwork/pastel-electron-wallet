import React from 'react'
import cn from 'classnames'
import icoArrowLeft from '../../../common/assets/icons/ico-arrow-left.svg'
// import icoNext from '../../../common/assets/icons/ico-???.svg'

export type TNextBtnProps = {
  active: boolean
  onClick(): void
  text: string
}

export type TPrevBtnProps = {
  onClick(): void
}

export const NextButton = (props: TNextBtnProps): JSX.Element => {
  return (
    <button
      onClick={() => {
        if (props.active) {
          props.onClick()
        }
      }}
      className={cn(
        'flex items-center justify-center font-medium text-base rounded-2xl h-10 px-3 cursor-pointer',
        props.active ? 'bg-blue-3f text-white' : 'bg-gray-f2 text-gray-8e',
      )}
    >
      {props.text}
      <span className='inline-block ml-3 font-black'>&gt;</span>
      {/* <img className='w-4 inline-block ml-3' src={icoNext} /> */}
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
