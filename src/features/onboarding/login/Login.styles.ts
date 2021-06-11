import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 397px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

export const FooterText = styled.p`
  font-family: Avenir;
  color: ${({ theme }) => theme.colors.text.gray500};
  font-size: ${({ theme }) => theme.typography.body2.size}px;
  margin-bottom: 20px;
`

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.button.hover};
  text-decoration: none;
  cursor: pointer;
`
