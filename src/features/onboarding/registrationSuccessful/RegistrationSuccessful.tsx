import * as React from 'react'

import successImage from 'common/assets/images/registration-successful.png'
import CloseButton from '../common/closeButton'
import * as ROUTES from 'common/utils/constants/routes'

function RegistrationSuccessful(): JSX.Element {
  return (
    <div className='flex items-center h-[452px] w-[769px]'>
      <CloseButton gotoUrl={ROUTES.DASHBOARD} />
      <img
        className='h-full -my-60px'
        src={successImage}
        alt='Registration Successful'
      />
    </div>
  )
}

export default RegistrationSuccessful
