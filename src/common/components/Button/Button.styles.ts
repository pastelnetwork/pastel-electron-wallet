import styled from 'styled-components'

interface ButtonProps {
  $variant: 'default' | 'transparent' | 'navigation'
  width?: string
}

export const Button = styled.button<ButtonProps>`
  font-family: Avenir;
  min-width: ${({ width }) => width || '385px'};
  color: ${({ $variant, theme }) =>
    $variant === 'transparent'
      ? theme.colors.button.default
      : theme.colors.text.tertiary};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2.size}px;
  line-height: 1;
  font-weight: 500;
  padding: 12px;
  background-color: ${({ $variant, theme }) =>
    $variant === 'transparent'
      ? theme.colors.text.tertiary
      : theme.colors.button.default};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.button.default};
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:focus {
    outline: 0;
  }
`

export const NavigationButton = styled.button`
  font-family: Avenir;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.navigation.default};
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  & > img {
    cursor: pointer;
  }
`
