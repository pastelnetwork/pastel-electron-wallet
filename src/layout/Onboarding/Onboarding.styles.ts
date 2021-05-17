import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px 40px;
  background-color: ${({ theme }) => theme.colors.whiteOff};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  box-shadow: 0px 64px 64px -48px rgba(31, 47, 70, 0.12);
`;

export const CloseButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 24px;
  right: 24px;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  background-color: ${({ theme }) => theme.colors.white};
`;
