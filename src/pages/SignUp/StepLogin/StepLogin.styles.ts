import styled from 'styled-components'

import Input from '../../../components/Input/Input'

// TODO fix this any here
export const LoginInput: any = styled(Input)`
  margin-bottom: 24px;
`

// TODO fix this any here
export const PasswordInput: any = styled(Input)`
  margin-bottom: 16px;
`

export const PasswordHint = styled.span`
  font-size: ${({ theme }) => theme.fonts.xSmall};
  line-height: 16px;
  color: ${({ theme }) => theme.colors.textGray};
`
