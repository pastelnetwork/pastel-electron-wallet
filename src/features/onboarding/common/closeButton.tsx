import * as React from 'react'
import { Link } from 'react-router-dom'
import closeIcon from 'common/assets/icons/ico-close.svg'

export type TCloseButtonProps = {
  gotoUrl: string
}

export default function InputNFTDataStep(
  props: TCloseButtonProps,
): JSX.Element {
  return (
    <Link
      className='absolute flex justify-center items-center top-6 right-6 w-7 h-7 box-border rounded-lg bg-white border border-gray-ec over:border-gray-8e hover:bg-gray-f6 active:bg-gray-f6 active:border-gray-55 active:text-border-gray-55'
      to={props.gotoUrl}
    >
      <img src={closeIcon} className='cursor-pointer' />
    </Link>
  )
}
