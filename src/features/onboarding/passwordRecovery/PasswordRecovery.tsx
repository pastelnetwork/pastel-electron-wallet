import React, { useState } from 'react'
import QRCode from 'qrcode.react'

import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import CloseButton from '../common/closeButton'
import Typography, {
  TypographyVariant,
} from 'common/components/Typography/Typography'
import * as ROUTES from 'common/utils/constants/routes'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'

enum Tabs {
  qrCode,
  cryptoKeys,
}

const PasswordRecovery = (): JSX.Element => {
  const [tab, setTab] = useState(Tabs.qrCode)
  const onTabToggle = (index: number) => {
    setTab(index)
  }
  return (
    <div className='mx-60px my-11 w-517px'>
      <CloseButton gotoUrl={ROUTES.WELCOME_PAGE} />
      <Typography
        variant={TypographyVariant.h1}
        customColor='text-gray-2d'
        customFontWeight='font-extrabold'
      >
        Password Recovery
      </Typography>
      <Typography variant={TypographyVariant.body2} customColor='text-gray-71'>
        Choose your recovery method
      </Typography>
      <div className='mt-[19px]'>
        <MultiToggleSwitch
          data={[{ label: 'QR-Code' }, { label: 'Crypto Keys' }]}
          activeIndex={tab}
          onToggle={onTabToggle}
          itemActiveClassName='bg-gray-4a rounded-full text-white'
          countInactiveClassName='bg-warning-hover font-extrabold'
        />
      </div>
      {tab === Tabs.qrCode && (
        <div>
          <div className='flex justify-center bg-gray-f4 rounded-lg py-[33px] mt-[23px]'>
            <div className='bg-gray-fc border-gray-e6 shadow-textbox w-[282px] h-[282px] flex justify-center items-center rounded-xl'>
              <QRCode value='https://explorer.pastel.network/' />
            </div>
          </div>
          <div className='flex justify-center mt-[27.5px] text-link text-base font-medium'>
            <Link to={ROUTES.LOGIN}>
              <Button
                variant='secondary'
                className='w-[400px] font-medium text-base'
              >
                Or try to Login again
              </Button>
            </Link>
          </div>
        </div>
      )}
      {tab === Tabs.cryptoKeys && (
        <div className='mt-[30px] text-base text-gray-71'>
          <div>
            Store your keys in a password manager to back them up in case you
            need to restore your account.
          </div>
          <div>
            <div className='mt-6 w-full flex items-center'>
              <Typography
                variant={TypographyVariant.body2}
                customColor='text-gray-71'
              >
                Public key
              </Typography>
            </div>
            <div className='flex shadow-2px rounded px-[14px] py-[9px] mt-2.5'>
              <Typography
                variant={TypographyVariant.body2}
                customColor='text-gray-2d'
              >
                ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
              </Typography>
            </div>
          </div>
          <div>
            <div className='mt-6 w-full flex items-center'>
              <Typography
                variant={TypographyVariant.body2}
                customColor='text-gray-71'
              >
                Secret key
              </Typography>
            </div>
            <div className='flex shadow-2px rounded px-[14px] py-[9px] mt-2.5'>
              <Typography
                variant={TypographyVariant.body2}
                customColor='text-gray-2d'
              >
                ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
              </Typography>
            </div>
          </div>
          <div className='mt-7'>
            <Link to={ROUTES.NEW_PASSWORD} className='block w-full'>
              <Button className='w-full'>Submit</Button>
            </Link>
          </div>
          <div className='mt-[17px]'>
            <Link to={ROUTES.PASSWORD_RECOVERY} className='block w-full'>
              <Button
                variant='transparent'
                className='w-full bg-white border border-link text-link text-base font-medium'
              >
                Or try to login again
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordRecovery
