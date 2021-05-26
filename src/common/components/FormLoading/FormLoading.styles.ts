import styled from 'styled-components'

export const Container = styled.div<{ background: string }>`
  max-width: 92px;
  height: 6px;
  border-radius: 4px;
  background-color: ${({ background }) => background};
`
