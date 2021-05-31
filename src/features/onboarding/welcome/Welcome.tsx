import * as React from 'react'
import { Link } from 'react-router-dom'

import Typography from '../../../common/components/Typography/Typography'
import playIco from '../../../common/assets/icons/ico-arrow.svg'
import image from '../../../common/assets/images/video-placeholder.jpeg'
import Button from '../../../common/components/Button/Button'
import { colors } from '../../../common/theme/colors'
import * as ROUTES from '../../../common/utils/constants/routes'
import * as Styles from './Welcome.styles'

const OnboardingWelcome: React.FC = () => {
  return (
    <>
      <Typography variant='h1' weight={800}>
        Welcome to Pastel NFT
      </Typography>
      <Typography variant='h2' weight={500} color={colors.text.secondary}>
        Let’s start!
      </Typography>
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
  )
}

export default OnboardingWelcome
