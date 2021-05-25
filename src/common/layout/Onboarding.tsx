import * as React from 'react'
import { useHistory } from 'react-router-dom'

import closeIcon from '../assets/icons/ico-close.svg'
import * as ROUTES from '../utils/constants/routes'

import * as Styles from './Onboarding.styles'

const OnboardingLayout: React.FC = ({ children }) => {
  const { location } = useHistory()
  const isHomeRoute = location.pathname === ROUTES.WELCOME_PAGE

  return (
    <Styles.Card>
      {!isHomeRoute && (
        <Styles.CloseButton to={ROUTES.WELCOME_PAGE}>
          <img src={closeIcon} alt='close icon' />
        </Styles.CloseButton>
      )}
      {children}
    </Styles.Card>
  )
}

export default OnboardingLayout
