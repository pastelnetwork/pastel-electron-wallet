import * as React from 'react'
import { useHistory, Link } from 'react-router-dom'
import cn from 'classnames'

import closeIcon from '../assets/icons/ico-close.svg'
import * as ROUTES from '../utils/constants/routes'

const OnboardingLayout: React.FC = ({ children }) => {
  const { location } = useHistory()
  const isHomeRoute = location.pathname === ROUTES.WELCOME_PAGE
  const isRegisterationSuccessful =
    location.pathname === ROUTES.REGISTER_SUCCESSFUL
  return (
    <div
      className={cn(
        'opacity-100 rounded-xl bg-white flex justify-center items-center flex-col shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        !isRegisterationSuccessful && 'py-[35px] px-[60px]',
      )}
    >
      {!isHomeRoute && (
        <Link
          className='absolute flex justify-center items-center top-6 right-6 w-7 h-7 box-border rounded-lg bg-whte border border-gray'
          to={ROUTES.WELCOME_PAGE}
        >
          <img src={closeIcon} alt='close icon' />
        </Link>
      )}
      {children}
    </div>
  )
}

export default OnboardingLayout
