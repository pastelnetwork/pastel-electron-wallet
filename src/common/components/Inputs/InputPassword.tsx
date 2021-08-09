import React, { useState, useEffect } from 'react'
import SVG from 'react-inlinesvg'
import Input, { TInput } from './Input'
import EyeIcon from '../../assets/icons/ico-eye.svg'
import EyeIconHidden from '../../assets/icons/ico-eye-hidden.svg'

const InputPassword = (props: TInput): JSX.Element => {
  const [type, setType] = useState<string>('password')

  const toggleType = (): void =>
    setType(type => (type === 'password' ? 'text' : 'password'))

  useEffect(() => {
    if (props.showPassword) {
      setType('text')
    }
  }, [props.showPassword])

  const otherProps = { ...props }
  if ('showPassword' in otherProps) {
    delete otherProps.showPassword
  }

  return (
    <Input
      {...otherProps}
      type={type}
      append={
        type !== 'text' ? (
          <SVG
            src={EyeIcon}
            className='cursor-pointer flex justify-center items-center'
            onClick={toggleType}
          />
        ) : (
          <SVG
            src={EyeIconHidden}
            className='cursor-pointer flex justify-center items-center'
            onClick={toggleType}
          />
        )
      }
    />
  )
}

export default InputPassword
