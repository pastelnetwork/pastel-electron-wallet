import React, { useCallback } from 'react'
import { clipboard } from 'electron'

import { Description } from './Typography'
import IconClipboard from '../../../common/assets/icons/ico-clipboard.svg'

type TCrypto = {
  label: string
  children: string
}

function Crypto(props: TCrypto): JSX.Element {
  const { label, children } = props
  const copyClipboard = useCallback(() => {
    clipboard.writeText(children)
  }, [])

  const ellipsIndex = children?.length - 6
  const firstPart =
    ellipsIndex > -1 ? children?.slice(0, ellipsIndex) : children

  const secondPart = ellipsIndex > -1 ? children?.slice(ellipsIndex) : ''

  const renderContent = () => (
    <div className='flex flex-grow px-3.5 pt-2 rounded shadow-2px text-gray-2d h-10 overflow-ellipsis whitespace-nowrap overflow-hidden'>
      <div className='overflow-ellipsis whitespace-nowrap overflow-hidden'>
        {firstPart}
      </div>
      <div>{secondPart}</div>
    </div>
  )

  const renderCopyIcon = () => (
    <span
      role='button'
      className='cursor-pointer'
      onClick={copyClipboard}
      tabIndex={0}
      aria-hidden='true'
    >
      <img className='cursor-pointer' src={IconClipboard} alt='Copy' />
    </span>
  )

  return (
    <div>
      <Description>{label}</Description>
      <div className='flex gap-4 mt-2.5'>
        {renderContent()}
        {renderCopyIcon()}
      </div>
    </div>
  )
}

export default Crypto
