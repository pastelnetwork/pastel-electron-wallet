import React, { useState, useEffect, useCallback } from 'react'
import SVG from 'react-inlinesvg'
import Input, { TInput } from './Input'
import EyeIcon from '../../assets/icons/ico-eye.svg'
import EyeIconHidden from '../../assets/icons/ico-eye-hidden.svg'

function InputPassword(props: TInput): JSX.Element {
  const { showPassword } = props
  const [type, setType] = useState<string>('password')

  const toggleType = useCallback(
    (): void => setType(type => (type === 'password' ? 'text' : 'password')),
    [type],
  )

  useEffect(() => {
    if (showPassword) {
      setType('text')
    }
  }, [showPassword])

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
