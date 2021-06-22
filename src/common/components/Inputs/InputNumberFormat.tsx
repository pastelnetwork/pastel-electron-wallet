import React from 'react'
import Input, { TInput } from './Input'
import NumberFormat from 'react-number-format'
import { Override } from '../../utils/types'

type TInputNumberFormat = Override<TInput, { displayType?: 'text' | 'input' }>

const InputNumberFormat = ({
  displayType = 'input',
  ...props
}: TInputNumberFormat): JSX.Element => {
  return (
    <NumberFormat
      displayType={displayType}
      customInput={Input}
      thousandSeparator={true}
      className='w-full'
      {...props}
    />
  )
}

export default InputNumberFormat
