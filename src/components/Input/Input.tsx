import React from 'react'

import * as Styles from './Input.styles'

export interface IInputProps {
  type: 'text' | 'password' | 'number'
  label?: string
  placeholder?: string
}

const Input: React.FC<IInputProps> = ({ label, ...restProps }) => (
  <>
    {label && <Styles.Label>{label}</Styles.Label>}
    <Styles.Input {...restProps} />
  </>
)

export default Input
