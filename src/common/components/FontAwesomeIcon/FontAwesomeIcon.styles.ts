import styled from 'styled-components'

type TFontAwesomeIconStyleProps = {
  color?: string
  size?: number
}

export const Icon = styled.i<TFontAwesomeIconStyleProps>`
  display: flex;
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  cursor: pointer;
`
