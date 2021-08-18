import React, { useState } from 'react'
import SVG from 'react-inlinesvg'
import { clipboard } from 'electron'

import Input, { TInput } from './Input'
import PasteIcon from '../../assets/icons/ico-paste.svg'
import CheckIcon from '../../assets/icons/ico-check-green.svg'

export type TInputExportProps = TInput & {
  clickPasteHandler?: () => void
}

const InputExportKey = (props: TInputExportProps): JSX.Element => {
  const [copied, setCopied] = useState(false)
  const [hideIcon, setHideIcon] = useState(false)

  const onCopy = () => {
    if (props.value) {
      clipboard.writeText(props.value)
      setCopied(true)

      setTimeout(() => {
        setHideIcon(true)
      }, 2000)
    }
  }

  return (
    <Input
      {...props}
      inputClassName='pr-50px'
      append={
        <div className='flex items-center'>
          {!hideIcon ? (
            <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-2 transition duration-300'>
              <SVG src={copied ? CheckIcon : PasteIcon} onClick={onCopy} />
            </span>
          ) : null}
        </div>
      }
    />
  )
}

export default InputExportKey
