import React from 'react'
import { clipboard } from 'electron'

import { Description } from '../Typography/Typography'
import IconClipboard from '../../../assets/icons/ico-clipboard.svg'

interface ICryptoProps {
  label: string
  children: string
}

const Crypto: React.FC<ICryptoProps> = ({ label, children }) => {
  const copyClipboard = () => {
    clipboard.writeText(children)
  }

  return (
    <>
      <Description>{label}</Description>
      <div className='flex gap-4 mt-2.5'>
        <div className='flex-grow px-3.5 pt-1.5 rounded-4px shadow-input text-text-secondary h-10 overflow-ellipsis whitespace-nowrap overflow-hidden'>
          {children}
        </div>
        <img
          className='hover: cursor-pointer'
          onClick={copyClipboard}
          src={IconClipboard}
        />
      </div>
    </>
  )
}

export default Crypto
