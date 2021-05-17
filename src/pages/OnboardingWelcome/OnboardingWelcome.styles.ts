import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fonts.h1};
  line-height: 40px;
  margin: 0;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fonts.default};
  line-height: 24px;
  text-align: center;
  max-width: 350px;
  margin: 16px 0;
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 36px;
`;

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
`;

export const Image = styled.img`
  border-radius: 16px;
`;

export const Spacing = styled.div`
  margin-bottom: 16px;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fonts.default};
  line-height: 20px;
  text-align: center;
  margin: 0;
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  cursor: pointer;
`;
