import * as React from 'react'

import icoArrowRight from '../../assets/icons/ico-arrow-right.svg'
import completedIco from '../../assets/icons/ico-completed.svg'
import infoIco from '../../assets/icons/ico-info.svg'
import { STEPS } from './OnboardingSteps.helpers'
import * as Styles from './OnboardingSteps.styles'

interface IOnboardingStepsProps {
  activeStep: 1 | 2 | 3 | 4
}

const OnboardingSteps: React.FC<IOnboardingStepsProps> = ({ activeStep }) => {
  return (
    <Styles.Steps>
      {STEPS.map(({ id, iconActive, iconDefault, label, stepIconLabel }) => (
        <Styles.Step $active={activeStep === id} key={id}>
          {activeStep <= id ? (
            <img
              src={activeStep === id ? iconActive : iconDefault}
              alt={stepIconLabel}
            />
          ) : (
            <img src={completedIco} alt={`Step ${id} completed`} />
          )}
          <Styles.StepLabel>{label}</Styles.StepLabel>
          {activeStep === id && (
            <Styles.StepInfoIcon src={infoIco} alt='info' />
          )}
          {activeStep === id && (
            <Styles.StepActiveArrow src={icoArrowRight} alt='active step' />
          )}
        </Styles.Step>
      ))}
    </Styles.Steps>
  )
}

export default OnboardingSteps
