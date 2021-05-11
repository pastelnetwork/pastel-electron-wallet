import * as React from 'react'

import closeIco from '../../assets/icons/ico-close.svg'
import * as ROUTES from '../../utils/constants/routes'
import * as Styles from './OnboardingLayout.styles'

const OnboardingLayout: React.FC<unknown> = ({ children }) => {
  return (
    <Styles.Card>
      <Styles.CloseButton to={ROUTES.ONBOARDING}>
        <img src={closeIco} alt='close icon' />
      </Styles.CloseButton>
      {children}
    </Styles.Card>
  )
}

export default OnboardingLayout
