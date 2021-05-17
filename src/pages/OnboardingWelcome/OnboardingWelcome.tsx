import * as React from 'react';
import { Link } from 'react-router-dom';

import playIco from '../../assets/icons/ico-arrow.svg';
import image from '../../assets/images/video-placeholder.jpeg';
import Button from '../../components/Button/Button';
import * as ROUTES from '../../utils/constants/routes';
import * as Styles from './OnboardingWelcome.styles';

const OnboardingWelcome: React.FC<unknown> = () => {
  return (
    <>
      <Styles.Title>Welcome to Pastel NFT</Styles.Title>
      <Styles.Subtitle>Let’s start!</Styles.Subtitle>
      <Styles.ImageWrapper>
        <Styles.PlayButton>
          <img src={playIco} alt='play button' />
        </Styles.PlayButton>
        <Styles.Image src={image} alt='astro boy' />
      </Styles.ImageWrapper>
      <Link to={ROUTES.SIGN_UP}>
        <Button>Register account</Button>
      </Link>
      <Styles.Spacing />
      <Button variant='transparent'>Take a tour first</Button>
      <Styles.Spacing />
      <Styles.FooterText>
        Already have account?
        <Styles.FooterLink to={ROUTES.LOGIN}> Login</Styles.FooterLink>
      </Styles.FooterText>
    </>
  );
};

export default OnboardingWelcome;
