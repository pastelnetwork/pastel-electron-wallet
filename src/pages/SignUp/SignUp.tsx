import * as React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import OnboardingSteps from '../../components/OnboardingSteps/OnboardingSteps'
import * as Styles from './SignUp.styles'
import StepLogin from './StepLogin/StepLogin'

const SignUp = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    setTimeout(() => setProgress(25), 300)

    return () => clearTimeout()
  }, [])

  return (
    <>
      <Styles.Header>
        <div>
          <Styles.Title>Onboarding</Styles.Title>
          <Styles.Subtitle>Step 1 of 4</Styles.Subtitle>
        </div>
        <Styles.ProgressBar>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </Styles.ProgressBar>
      </Styles.Header>
      <Styles.Container>
        <Styles.StepsContainer>
          <OnboardingSteps />
        </Styles.StepsContainer>
        <Styles.FormContainer>
          <StepLogin />
        </Styles.FormContainer>
      </Styles.Container>
    </>
  )
}

export default SignUp
