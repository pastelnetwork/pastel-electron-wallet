import React from 'react'
import { clipboard } from 'electron'

import { Description } from './Typography'
import IconClipboard from '../../../common/assets/icons/ico-clipboard.svg'

type TCrypto = {
  label: string
  children: string
}

const Crypto = (props: TCrypto): JSX.Element => {
  const { label, children } = props
  const copyClipboard = () => {
    clipboard.writeText(children)
  }

  const ellipsIndex = children?.length - 6
  const firstPart =
    ellipsIndex > -1 ? children?.slice(0, ellipsIndex) : children
  const secondPart = ellipsIndex > -1 ? children?.slice(ellipsIndex) : ''

  return (
    <div>
      <Description>{label}</Description>
      <div className='flex gap-4 mt-2.5'>
        <div className='flex flex-grow px-3.5 pt-2 rounded shadow-2px text-gray-2d h-10 overflow-ellipsis whitespace-nowrap overflow-hidden'>
          <div className='overflow-ellipsis whitespace-nowrap overflow-hidden'>
            {firstPart}
          </div>
          <div>{secondPart}</div>
        </div>
        <img
          className='cursor-pointer'
          onClick={copyClipboard}
          src={IconClipboard}
        />
      </div>
    </div>
  )
}

export default Crypto
