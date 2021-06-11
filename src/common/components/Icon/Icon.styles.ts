import styled, { css } from 'styled-components'

export const IconContainer = styled.div<{ $variant: string }>`
  position: relative;
  width: ${({ $variant }) => ($variant == 'background' ? '40px' : '24px')};
  height: ${({ $variant }) => ($variant == 'background' ? '40px' : '24px')};
  margin-top: 1px;
  ${({ $variant }) =>
    $variant == 'center' &&
    css`
      margin-top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  ${({ $variant }) =>
    $variant == 'background' &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f8f8fa;
      border-radius: 50%;
      margin-bottom: 5px;
    `}
`
export const Image = styled.img``

export const NotificationBadge = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #fe634c;
  position: absolute;
  top: -5px;
  right: 3px;
  border: 2px solid white;
`
