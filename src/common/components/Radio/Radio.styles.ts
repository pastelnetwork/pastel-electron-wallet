import styled from 'styled-components'

export const Container = styled.label`
  font-size: ${({ theme }) => theme.typography.body3.size}px;
  color: ${({ theme }) => theme.colors.text.gray500};
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 22px;
  cursor: pointer;
  user-select: none;
`
export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ .radioCheckmark {
    background-color: ${({ theme }) => theme.colors.button.secondary};
  }

  &:checked ~ .radioCheckmark:after {
    display: block;
  }
`
export const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.button.secondary};

  &:after {
    content: '';
    position: absolute;
    display: none;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.button.default};
    border-radius: 50%;
  }
`
