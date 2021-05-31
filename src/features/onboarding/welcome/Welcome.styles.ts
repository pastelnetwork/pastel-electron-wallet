import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ImageWrapper = styled.div`
  position: relative;
  margin: 36px 0;
`

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 57px;
  height: 57px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    content: '';
    width: 114px;
    height: 114px;
    background-color: rgba(255, 255, 255, 0.2);
    transition: background-color 0.3s ease-out;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.85);
    &:before {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`

export const Image = styled.img`
  border-radius: 16px;
`

export const Spacing = styled.div`
  margin-bottom: 16px;
`

export const FooterText = styled.p`
  font-family: Avenir;
  color: ${({ theme }) => theme.colors.text.gray500};
  font-size: ${({ theme }) => theme.typography.body2.size}px;
  line-height: 20px;
  text-align: center;
  margin: 0;
`

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.button.hover};
  text-decoration: none;
  cursor: pointer;
`
