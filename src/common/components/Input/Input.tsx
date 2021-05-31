import React, { CSSProperties } from 'react'

import Typography from '../../../common/components/Typography/Typography'
import eyePassIcon from '../../assets/icons/ico-pass-eye.svg'
import eyeIcon from '../../assets/icons/ico-eye.svg'
import { colors } from '../../theme/colors'
import * as Styles from './Input.styles'

export interface IInputProps {
  type: 'text' | 'password' | 'number'
  value: string
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(previousState => !previousState)
  }

  return (
    <Styles.Container style={style}>
      {label && (
        <Styles.Label>
          <Typography variant='body2' color={colors.text.gray600}>
            {label}
          </Typography>
        </Styles.Label>
      )}
      <Styles.InputContainer>
        <Styles.Input
          borderColor={errorMessage ? colors.loader.red : colors.border.default}
          type={
            (type === 'password' && isPasswordVisible) || type === 'text'
              ? 'text'
              : 'password'
          }
          {...restProps}
        />
        {type === 'password' && (
          <Styles.IconContainer onClick={handlePasswordVisibility}>
            <Styles.Icon src={isPasswordVisible ? eyePassIcon : eyeIcon} />
          </Styles.IconContainer>
        )}
      </Styles.InputContainer>
      <Styles.Error>{errorMessage}</Styles.Error>
      {hint && (
        <Typography variant='body3' color={colors.text.gray500}>
          {hint}
        </Typography>
      )}
    </Styles.Container>
  )
}

export default Input
