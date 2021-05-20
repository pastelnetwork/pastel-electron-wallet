import styled from 'styled-components'

export const Button = styled.button<{ $variant: 'default' | 'transparent' }>`
  min-width: 385px;
  color: ${({ $variant, theme }) =>
    $variant === 'transparent' ? theme.colors.blue : theme.colors.whiteOff};
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.default};
  line-height: 1;
  font-weight: 500;
  padding: 12px;
  background-color: ${({ $variant, theme }) =>
    $variant === 'transparent' ? theme.colors.whiteOff : theme.colors.blue};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
    border-color: ${({ theme }) => theme.colors.blueHover};
    color: ${({ $variant, theme }) =>
      $variant === 'transparent' && theme.colors.whiteOff};
  }
  &:focus {
    outline: 0;
  }
`
