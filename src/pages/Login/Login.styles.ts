import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ButtonComponent from '../../components/Button/Button';

export const Container = styled.div`
  width: 397px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fonts.h1};
  line-height: 40px;
  margin: 0 0 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Button = styled(ButtonComponent)`
  margin: 0 0 16px;
  width: 100%;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fonts.small};
  margin-bottom: 20px;
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  cursor: pointer;
`;
