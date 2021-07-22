import React from 'react'
import { Expand } from 'common/components/Icons'
import style from './FullScreenButton.module.css'

type TProps = {
  onClick(): void
}

export default function FullScreenButton({ onClick }: TProps): JSX.Element {
  return (
    <button
      className={`absolute top-3.5 left-3.5 w-8 h-8 bg-gray-fc text-gray-77 flex-center rounded-full z-10 ${style.button}`}
      onClick={onClick}
    >
      <Expand size={13} />
    </button>
  )
}
