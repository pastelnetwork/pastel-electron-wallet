import * as React from 'react'

import playIco from 'common/assets/icons/ico-arrow.svg'
import image from 'common/assets/images/video-placeholder.jpeg'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'
import * as ROUTES from 'common/utils/constants/routes'

const OnboardingWelcome = (): JSX.Element => {
  return (
    <div className='w-649px mx-14 my-11'>
      <div className='text-gray-800 text-32px font-black text-center'>
        Welcome to Pastel NFT
      </div>
      <div className='font-medium text-2xl text-gray-77 mt-2 text-center'>
        Let’s start!
      </div>
      <div className='relative mt-8'>
        <img
          src={image}
          className='rounded-2xl absolute z-0 w-587px filter blur-2xl top-10 left-1/2 transform -translate-x-1/2'
        />
        <img
          src={image}
          className='w-full rounded-2xl overflow-hidden z-10 relative'
        />
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white w-36 h-36 flex items-center justify-center rounded-full transition cursor-pointer z-50 shadow-0x4x44px bg-rgba-white-02 hover:bg-rgba-white-04'>
          <div className='flex items-center justify-center rounded-full bg-white w-14 h-14 cursor-pointer'>
            <img src={playIco} className='cursor-pointer' />
          </div>
        </div>
      </div>
      <div className='mt-10 flex flex-col items-center'>
        <Link href={ROUTES.SIGN_UP}>
          <Button className='w-96'>Register account</Button>
        </Link>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <Button
          variant='transparent'
          className='w-96 bg-white border border-link text-link'
        >
          Take a tour first
        </Button>
      </div>

      <div className='mt-4 text-center text-base text-gray-a0'>
        Already have an account? <Link href={ROUTES.LOGIN}>Login</Link>
      </div>
    </div>
  )
}

export default OnboardingWelcome
