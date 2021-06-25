import * as React from 'react'

import successImage from '../../../common/assets/images/registration-successful.png'

const RegistrationSuccessful = (): JSX.Element => {
  return (
    <div className='flex items-center h-[452px] w-[769px]'>
      <img className='h-full -my-60px' src={successImage} />
    </div>
  )
}

export default RegistrationSuccessful
