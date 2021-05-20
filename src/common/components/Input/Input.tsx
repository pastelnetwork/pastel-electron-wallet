import React, { CSSProperties } from 'react'

import eyeIcon from '../../assets/icons/ico-pass-eye.svg'
import { colors } from '../../theme/colors'
import * as Styles from './Input.styles'

export interface IInputProps {
  type: 'text' | 'password' | 'number'
  label?: string
  placeholder?: string
  name?: string
  ref?: React.RefObject<HTMLInputElement> | null
  hint?: string
  errorMessage?: string | null
  style?: CSSProperties
}

const Input: React.FC<IInputProps> = ({
  label,
  hint,
  errorMessage,
  style,
  type,
  ...restProps
}) => (
  <Styles.Container style={style}>
    {label && <Styles.Label>{label}</Styles.Label>}
    <Styles.InputContainer>
      <Styles.Input
        borderColor={errorMessage ? colors.error.default : colors.text.gray800}
        type={type}
        {...restProps}
      />
      {type === 'password' && <Styles.Icon src={eyeIcon} />}
    </Styles.InputContainer>
    <Styles.Error>{errorMessage}</Styles.Error>
    <Styles.Hint>{hint}</Styles.Hint>
  </Styles.Container>
)

export default Input
