import React from 'react'
import i18n from 'i18next'

import playIco from 'common/assets/icons/ico-arrow.svg'
import image from 'common/assets/images/video-placeholder.jpeg'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'
import * as ROUTES from 'common/utils/constants/routes'
import { changeLanguage } from 'features/app/translations'

export default function OnboardingWelcome(): JSX.Element {
  const renderRegisterAccountButton = () => {
    return (
      <div className='mt-10 flex flex-col items-center'>
        <Link to={ROUTES.SIGN_UP}>
          <Button className='w-96 font-extrabold text-base'>
            {i18n.t('welcome.registerAccountButton.message')}
          </Button>
        </Link>
      </div>
    )
  }

  const renderTakeTourFirstButton = () => {
    return (
      <div className='mt-4 flex flex-col items-center'>
        <Button
          variant='transparent'
          className='w-96 bg-white border border-link text-link font-medium text-base'
          onClick={() => changeLanguage('vi')}
        >
          {i18n.t('welcome.takeATourFirstButton.message')}
        </Button>
      </div>
    )
  }

  const renderRestoreAccountButton = () => {
    return (
      <div className='mt-4 text-center text-base font-normal text-gray-a0'>
        {i18n.t('welcome.alreadyHaveAnAccount.message')}{' '}
        <Link to={`${ROUTES.PASSWORD_RECOVERY}?isRestore=true`}>
          {i18n.t('welcome.restoreAccountFromBackup.message')}
        </Link>
      </div>
    )
  }

  const renderPlayBanner = () => {
    return (
      <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white w-[114px] h-[114px] flex items-center justify-center rounded-full transition duration-300 cursor-pointer z-50 shadow-0x4x44px bg-rgba-white-02 hover:bg-rgba-white-04 scale-100 hover:scale-110'>
        <div className='flex items-center justify-center rounded-full bg-white w-14 h-14 cursor-pointer'>
          <img src={playIco} className='cursor-pointer' alt='Play icon' />
        </div>
      </div>
    )
  }

  return (
    <div className='w-649px mx-14 my-11'>
      <div className='text-gray-2d text-h1 font-extrabold leading-10 text-center'>
        {i18n.t('welcome.title.message')}
      </div>
      <div className='font-medium text-2xl text-gray-77 mt-2 text-center'>
        {i18n.t('welcome.subTitle.message')}
      </div>
      <div className='relative mt-8'>
        <img
          src={image}
          className='rounded-2xl absolute z-0 w-587px filter blur-2xl top-10 left-1/2 transform -translate-x-1/2'
          alt='Pastel Network'
        />
        <img
          src={image}
          className='w-full rounded-2xl overflow-hidden z-10 relative'
          alt='Pastel Network'
        />
        {renderPlayBanner()}
      </div>
      {renderRegisterAccountButton()}
      {renderTakeTourFirstButton()}
      {renderRestoreAccountButton()}
    </div>
  )
}
