import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px 60px;
  background-color: ${({ theme }) => theme.colors.background.onboarding};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  box-shadow: ${({ theme }) => theme.shadows.xLarge};
`

export const CloseButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 24px;
  right: 24px;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.custom.white};
`
