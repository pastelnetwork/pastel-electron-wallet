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
      className='absolute flex justify-center items-center top-6 right-6 w-7 h-7 box-border rounded-lg bg-whte border border-gray'
      to={props.gotoUrl}
    >
      <img src={closeIcon} className='cursor-pointer' />
    </Link>
  )
}
