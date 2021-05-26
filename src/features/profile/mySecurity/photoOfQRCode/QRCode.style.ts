import styled from 'styled-components'

export const DescriptionContainer = styled.div`
  margin-top: 12px;
  max-width: 330px;
`

export const QRContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 76px;
`

export const QrBackground = styled.div`
  display: flex;
  justify-content: center;
  height: 348px;
  background-color: ${({ theme }) => theme.colors.tab.hover};
  border-radius: 8px;
  padding: 35px 0;
`

export const QrContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.onboarding};
  border-radius: 12px;
  padding: 80px;
`
