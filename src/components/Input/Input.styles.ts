import styled from 'styled-components'

export const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #8e98a333;
  border-radius: 4px;
  padding: 9px 20px;
  font-size: ${({ theme }) => theme.fonts.default};
  line-height: 22px;
  box-sizing: border-box;
  width: 100%;
  color: ${({ theme }) => theme.colors.textGray};
  transition: border-color 0.3s ease-out;

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.colors.blueHover};
  }

  ::placeholder {
    color: #a0aec0;
  }
`

export const Label = styled.p`
  margin: 0 0 10px;
  font-size: ${({ theme }) => theme.fonts.big};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textGray};
`
