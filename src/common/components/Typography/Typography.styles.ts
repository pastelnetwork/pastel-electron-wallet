import styled from 'styled-components'

interface TypographyProps {
  size: number
  lineHeight: number
  weight: number
  uppercase: boolean
}

export const Typography = styled.div<TypographyProps>`
  font-size: ${({ size }) => size}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
  font-weight: ${({ weight }) => weight};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'unset')};
`
