import styled from 'styled-components'

export const Container = styled.div``

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

export const Input = styled.input<{ borderColor: string }>`
  font-family: Avenir;
  background-color: ${({ theme }) => theme.colors.custom.white};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  padding: 9px 40px 9px 20px;
  font-size: ${({ theme }) => theme.typography.body2.size}px;
  line-height: 22px;
  box-sizing: border-box;
  width: 100%;
  color: ${({ theme }) => theme.colors.text.gray600};
  transition: border-color 0.3s ease-out;
  margin-bottom: 8px;
  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.colors.text.link};
  }
  ::placeholder {
    color: #a0aec0;
  }
`

export const IconContainer = styled.div`
  position: relative;
`

export const Icon = styled.img`
  position: absolute;
  cursor: pointer;
  left: -35px;
  top: 45%;
  transform: translateY(-50%);
`

export const Label = styled.div`
  margin: 0 0 10px;
`
export const Error = styled.div`
  font-family: Avenir;
  color: ${({ theme }) => theme.colors.loader.red};
  margin: 0 0 8px;
  height: 19px;
`
