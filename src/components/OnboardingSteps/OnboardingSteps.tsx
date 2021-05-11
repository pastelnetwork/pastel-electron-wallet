import * as React from 'react'

import icoArrowRight from '../../assets/icons/ico-arrow-right.svg'
import creditCardIco from '../../assets/icons/ico-credit-card.svg'
import downloadIco from '../../assets/icons/ico-download.svg'
import downloadIcoGray from '../../assets/icons/ico-download-gray.svg'
import infoIco from '../../assets/icons/ico-info.svg'
import refreshIco from '../../assets/icons/ico-refresh.svg'
import * as Styles from './OnboardingSteps.styles'

const OnboardingSteps = () => (
  <Styles.Steps>
    <Styles.Step $active={true}>
      <img src={downloadIco} alt='step 1' />
      <Styles.StepLabel>Primary login</Styles.StepLabel>
      <Styles.StepInfoIcon src={infoIco} alt='info' />
      <Styles.StepActiveArrow src={icoArrowRight} alt='active step' />
    </Styles.Step>
    <Styles.Step $active={false}>
      <img src={downloadIcoGray} alt='step 2' />
      <Styles.StepLabel>Backup access method</Styles.StepLabel>
    </Styles.Step>
    <Styles.Step $active={false}>
      <img src={creditCardIco} alt='step 3' />
      <Styles.StepLabel>Payment method</Styles.StepLabel>
    </Styles.Step>
    <Styles.Step $active={false}>
      <img src={refreshIco} alt='step 4' />
      <Styles.StepLabel>Registration fee</Styles.StepLabel>
    </Styles.Step>
  </Styles.Steps>
)

export default OnboardingSteps
