import styled from 'styled-components'

export const MySecurityContainer = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px 60px;
  background-color: ${({ theme }) => theme.colors.background.main};
`

export const Card = styled.div`
  width: 427px;
  min-height: 672px;
  background-color: ${({ theme }) => theme.colors.custom.white};
  padding: 30px;
  box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14);
  border-radius: 8px;
`
