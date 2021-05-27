import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import Typography from '../../../common/components/Typography/Typography'
import { Button } from '../../../common/components/Button/Button.styles'
import { colors } from '../../../common/theme/colors'
import NavigationButton from '../../../common/components/Button/Button'
import OnboardingSteps from '../../../common/components/OnboardingSteps/OnboardingSteps'

import icoArrowLeft from '../../../common/assets/icons/ico-arrow-left.svg'
import * as ROUTES from '../../../common/utils/constants/routes'

import StepLogin from './registerSteps/RegisterSteps'
import StepBackup from './backupSteps/BackupSteps'
import StepPayment from './paymentSteps/PaymentSteps'
import StepFee from './feeSteps/FeeSteps'

import * as Styles from './Register.styles'

const Register: React.FC = () => {
  const history = useHistory()
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
      return history.push(ROUTES.REGISTER_PENDING)
    }

    setActiveStep(prevStep => (prevStep + 1) as 1 | 2 | 3 | 4)
    return setProgress(prevProgress => prevProgress + 25)
  }

  React.useEffect(() => {
    setTimeout(() => setProgress(25), 300)

    return () => clearTimeout()
  }, [])

  const isFirstStep = activeStep === 1
  const isSecondStep = activeStep === 2
  const isThirdStep = activeStep === 3
  const isLastStep = activeStep === 4

  return (
    <Styles.RegisterContainer>
      <Styles.Header>
        <Styles.TextContainer>
          <Typography variant='h1' weight={800}>
            Onboarding
          </Typography>
          <Typography
            variant='body1'
            color={colors.text.secondary}
          >{`Step ${activeStep} of 4`}</Typography>
        </Styles.TextContainer>
        <Styles.ProgressBar>
          <CircularProgressbarWithChildren value={progress}>
            <Styles.ProgressBarText>
              {`${progress / 25}/4`}
            </Styles.ProgressBarText>
          </CircularProgressbarWithChildren>
        </Styles.ProgressBar>
      </Styles.Header>
      <Styles.Container>
        <Styles.StepsContainer>
          <OnboardingSteps activeStep={activeStep} />
        </Styles.StepsContainer>
        <Styles.FormContainer>
          {isFirstStep && <StepLogin />}
          {isSecondStep && <StepBackup />}
          {isThirdStep && <StepPayment />}
          {isLastStep && <StepFee />}
          <Styles.StepsButtonsContainer>
            <Button
              onClick={handleNextStepChange}
              $variant='default'
              width='130px'
            >
              {isLastStep
                ? 'Proceed to 1,000 PSL payment'
                : `Next step ${activeStep + 1}`}
            </Button>
            {!isFirstStep && (
              <NavigationButton
                onClick={handlePrevStepChange}
                variant='navigation'
              >
                <img src={icoArrowLeft} />
              </NavigationButton>
            )}
          </Styles.StepsButtonsContainer>
        </Styles.FormContainer>
      </Styles.Container>
    </Styles.RegisterContainer>
  )
}

export default Register
