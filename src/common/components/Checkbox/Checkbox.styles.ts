import styled from 'styled-components'

export const Container = styled.label`
  font-family: Avenir;
  font-size: ${({ theme }) => theme.typography.body3.size}px;
  color: ${({ theme }) => theme.colors.text.gray500};
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
`
export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ .checkboxCheckmark {
    background-color: ${({ theme }) => theme.colors.button.secondary};
  }

  &:checked ~ .checkboxCheckmark:after {
    display: block;
  }
`
export const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 40%;
  background-color: ${({ theme }) => theme.colors.button.secondary};

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 8px;
    top: 5px;
    width: 3px;
    height: 7px;
    border: solid ${({ theme }) => theme.colors.button.default};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`
