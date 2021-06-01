import styled from 'styled-components'

interface TooltipProps {
  $variant: 'top' | 'left' | 'right' | 'bottom'
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.custom.white};
  border-radius: 8px;

  &:hover * {
    visibility: visible;
    opacity: 1;
  }
`
export const Content = styled.span<TooltipProps>`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  &:after {
    content: ' ';
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`
