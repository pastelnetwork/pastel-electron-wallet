import * as React from 'react'
import { useHistory, Link } from 'react-router-dom'
import cn from 'classnames'

import closeIcon from '../assets/icons/ico-close.svg'
import * as ROUTES from '../utils/constants/routes'

const OnboardingLayout: React.FC = ({ children }) => {
  const { location } = useHistory()

  const hideCloseBtn = [
    ROUTES.WELCOME_PAGE,
    ROUTES.SIGN_UP, // sign up page require confirm dialog on close request
  ].includes(location.pathname)

  const withPaddings = ![ROUTES.REGISTER_SUCCESSFUL, ROUTES.SIGN_UP].includes(
    location.pathname,
  )

  // TODO: check if this right
  const closeToUrl =
    location.pathname === ROUTES.REGISTER_SUCCESSFUL
      ? ROUTES.DASHBOARD
      : ROUTES.WELCOME_PAGE

  return (
    <div
      className={cn(
        'opacity-100 rounded-xl bg-white shadow-xl relative overflow-hidden max-w-9/10 maxh-9/10',
        withPaddings && 'py-[35px] px-[60px]',
      )}
    >
      {!hideCloseBtn && (
        <Link
          className='absolute flex justify-center items-center top-6 right-6 w-7 h-7 box-border rounded-lg bg-whte border border-gray'
          to={closeToUrl}
        >
          <img src={closeIcon} className='cursor-pointer' />
        </Link>
      )}
      {children}
    </div>
  )
}

export default OnboardingLayout
