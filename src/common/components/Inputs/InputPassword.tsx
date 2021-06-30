import React from 'react'
import Input, { TInput } from './Input'
import EyeIcon from '../../assets/icons/ico-eye.svg'
import EyeIconHidden from '../../assets/icons/ico-eye-hidden.svg'
import Icon from '../Icon'

const InputPassword: React.FC<TInput> = props => {
  const [type, setType] = React.useState<string>('password')

  const toggleType = (): void =>
    setType(type => (type === 'password' ? 'text' : 'password'))

  return (
    <Input
      {...props}
      type={type}
      append={
        type !== 'text' ? (
          <Icon
            src={EyeIcon}
            variant='center'
            className='cursor-pointer'
            onClick={toggleType}
          />
        ) : (
          <Icon
            src={EyeIconHidden}
            variant='center'
            className='cursor-pointer'
            onClick={toggleType}
          />
        )
      }
    />
  )
}

export default InputPassword
