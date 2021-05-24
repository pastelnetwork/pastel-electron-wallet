import styled, { css } from 'styled-components'

export const IconContainer = styled.div<{ $variant: string }>`
  position: relative;
  ${({ $variant }) =>
    $variant == 'background' &&
    css`
      background-color: #f8f8fa;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    `}
`
export const Image = styled.img``

export const NotificationBadge = styled.div`
  width: 7.67px;
  height: 7.67px;
  border-radius: 50%;
  background-color: #fe634c;
  position: absolute;
  top: -4px;
  right: 0px;
  border: 2px solid white;
`
