import * as React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import { Button } from '../../components/Button/Button.styles'
import OnboardingSteps from '../../components/OnboardingSteps/OnboardingSteps'
import * as Styles from './SignUp.styles'
import StepLogin from './StepLogin/StepLogin'

const SignUp: React.FC<unknown> = () => {
  const [progress, setProgress] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4>(1)

  const handlePrevStepChange = () => {
    if (activeStep === 1) {
      return null
    }

    setActiveStep(prevStep => (prevStep - 1) as 1 | 2 | 3 | 4)
    return setProgress(prevProgress => prevProgress - 25)
  }

  const handleNextStepChange = () => {
    if (activeStep === 4) {
      return null
    }

    setActiveStep(prevStep => (prevStep + 1) as 1 | 2 | 3 | 4)
    return setProgress(prevProgress => prevProgress + 25)
  }

  React.useEffect(() => {
    setTimeout(() => setProgress(25), 300)

    return () => clearTimeout()
  }, [])

  const isFirstStep = activeStep === 1
  const isLastStep = activeStep === 4

  return (
    <>
      <Styles.Header>
        <div>
          <Styles.Title>Onboarding</Styles.Title>
          <Styles.Subtitle>Step {activeStep} of 4</Styles.Subtitle>
        </div>
        <Styles.ProgressBar>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </Styles.ProgressBar>
      </Styles.Header>
      <Styles.Container>
        <Styles.StepsContainer>
          <OnboardingSteps activeStep={activeStep} />
        </Styles.StepsContainer>
        <Styles.FormContainer>
          {isFirstStep && <StepLogin />}
          {!isLastStep && (
            <Button onClick={handleNextStepChange} $variant='default'>
              Next step
            </Button>
          )}
          {!isFirstStep && (
            <Button onClick={handlePrevStepChange} $variant='transparent'>
              Prev step
            </Button>
          )}
        </Styles.FormContainer>
      </Styles.Container>
    </>
  )
}

export default SignUp
