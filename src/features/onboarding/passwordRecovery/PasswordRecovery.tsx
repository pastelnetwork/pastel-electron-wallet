import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode.react'
import MultiToggleSwitch from '../../../common/components/MultiToggleSwitch'
import CloseButton from '../common/closeButton'
import Typography from '../../../common/components/Typography/Typography'
import * as ROUTES from '../../../common/utils/constants/routes'
import Tooltip from '../../../common/components/Tooltip'
import { Button } from '../../../common/components/Buttons'
import infoIco from '../../../common/assets/icons/ico-info.svg'

enum Tabs {
  qrCode,
  cryptoKeys,
}

const PasswordRecovery: React.FC = () => {
  const [tab, setTab] = useState(Tabs.qrCode)
  const onTabToggle = (index: number) => {
    setTab(index)
  }
  return (
    <div className='mx-60px my-11 w-517px'>
      <CloseButton gotoUrl={ROUTES.WELCOME_PAGE} />
      <Typography variant='h1' color='#2D3748' weight={800}>
        Password Recovery
      </Typography>
      <Typography variant='body2' color='#718096'>
        Choose your recovery method
      </Typography>
      <div className='mt-[19px]'>
        <MultiToggleSwitch
          data={[{ label: 'QR-Code' }, { label: 'Crypto Keys' }]}
          activeIndex={tab}
          onToggle={onTabToggle}
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
            <Link to={ROUTES.LOGIN}>Or try to login again</Link>
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
              <Typography variant='body2' color='#718096'>
                Public key
              </Typography>
              <div className='ml-1'>
                <Tooltip
                  type='top'
                  width={400}
                  content='Public-key cryptography, or asymmetric cryptography, is a cryptographic system which uses pairs of keys'
                >
                  <img src={infoIco} alt='info' />
                </Tooltip>
              </div>
            </div>
            <div className='flex shadow-2px rounded px-[14px] py-[9px] mt-2.5'>
              <Typography variant='body2' color='#2D3748'>
                ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
              </Typography>
            </div>
          </div>
          <div>
            <div className='mt-6 w-full flex items-center'>
              <Typography variant='body2' color='#718096'>
                Secret key
              </Typography>
              <div className='ml-1'>
                <Tooltip
                  type='top'
                  width={400}
                  content='Secret-key cryptography, or asymmetric cryptography, is a cryptographic system which uses pairs of keys'
                >
                  <img src={infoIco} alt='info' />
                </Tooltip>
              </div>
            </div>
            <div className='flex shadow-2px rounded px-[14px] py-[9px] mt-2.5'>
              <Typography variant='body2' color='#2D3748'>
                ps19jxlfdl8mhnsqlf7x0cwlhczn69x9tcev2rawnjp7e9n8ecjms9
              </Typography>
            </div>
          </div>
          <div className='mt-5'>
            <Link to={ROUTES.NEW_PASSWORD}>
              <Button style={{ width: '100%' }}>Submit</Button>
            </Link>
          </div>
          <div className='flex justify-center mt-[17px]'>
            <Link to={ROUTES.PASSWORD_RECOVERY}>
              <Typography variant='body2' color='#3F9AF7' weight={500}>
                Or try to login again
              </Typography>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordRecovery
