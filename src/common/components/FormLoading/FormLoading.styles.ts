import styled from 'styled-components'

export const Container = styled.div<{ background: string }>`
  width: 92px;
  height: 6px;
  border-radius: 4px;
  margin-right: 6px;
  background-color: ${({ background }) => background};
`
