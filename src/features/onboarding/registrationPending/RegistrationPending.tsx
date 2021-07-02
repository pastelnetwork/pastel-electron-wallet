import * as React from 'react'
import { Link } from 'react-router-dom'

import registerImage from '../../../common/assets/images/registration-fee-pending.png'
import * as ROUTES from '../../../common/utils/constants/routes'

const RegistrationPending = (): JSX.Element => {
  return (
    <div className='mx-20 mt-10 mb-14 flex flex-col items-center'>
      <h1 className='text-32px font-black'>Registration fee pending</h1>
      <h2 className='text-base font-medium text-gray-77 mt-4'>
        It can take up to 10 minutes after you've made <br /> the payment for
        this process to be completed
      </h2>
      <div className='relative mt-6 pb-14'>
        <img
          src={registerImage}
          className='rounded-2xl absolute z-0 w-539px h-262px filter blur-2xl top-10 left-1/2 transform -translate-x-1/2'
        />
        <img src={registerImage} className='rounded-2xl overflow-hidden' />
      </div>
      <Link to={ROUTES.REGISTER_SUCCESSFUL} className='link'>
        Check payment status manually
      </Link>
    </div>
  )
}

export default RegistrationPending
