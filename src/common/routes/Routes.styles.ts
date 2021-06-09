import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.pinkLight};
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.background.blueLight} 0%,
    ${({ theme }) => theme.colors.background.pinkLight} 100%
  );
`
