import styled from 'styled-components'

export const Container = styled.div``

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

export const Input = styled.input<{ borderColor: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  padding: 9px 40px 9px 20px;
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

export const Icon = styled.img`
  position: absolute;
  top: 12px;
  right: 10px;
  cursor: pointer;
`

export const Label = styled.p`
  margin: 0 0 10px;
  font-size: ${({ theme }) => theme.fonts.default};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textGray};
`
export const Error = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 8px;
  height: 19px;
`

export const Hint = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGray};
`
