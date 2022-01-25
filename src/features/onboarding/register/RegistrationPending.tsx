import React from 'react'
import parse from 'html-react-parser'

import { Button } from 'common/components/Buttons'
import registerImage from 'common/assets/images/registration-fee-pending.png'
import * as ROUTES from 'common/utils/constants/routes'
import Link from 'common/components/Link'
import { translate } from 'features/app/translations'

export default function RegistrationPending(): JSX.Element {
  return (
    <div className='mx-20 mt-10 mb-14 flex flex-col items-center'>
      <h1 className='text-32px font-extrabold text-gray-2d'>
        {translate('registrationFeePending')}
      </h1>
      <h2 className='text-base font-medium text-gray-71 mt-4'>
        {parse(translate('registrationFeePendingDescription'))}
      </h2>
      <div className='relative mt-6 pb-14'>
        <img
          alt={translate('registrationFeePending')}
          src={registerImage}
          className='rounded-2xl absolute z-0 w-539px h-262px filter blur-2xl top-10 left-1/2 transform -translate-x-1/2'
        />
        <img
          alt={translate('registrationFeePending')}
          src={registerImage}
          className='rounded-2xl overflow-hidden relative z-10'
        />
      </div>
      <Link to={ROUTES.REGISTER_SUCCESSFUL} className='link'>
        <Button className='w-[400px] font-medium' variant='secondary'>
          {translate('checkPaymentStatusManually')}
        </Button>
      </Link>
    </div>
  )
}
