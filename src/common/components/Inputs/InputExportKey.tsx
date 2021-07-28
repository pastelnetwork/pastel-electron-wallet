import React from 'react'
import SVG from 'react-inlinesvg'
import Input, { TInput } from './Input'
import EyeIcon from '../../assets/icons/ico-eye.svg'
import EyeIconHidden from '../../assets/icons/ico-eye-hidden.svg'
import PasteIcon from '../../assets/icons/ico-paste.svg'

export type TInputExportProps = TInput & {
  clickPasteHandler?: () => void
}

const InputExportKey = (props: TInputExportProps): JSX.Element => {
  const [type, setType] = React.useState<string>('password')

  const toggleType = (): void =>
    setType(type => (type === 'password' ? 'text' : 'password'))

  return (
    <Input
      {...props}
      type={type}
      append={
        <div className='flex items-center'>
          {type === 'password' ? (
            <SVG
              src={EyeIcon}
              className='cursor-pointer mr-15px flex justify-center items-center'
              onClick={toggleType}
            />
          ) : (
            <SVG
              src={EyeIconHidden}
              className='cursor-pointer flex justify-center items-center'
              onClick={toggleType}
            />
          )}
          <div>
            <SVG
              src={PasteIcon}
              className='cursor-pointer flex justify-center items-center'
              onClick={toggleType}
            />
          </div>
        </div>
      }
    />
  )
}

export default InputExportKey
