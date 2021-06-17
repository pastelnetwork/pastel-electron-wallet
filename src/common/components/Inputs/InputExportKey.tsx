import React from 'react'
import Input, { TInput } from './Input'
import EyeIcon from '../../assets/icons/ico-eye.svg'
import EyeIconHidden from '../../assets/icons/ico-eye-hidden.svg'
import PasteIcon from '../../assets/icons/ico-paste.svg'
import Icon from '../Icon'

export type TInputExportProps = TInput & {
  clickPasteHandler?: () => void
}

const InputExportKey: React.FC<TInputExportProps> = props => {
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
            <Icon
              src={EyeIcon}
              variant='center'
              className='cursor-pointer mr-15px'
              onClick={toggleType}
            />
          ) : (
            <Icon
              src={EyeIconHidden}
              variant='center'
              className='cursor-pointer'
              onClick={toggleType}
            />
          )}
          <div
            onClick={() => {
              !!props.clickPasteHandler && props.clickPasteHandler()
            }}
          >
            <Icon
              src={PasteIcon}
              variant='center'
              className='cursor-pointer'
              onClick={toggleType}
            />
          </div>
        </div>
      }
    />
  )
}

export default InputExportKey
