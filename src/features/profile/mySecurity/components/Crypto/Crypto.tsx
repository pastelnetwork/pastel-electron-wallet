import React from 'react'
import { clipboard } from 'electron'

import { Description } from '../Typography/Typography'
import IconClipboard from '../../../../../common/assets/icons/ico-clipboard.svg'

type TCryptoProps = {
  label: string
  children: string
}

const Crypto: React.FC<TCryptoProps> = ({ label, children }) => {
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
        <div className='flex flex-grow px-3.5 pt-2 rounded-4px shadow-input text-gray-2d h-10 overflow-ellipsis whitespace-nowrap overflow-hidden'>
          <div className='overflow-ellipsis whitespace-nowrap overflow-hidden'>
            {firstPart}
          </div>
          <div>{secondPart}</div>
        </div>
        <img
          className='hover:cursor-pointer'
          onClick={copyClipboard}
          src={IconClipboard}
        />
      </div>
    </div>
  )
}

export default Crypto
