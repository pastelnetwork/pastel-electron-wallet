import styled from 'styled-components'

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
export const Content = styled.span`
  visibility: hidden;
  width: 240px;
  background-color: ${({ theme }) => theme.colors.custom.white};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 8px;
  padding: 20px 15px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -140px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  opacity: 0;
  transition: opacity 0.2s;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-radius: 3px;
    border-color: ${({ theme }) => theme.colors.custom.white} transparent
      transparent transparent;
  }
`
