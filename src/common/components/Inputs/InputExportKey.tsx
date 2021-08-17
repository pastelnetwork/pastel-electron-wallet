import React from 'react'
import SVG from 'react-inlinesvg'
import { clipboard } from 'electron'
import Input, { TInput } from './Input'
import PasteIcon from '../../assets/icons/ico-paste.svg'

export type TInputExportProps = TInput & {
  clickPasteHandler?: () => void
}

const InputExportKey = (props: TInputExportProps): JSX.Element => {
  const onCopy = () => {
    if (props.value) {
      clipboard.writeText(props.value)
    }
  }

  return (
    <Input
      {...props}
      inputClassName='pr-50px'
      append={
        <div className='flex items-center'>
          <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-2 transition duration-300'>
            <SVG src={PasteIcon} onClick={onCopy} />
          </span>
        </div>
      }
    />
  )
}

export default InputExportKey
