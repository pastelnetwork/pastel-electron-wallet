import React from 'react'
import Input, { TInput } from './Input'
import NumberFormat from 'react-number-format'
import { Override } from '../../utils/types'

type TInputNumberFormat = Override<
  TInput,
  { type: 'text' | 'password'; displayType: 'text' | 'input' }
>

const InputNumberFormat = ({
  displayType,
  ...props
}: TInputNumberFormat): JSX.Element => {
  return (
    <NumberFormat
      displayType={displayType}
      customInput={Input}
      thousandSeparator={true}
      {...props}
    />
  )
}

export default InputNumberFormat
