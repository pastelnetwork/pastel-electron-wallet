import React, { useState } from 'react'
import { clipboard } from 'electron'

import Input, { TInput } from './Input'
import Tooltip from 'common/components/Tooltip'
import { Clipboard, CheckIcon } from 'common/components/Icons'

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
            <span
              className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-2 transition duration-300'
              onClick={onCopy}
            >
              {copied ? (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content='Copied'
                  width={70}
                  type='top'
                >
                  <CheckIcon className='text-green-45' size={14} />
                </Tooltip>
              ) : (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content='Copy address to clipboard'
                  width={120}
                  type='top'
                >
                  <Clipboard
                    className='cursor-pointer text-gray-88'
                    size={14}
                  />
                </Tooltip>
              )}
            </span>
          ) : null}
        </div>
      }
    />
  )
}

export default InputExportKey
