import React, { useState, useEffect } from 'react'
import shallow from 'zustand/shallow'

import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import CloseButton from '../common/closeButton'
import * as ROUTES from 'common/utils/constants/routes'
import RestoreByUpload from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByUpload'
import RestoreByCamera from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByCamera'
import RestoreByPdf from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByPdf'
import RestoreSuccess from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreSuccess'
import { useRegisterStore } from '../register/Register.store'
import history from 'common/utils/history'
import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'

enum Tabs {
  selectPDF,
  scanQRCodeVideo,
  selectQRCodeVideo,
}

const tabs = [
  { label: 'Crypto Keys' },
  { label: 'QR-Code' },
  { label: 'QR Code Video' },
]

export default function PasswordRecovery(): JSX.Element {
  const store = useRegisterStore(
    state => ({
      setPastelId: state.setPastelId,
    }),
    shallow,
  )
  const [turnOffCamera, setTurnOffCamera] = useState(false)
  const [isRestore, setRestore] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [tab, setTab] = useState(Tabs.selectPDF)

  useEffect(() => {
    if (history.location.search.indexOf('isRestore=true') !== -1) {
      setRestore(true)
    }
  }, [])

  const onTabToggle = (index: number) => {
    setTurnOffCamera(false)
    setTab(index)
    if (index !== Tabs.scanQRCodeVideo) {
      setTurnOffCamera(true)
    }
  }

  const handleRedirect = () => {
    if (isRestore) {
      setSuccess(true)
    } else {
      history.push(ROUTES.NEW_PASSWORD)
    }
  }

  return (
    <div className='mx-60px my-11 w-517px'>
      <CloseButton gotoUrl={isRestore ? ROUTES.WELCOME_PAGE : ROUTES.LOGIN} />
      <div className='font-extrabold text-gray-2d text-h1-heavy'>
        {isRestore ? 'Restore account from backup' : 'Password Recovery'}
      </div>
      {!isSuccess ? (
        <>
          <div className='text-gray-71 text-h5'>
            Choose your recovery method
          </div>
          <div className='mt-[19px]'>
            <MultiToggleSwitch
              data={tabs}
              activeIndex={tab}
              onToggle={onTabToggle}
              itemActiveClassName='bg-gray-4a rounded-full text-white'
              countInactiveClassName='bg-warning-hover font-extrabold'
            />
          </div>
          {tab === Tabs.selectPDF && (
            <div className='mt-[30px]'>
              <RestoreByPdf
                setPastelId={store.setPastelId}
                callback={handleRedirect}
              />
            </div>
          )}
          {tab === Tabs.scanQRCodeVideo && (
            <div className='mt-[30px]'>
              <RestoreByCamera
                setPastelId={store.setPastelId}
                turnOffCamera={turnOffCamera}
                callback={handleRedirect}
              />
            </div>
          )}
          {tab === Tabs.selectQRCodeVideo && (
            <div className='mt-[30px]'>
              <RestoreByUpload
                setPastelId={store.setPastelId}
                callback={handleRedirect}
              />
            </div>
          )}
        </>
      ) : (
        <div className='mt-9'>
          <RestoreSuccess />
        </div>
      )}
      {isRestore && isSuccess ? (
        <div className='mt-9'>
          <Link to={ROUTES.LOGIN}>
            <Button className='w-full' type='button'>
              Login
            </Button>
          </Link>
        </div>
      ) : null}
      {isRestore && !isSuccess ? (
        <div className='mt-9 text-center text-base font-normal text-gray-a0'>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </div>
      ) : null}
    </div>
  )
}
